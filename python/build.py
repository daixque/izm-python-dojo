#!/usr/bin/env python3
"""
build.py - レッスンコンテンツのビルドスクリプト

YAMLファイルとJinja2テンプレートからHTMLファイルを生成します。

使用方法:
    python build.py                    # 全レッスンをビルド
    python build.py 01_01_hello        # 特定のレッスンのみビルド
    python build.py --clean            # クリーンビルド
"""

import os
import sys
import yaml
import json
import shutil
from pathlib import Path
from jinja2 import Environment, FileSystemLoader, TemplateError


class ValidationError(Exception):
    """バリデーションエラー"""
    pass


def get_nested_value(data, key_path):
    """
    ネストされた辞書から値を取得する
    
    Args:
        data: 辞書データ
        key_path: ドット区切りのキーパス (例: "lesson.number")
    
    Returns:
        値またはNone
    """
    keys = key_path.split('.')
    value = data
    for key in keys:
        if isinstance(value, dict) and key in value:
            value = value[key]
        else:
            return None
    return value


def load_ui_strings(lang):
    """
    指定された言語のUI文言を読み込む
    
    Args:
        lang: 言語コード ('ja', 'en', 'ko', etc.)
    
    Returns:
        UI文言の辞書
    """
    ui_file = Path(f"ui_strings/{lang}.yaml")
    if not ui_file.exists():
        raise FileNotFoundError(f"UI strings file not found: {ui_file}")
    
    with open(ui_file, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)


def load_yaml_file(filepath):
    """
    YAMLファイルを読み込む
    
    Args:
        filepath: YAMLファイルのパス
    
    Returns:
        パースされたYAMLデータ
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)
    except yaml.YAMLError as e:
        print(f"❌ YAMLパースエラー: {filepath}")
        print(f"   {e}")
        sys.exit(1)
    except FileNotFoundError:
        print(f"❌ ファイルが見つかりません: {filepath}")
        sys.exit(1)


def validate_theory_yaml(data, filename, lang):
    """
    theory.{lang}.yaml のバリデーション
    """
    required_fields = ['lesson.number', 'lesson.id', 'lesson.title', 'content']
    errors = []
    for field in required_fields:
        if not get_nested_value(data, field):
            errors.append(f"Missing required field: {field}")
    if errors:
        raise ValidationError(f"{filename}: " + ", ".join(errors))


def validate_exercise_yaml(data, filename, lang):
    """
    exercise.{lang}.yaml のバリデーション
    """
    required_fields = [
        'lesson.number', 'lesson.id', 'lesson.title',
        'task_description', 'instructions', 'hints'
    ]
    errors = []
    for field in required_fields:
        if not get_nested_value(data, field):
            errors.append(f"Missing required field: {field}")
    if errors:
        raise ValidationError(f"{filename}: " + ", ".join(errors))


def validate_code_yaml(data, filename):
    """
    code.yaml のバリデーション
    """
    required_fields = ['initial_code', 'tests']
    errors = []
    for field in required_fields:
        if field not in data:
            errors.append(f"Missing required field: {field}")
    
    # testsの各要素が必須フィールドを持つかチェック
    if 'tests' in data:
        for i, test in enumerate(data['tests']):
            if 'name' not in test or 'ja' not in test.get('name', {}) or 'en' not in test.get('name', {}):
                errors.append(f"Test {i}: Missing name.ja or name.en")
            if 'code' not in test:
                errors.append(f"Test {i}: Missing code")
    
    if errors:
        raise ValidationError(f"{filename}: " + ", ".join(errors))


def build_lesson(lesson_dir, env, languages=['ja', 'en']):
    """
    1つのレッスンをビルドする
    
    Args:
        lesson_dir: レッスンディレクトリのパス (例: lessons_data/01_01_hello)
        env: Jinja2環境
        languages: ビルドする言語のリスト
    """
    lesson_id = lesson_dir.name
    print(f"\n📦 Building lesson: {lesson_id}")
    
    # code.yaml を読み込み（言語共通）
    code_yaml_path = lesson_dir / "code.yaml"
    if not code_yaml_path.exists():
        print(f"⚠️  Skipping {lesson_id}: code.yaml not found")
        return
    
    code_data = load_yaml_file(code_yaml_path)
    
    # バリデーション
    try:
        validate_code_yaml(code_data, str(code_yaml_path))
    except ValidationError as e:
        print(f"❌ Validation error: {e}")
        return
    
    # 各言語でビルド
    for lang in languages:
        print(f"  🌐 Building {lang}...")
        
        # UI文言を読み込み
        try:
            ui_strings = load_ui_strings(lang)
        except FileNotFoundError as e:
            print(f"  ⚠️  Skipping {lang}: {e}")
            continue
        
        # theory.{lang}.yaml を読み込み
        theory_yaml_path = lesson_dir / f"theory.{lang}.yaml"
        if not theory_yaml_path.exists():
            print(f"  ⚠️  Skipping theory.{lang}: file not found")
        else:
            theory_data = load_yaml_file(theory_yaml_path)
            try:
                validate_theory_yaml(theory_data, str(theory_yaml_path), lang)
                # theory.html を生成
                template = env.get_template('theory_template.html')
                html = template.render(
                    lang=lang,
                    ui=ui_strings,
                    lesson=theory_data['lesson'],
                    content=theory_data['content']
                )
                
                # 出力先ディレクトリを作成
                output_dir = Path(f"docs/lessons/{lesson_id}")
                output_dir.mkdir(parents=True, exist_ok=True)
                
                # HTMLファイルを書き込み
                output_file = output_dir / f"theory.{lang}.html"
                with open(output_file, 'w', encoding='utf-8') as f:
                    f.write(html)
                print(f"    ✅ {output_file}")
            except (ValidationError, TemplateError) as e:
                print(f"    ❌ Error: {e}")
        
        # exercise.{lang}.yaml を読み込み
        exercise_yaml_path = lesson_dir / f"exercise.{lang}.yaml"
        if not exercise_yaml_path.exists():
            print(f"  ⚠️  Skipping exercise.{lang}: file not found")
        else:
            exercise_data = load_yaml_file(exercise_yaml_path)
            try:
                validate_exercise_yaml(exercise_data, str(exercise_yaml_path), lang)
                # exercise.html を生成
                template = env.get_template('exercise_template.html')
                
                # テストデータを言語に応じて変換
                tests_for_template = []
                for test in code_data['tests']:
                    # テストコード内で lang 変数を使えるようにする
                    test_code = test['code']
                    # lang 変数を定義するコードを先頭に追加
                    test_code_with_lang = f'lang = "{lang}"\n{test_code}'
                    
                    tests_for_template.append({
                        'name': test['name'][lang],
                        'description': test.get('description', {}).get(lang, ''),
                        'code': test_code_with_lang
                    })
                
                html = template.render(
                    lang=lang,
                    ui=ui_strings,
                    lesson=exercise_data['lesson'],
                    task_description=exercise_data['task_description'],
                    instructions=exercise_data['instructions'],
                    hints=exercise_data['hints'],
                    initial_code=code_data['initial_code'],
                    initial_files=code_data.get('initial_files', []),
                    tests=tests_for_template
                )
                
                # 出力先ディレクトリを作成
                output_dir = Path(f"docs/lessons/{lesson_id}")
                output_dir.mkdir(parents=True, exist_ok=True)
                
                # HTMLファイルを書き込み
                output_file = output_dir / f"exercise.{lang}.html"
                with open(output_file, 'w', encoding='utf-8') as f:
                    f.write(html)
                print(f"    ✅ {output_file}")
            except (ValidationError, TemplateError) as e:
                print(f"    ❌ Error: {e}")


def load_chapters_data(lang):
    """
    チャプター情報を読み込む
    
    Args:
        lang: 言語コード ('ja', 'en', etc.)
    
    Returns:
        チャプター情報のリスト
    """
    chapters_file = Path(f"chapters_data/chapters.{lang}.yaml")
    if not chapters_file.exists():
        print(f"⚠️  Chapters file not found: {chapters_file}")
        return []
    
    with open(chapters_file, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
        return data.get('chapters', [])


def generate_metadata(lang):
    """
    レッスンメタデータを生成する
    
    Args:
        lang: 言語コード ('ja', 'en', etc.)
    
    Returns:
        メタデータ辞書
    """
    print(f"\n📋 Generating metadata for {lang}...")
    
    # チャプター情報を読み込み
    chapters_data = load_chapters_data(lang)
    if not chapters_data:
        print(f"  ⚠️  No chapters data found for {lang}")
        return None
    
    # チャプターIDをキーとした辞書を作成
    chapters_dict = {ch['number']: ch for ch in chapters_data}
    
    # レッスンデータをスキャン
    lessons_data_dir = Path("lessons_data")
    if not lessons_data_dir.exists():
        print("  ❌ lessons_data/ directory not found")
        return None
    
    # 各チャプターのレッスンリストを初期化
    chapters_lessons = {ch['number']: [] for ch in chapters_data}
    
    # 各レッスンディレクトリを処理
    for lesson_dir in sorted(lessons_data_dir.iterdir()):
        if not lesson_dir.is_dir():
            continue
        
        lesson_id = lesson_dir.name
        
        # theory.{lang}.yamlを読み込んでレッスン情報を取得
        theory_file = lesson_dir / f"theory.{lang}.yaml"
        if not theory_file.exists():
            print(f"  ⚠️  Skipping {lesson_id}: theory.{lang}.yaml not found")
            continue
        
        try:
            with open(theory_file, 'r', encoding='utf-8') as f:
                theory_data = yaml.safe_load(f)
            
            lesson_info = theory_data.get('lesson', {})
            lesson_number = lesson_info.get('number', '')
            lesson_title = lesson_info.get('title', '')
            
            # exercise.{lang}.yamlから説明を取得
            exercise_file = lesson_dir / f"exercise.{lang}.yaml"
            description = ''
            if exercise_file.exists():
                with open(exercise_file, 'r', encoding='utf-8') as f:
                    exercise_data = yaml.safe_load(f)
                    # task_descriptionからHTMLタグを除去して説明文を作成
                    task_desc = exercise_data.get('task_description', '')
                    # 簡易的なHTMLタグ除去
                    import re
                    description = re.sub(r'<[^>]+>', '', task_desc).strip()
            
            # HTMLファイルが存在するかチェック（available判定）
            html_theory = Path(f"docs/lessons/{lesson_id}/theory.{lang}.html")
            html_exercise = Path(f"docs/lessons/{lesson_id}/exercise.{lang}.html")
            available = html_theory.exists() and html_exercise.exists()
            
            # チャプター番号を取得（lesson_numberの最初の2桁）
            chapter_number = lesson_number[:2] if lesson_number else ''
            
            if chapter_number in chapters_lessons:
                chapters_lessons[chapter_number].append({
                    'id': lesson_id,
                    'number': lesson_number,
                    'title': lesson_title,
                    'description': description,
                    'available': available
                })
                print(f"  ✓ Added {lesson_id} to Chapter {chapter_number}")
            else:
                print(f"  ⚠️  Chapter {chapter_number} not found for lesson {lesson_id}")
        
        except Exception as e:
            print(f"  ⚠️  Error processing {lesson_id}: {e}")
    
    # メタデータ構造を構築
    metadata = {'chapters': []}
    
    for chapter_data in chapters_data:
        chapter_number = chapter_data['number']
        chapter_lessons = chapters_lessons.get(chapter_number, [])
        
        metadata['chapters'].append({
            'id': chapter_data['id'],
            'number': int(chapter_number),
            'title': chapter_data['title'],
            'description': chapter_data['description'],
            'lessons': chapter_lessons
        })
    
    return metadata


def build_metadata():
    """
    全言語のメタデータを生成してJSONファイルに出力する
    """
    print("\n" + "="*60)
    print("📋 Building metadata files...")
    print("="*60)
    
    languages = ['ja', 'en']
    
    for lang in languages:
        metadata = generate_metadata(lang)
        
        if metadata:
            # 出力先ディレクトリを作成
            output_dir = Path("docs/lessons")
            output_dir.mkdir(parents=True, exist_ok=True)
            
            # JSONファイルに書き込み
            output_file = output_dir / f"metadata.{lang}.json"
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(metadata, f, ensure_ascii=False, indent=2)
            
            print(f"  ✅ Generated {output_file}")
        else:
            print(f"  ❌ Failed to generate metadata for {lang}")
    
    print("="*60)


def main():
    """メイン処理"""
    # コマンドライン引数の処理
    clean = '--clean' in sys.argv
    specific_lessons = [arg for arg in sys.argv[1:] if not arg.startswith('--')]
    
    # クリーンビルドの場合
    if clean:
        print("🧹 Clean build: removing docs/lessons/...")
        lessons_dir = Path("docs/lessons")
        if lessons_dir.exists():
            shutil.rmtree(lessons_dir)
        lessons_dir.mkdir(parents=True, exist_ok=True)
    
    # Jinja2環境を設定
    env = Environment(
        loader=FileSystemLoader('templates'),
        autoescape=True,
        trim_blocks=True,
        lstrip_blocks=True
    )
    
    # ビルド対象のレッスンを決定
    lessons_data_dir = Path("lessons_data")
    if not lessons_data_dir.exists():
        print("❌ lessons_data/ directory not found")
        sys.exit(1)
    
    if specific_lessons:
        # 特定のレッスンのみビルド
        lesson_dirs = [lessons_data_dir / lesson_id for lesson_id in specific_lessons]
        for lesson_dir in lesson_dirs:
            if not lesson_dir.exists():
                print(f"⚠️  Lesson directory not found: {lesson_dir}")
    else:
        # 全レッスンをビルド
        lesson_dirs = sorted([d for d in lessons_data_dir.iterdir() if d.is_dir()])
    
    # 各レッスンをビルド
    total = 0
    for lesson_dir in lesson_dirs:
        if lesson_dir.is_dir():
            build_lesson(lesson_dir, env)
            total += 1
    
    print(f"\n✨ Build complete! ({total} lessons processed)")
    
    # メタデータを生成
    build_metadata()


if __name__ == "__main__":
    main()
