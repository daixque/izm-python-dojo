## コンテンツデータの作成方式

各セクションのコンテンツは、lessons_dataディレクトリのYAMLファイルから生成するものとする。
build.pyを作成し、このスクリプトがYAMLファイルとtemplates以下のテンプレートファイルを読み込んでHTMLファイルを生成する方式を採用する。

### フォルダ構成

```
python/
├── build.py                      # ビルドスクリプト（メイン）
├── docs/                         # 生成された静的ファイル
│   ├── index.html
│   ├── lib/
│   │   ├── css/
│   │   │   ├── common.css
│   │   │   ├── exercise.css
│   │   │   └── theory.css
│   │   └── js/
│   │       ├── exercise-common.js
│   │       ├── i18n.js
│   │       ├── runner.js
│   │       └── tester.js
│   └── lessons/
│       ├── 01_01_hello/
│       │   ├── theory.ja.html      # ← build.pyで生成
│       │   ├── theory.en.html      # ← build.pyで生成
│       │   ├── exercise.ja.html    # ← build.pyで生成
│       │   └── exercise.en.html    # ← build.pyで生成
│       ├── 01_02_variables/
│       │   └── ...
│       └── ...
├── lessons_data/                 # レッスンデータ（YAML形式）
│   ├── 01_01_hello/              # チャプター1のレッスン1
│   │   ├── theory.ja.yaml        # 日本語理論ページ
│   │   ├── theory.en.yaml        # 英語理論ページ
│   │   ├── exercise.ja.yaml      # 日本語演習ページ（UIテキスト）
│   │   ├── exercise.en.yaml      # 英語演習ページ（UIテキスト）
│   │   └── code.yaml             # コード関連（言語共通）
│   ├── 01_02_variables/          # チャプター1のレッスン2
│   │   └── ...
│   ├── 02_01_functions/          # チャプター2のレッスン1
│   │   └── ...
│   └── ...
├── ui_strings/                   # UI文言定義（言語ごと）
│   ├── ja.yaml                   # 日本語UI文言
│   ├── en.yaml                   # 英語UI文言
│   └── ...                       # 将来的に追加言語（ko.yaml, zh.yaml等）
├── templates/                    # Jinja2テンプレート
│   ├── theory_template.html      # 理論ページ用
│   └── exercise_template.html    # 演習ページ用
└── README.md
```

### 実装方針

#### 1. テンプレートエンジン
- **Jinja2** を使用する
- 1つのテンプレートで日本語・英語の両方に対応
- 条件分岐とループを活用してコードの重複を排除

#### 2. 多言語対応
- **言語ごとにYAMLファイルを分離** (.ja.yaml / .en.yaml)
- UIテキストとコードを分離して管理
- コード関連データ（initial_code, tests）は言語共通なので code.yaml に集約
- 翻訳対象ファイルが明確になり、翻訳作業が効率化

#### 3. データ駆動開発
- コンテンツはYAMLで管理（データ）
- プレゼンテーションはテンプレートで管理（見た目）
- 完全な分離により一貫性を保つ

#### 4. レッスン命名規則
- **ディレクトリ名**: `{chapter}_{lesson}_{name}` 形式
  - 例: `01_01_hello` (チャプター1のレッスン1)
  - 例: `01_02_variables` (チャプター1のレッスン2)
  - 例: `02_01_functions` (チャプター2のレッスン1)
- **lesson.number**: `{chapter}_{lesson}` 形式
  - 例: `"01_01"`, `"01_02"`, `"02_01"`
- **チャプターごとにレッスンをグループ化**し、柔軟なカリキュラム構成を実現

---

## YAMLスキーマ設計

### ファイル構成

レッスンごとに **5つのYAMLファイル** で構成され、さらに **UI文言は別ファイル** で管理します：

```
# レッスンデータ（01_01 = チャプター1のレッスン1）
lessons_data/01_01_hello/
├── theory.ja.yaml      # 日本語理論ページの内容
├── theory.en.yaml      # 英語理論ページの内容
├── exercise.ja.yaml    # 日本語演習ページの内容（UIテキストのみ）
├── exercise.en.yaml    # 英語演習ページの内容（UIテキストのみ）
└── code.yaml           # コード関連（初期コード、テスト）※言語共通

# UI文言（すべてのレッスンで共通）
ui_strings/
├── ja.yaml             # 日本語のUI文言（「理論」「演習」「レッスン」等）
├── en.yaml             # 英語のUI文言（"Theory" "Exercise" "Lesson"等）
└── ...                 # 将来的に追加する言語（ko.yaml, zh.yaml等）
```

### 1. theory.ja.yaml の構造例

```yaml
lesson:
  number: "01_01"  # チャプター_レッスン形式
  id: "hello"
  title: "はじめてのPython"

content: |
  <section class="section">
    <h2>プログラミングの第一歩</h2>
    <p>プログラミングの世界では、新しい言語を学ぶときの最初のプログラムとして「Hello, World!」を表示するのが伝統です。</p>
    <p>この単純なプログラムを通じて、コードを書いて実行する基本的な流れを体験できます。</p>
  </section>

  <section class="section">
    <h2>print関数とは</h2>
    <p>Pythonでは、<code>print()</code>という関数を使って、文字や数字を画面に表示することができます。</p>
    <p>カッコの中に表示したい内容を書くと、その内容が実行結果に表示されます。</p>
  </section>

  <section class="examples">
    <h2>コード例</h2>
    <div class="example-item">
      <div class="example-title">基本的な使い方</div>
      <div class="example-code">print("Hello, World!")</div>
      <div class="example-explanation">文字列をダブルクォーテーションで囲んで表示します。</div>
    </div>
  </section>
```

### 2. theory.en.yaml の構造例

```yaml
lesson:
  number: "01_01"  # チャプター_レッスン形式
  id: "hello"
  title: "First Steps with Python"

content: |
  <section class="section">
    <h2>First Steps in Programming</h2>
    <p>In the programming world, it's traditional to display "Hello, World!" as the first program when learning a new language.</p>
    <p>Through this simple program, you can experience the basic flow of writing and executing code.</p>
  </section>

  <section class="section">
    <h2>What is the print function?</h2>
    <p>In Python, you can use the <code>print()</code> function to display text and numbers on the screen.</p>
    <p>When you write what you want to display inside the parentheses, that content will be shown in the output.</p>
  </section>

  <section class="examples">
    <h2>Code Examples</h2>
    <div class="example-item">
      <div class="example-title">Basic Usage</div>
      <div class="example-code">print("Hello, World!")</div>
      <div class="example-explanation">Display a string enclosed in double quotes.</div>
    </div>
  </section>
```

### 3. exercise.ja.yaml の構造例

```yaml
lesson:
  number: "01_01"  # チャプター_レッスン形式
  id: "hello"
  title: "はじめてのPython"

task_description: |
  <p>「Hello, World!」と表示するプログラムを書いてみましょう。</p>

instructions:
  - "<code>print()</code>関数を使います"
  - "カッコの中に、ダブルクォーテーションで囲んだ「Hello, World!」を書きます"
  - "最後のカッコを閉じるのを忘れずに！"

hints:
  - "print()のカッコの中に、ダブルクォーテーションで囲んだ文字を書きます"
  - "正解例: print(\"Hello, World!\")"
```

### 4. exercise.en.yaml の構造例

```yaml
lesson:
  number: "01_01"  # チャプター_レッスン形式
  id: "hello"
  title: "First Steps with Python"

task_description: |
  <p>Write a program that displays 'Hello, World!'</p>

instructions:
  - "Use the <code>print()</code> function"
  - "Inside the parentheses, write 'Hello, World!' enclosed in double quotes"
  - "Don't forget to close the parentheses!"

hints:
  - "Write text enclosed in double quotes inside the print() parentheses"
  - "Example solution: print(\"Hello, World!\")"
```

### 5. code.yaml の構造例（言語共通）

```yaml
initial_code: |
  # ここにコードを書いてみよう
  

initial_files: []  # データファイルが必要な場合のみ使用

tests:
  - name:
      ja: "テスト1: Hello, World!を表示"
      en: "Test 1: Display Hello, World!"
    description:
      ja: "正しく「Hello, World!」と表示できているか"
      en: "Check if 'Hello, World!' is displayed correctly"
    code: |
      import sys
      from io import StringIO
      
      # 標準出力をキャプチャ
      old_stdout = sys.stdout
      sys.stdout = StringIO()
      
      try:
          exec(user_code)
          output = sys.stdout.getvalue()
      finally:
          sys.stdout = old_stdout
      
      # 出力をチェック
      expected = "Hello, World!\\n"
      if output == expected:
          result = {"passed": True, "message": "✓ 正解です！" if lang == "ja" else "✓ Correct!"}
      else:
          if lang == "ja":
              result = {"passed": False, "message": f"✗ 出力が違います。\\n期待: {repr(expected)}\\n実際: {repr(output)}"}
          else:
              result = {"passed": False, "message": f"✗ Output is different.\\nExpected: {repr(expected)}\\nActual: {repr(output)}"}
      
      result
```

### 必須フィールド

#### theory.ja.yaml / theory.en.yaml

| フィールド | 型 | 説明 |
|-----------|------|------|
| `lesson.number` | string | レッスン番号（{chapter}_{lesson}形式: "01_01", "01_02", "02_01", ...） |
| `lesson.id` | string | レッスンID（ディレクトリ名: "hello", "variables"） |
| `lesson.title` | string | レッスンタイトル |
| `content` | string | 理論説明の本文（HTML） |

#### exercise.ja.yaml / exercise.en.yaml

| フィールド | 型 | 説明 |
|-----------|------|------|
| `lesson.number` | string | レッスン番号（{chapter}_{lesson}形式: "01_01", "01_02", "02_01", ...） |
| `lesson.id` | string | レッスンID（ディレクトリ名: "hello", "variables"） |
| `lesson.title` | string | レッスンタイトル |
| `task_description` | string | 課題説明（HTML） |
| `instructions` | list[string] | 手順リスト（HTML） |
| `hints` | list[string] | ヒントリスト（HTML） |

#### code.yaml（言語共通）

| フィールド | 型 | 説明 |
|-----------|------|------|
| `initial_code` | string | エディタの初期コード |
| `initial_files` | list[object] | 初期ファイルリスト（通常は空配列） |
| `tests` | list[object] | テスト配列（name, description, codeを含む） |

### 6. ui_strings/ja.yaml の構造例（UI文言管理）

```yaml
# ページタイトル
page_title:
  theory: "理論"
  exercise: "演習課題"

# ヘッダー
header:
  lesson_prefix: "レッスン"  # "レッスン01" の "レッスン" 部分

# 言語スイッチャー
language_switcher:
  to_english: "English"
  to_japanese: "日本語"

# 理論ページ
theory:
  start_exercise: "演習を始める"

# 演習ページ
exercise:
  task_heading: "📋 課題内容"
  instructions_heading: "✏️ やること"
  hints_heading: "💡 ヒント"
  button_run: "実行"
  button_test: "テスト"
  button_reset: "リセット"
  button_clear: "クリア"
  status_ready: "準備完了"
  status_running: "実行中..."
  status_testing: "テスト中..."
```

### 7. ui_strings/en.yaml の構造例（UI文言管理）

```yaml
# ページタイトル
page_title:
  theory: "Theory"
  exercise: "Exercise"

# ヘッダー
header:
  lesson_prefix: "Lesson"  # "Lesson 01" の "Lesson" 部分

# 言語スイッチャー
language_switcher:
  to_english: "English"
  to_japanese: "日本語"

# 理論ページ
theory:
  start_exercise: "Start Exercise"

# 演習ページ
exercise:
  task_heading: "📋 Task"
  instructions_heading: "✏️ Instructions"
  hints_heading: "💡 Hints"
  button_run: "Run"
  button_test: "Test"
  button_reset: "Reset"
  button_clear: "Clear"
  status_ready: "Ready"
  status_running: "Running..."
  status_testing: "Testing..."
```

---

## build.pyの仕様

### 基本機能

```python
# メイン処理
1. ui_strings/*.yaml を読み込み（全言語のUI文言をロード）
2. lessons_data/*/を走査してレッスンディレクトリを検出
3. 各レッスンディレクトリに対して:
   a. theory.ja.yaml + ui_strings/ja.yaml を読み込み → theory.ja.html を生成
   b. theory.en.yaml + ui_strings/en.yaml を読み込み → theory.en.html を生成
   c. exercise.ja.yaml + code.yaml + ui_strings/ja.yaml を読み込み → exercise.ja.html を生成
   d. exercise.en.yaml + code.yaml + ui_strings/en.yaml を読み込み → exercise.en.html を生成
4. docs/lessons/{lesson_id}/ に出力
5. 各ファイルのバリデーション（必須フィールドチェック）
```

### UI文言の読み込み

```python
def load_ui_strings(lang):
    """
    指定された言語のUI文言を読み込む
    
    Args:
        lang: 言語コード ('ja', 'en', 'ko', etc.)
    
    Returns:
        UI文言の辞書
    """
    ui_file = f"ui_strings/{lang}.yaml"
    if not os.path.exists(ui_file):
        raise FileNotFoundError(f"UI strings file not found: {ui_file}")
    
    with open(ui_file, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)
```

### コマンドライン引数

```bash
# 全レッスンをビルド
python build.py

# 特定のレッスンのみビルド
python build.py 01_01_hello

# 複数指定
python build.py 01_01_hello 01_02_variables

# クリーンビルド（既存ファイルを削除してから生成）
python build.py --clean
```

### エラーハンドリング

- **YAMLパースエラー**: 構文エラーの行番号を表示
- **必須フィールド欠落**: どのフィールドが不足しているか明示
- **テンプレートエラー**: Jinja2のエラーメッセージを表示
- **ファイルI/Oエラー**: 読み書き失敗時の詳細を表示

### バリデーション機能

```python
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
        if not get_nested_value(data, field):
            errors.append(f"Missing required field: {field}")
    
    # testsの各要素が必須フィールドを持つかチェック
    if 'tests' in data:
        for i, test in enumerate(data['tests']):
            if 'name' not in test or 'ja' not in test['name'] or 'en' not in test['name']:
                errors.append(f"Test {i}: Missing name.ja or name.en")
            if 'code' not in test:
                errors.append(f"Test {i}: Missing code")
    
    if errors:
        raise ValidationError(f"{filename}: " + ", ".join(errors))
```

---

## Jinja2テンプレート設計

### theory_template.html の構造

```jinja2
<!DOCTYPE html>
<html lang="{{ lang }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ ui.page_title.theory }} - {{ lesson.title }}</title>
    <link rel="stylesheet" href="../../lib/css/theory.css">
</head>
<body>
    <header class="header">
        <h1>📚 {{ ui.header.lesson_prefix }}{{ lesson.number }}: {{ lesson.title }}</h1>
        <div id="language-switcher">
            {% if lang == 'ja' %}
                <a href="theory.en.html" class="language-link">{{ ui.language_switcher.to_english }}</a>
            {% else %}
                <a href="theory.ja.html" class="language-link">{{ ui.language_switcher.to_japanese }}</a>
            {% endif %}
        </div>
    </header>

    <main class="theory-content">
        {{ content|safe }}
    </main>

    <footer class="footer">
        <a href="exercise.{{ lang }}.html" class="btn-start">
            {{ ui.theory.start_exercise }}
        </a>
    </footer>
</body>
</html>
```

**ポイント:**
- 言語スイッチャーのリンクテキストも `ui.language_switcher.*` から取得

### exercise_template.html の構造

```jinja2
<!DOCTYPE html>
<html lang="{{ lang }}">
<head>
    <meta charset="UTF-8">
    <title>{{ ui.page_title.exercise }} - {{ lesson.title }}</title>
    <link rel="stylesheet" href="../../lib/css/exercise.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/editor/editor.main.css">
</head>
<body>
    <!-- タスクパネル -->
    <aside class="task-panel">
        <div class="task-description">
            <h3>{{ ui.exercise.task_heading }}</h3>
            {{ task_description|safe }}
        </div>
        <div class="instructions">
            <h4>{{ ui.exercise.instructions_heading }}</h4>
            <ul>
                {% for item in instructions %}
                <li>{{ item|safe }}</li>
                {% endfor %}
            </ul>
        </div>
        <div class="hints">
            <h4>{{ ui.exercise.hints_heading }}</h4>
            <ul>
                {% for item in hints %}
                <li>{{ item|safe }}</li>
                {% endfor %}
            </ul>
        </div>
    </aside>

    <!-- エディタとコンソール -->
    <main>
        <div id="editor-container"></div>
        <div id="console"></div>
    </main>

    <!-- スクリプト -->
    <script>
        const initialCode = {{ initial_code|tojson }};
        const initialFiles = {{ initial_files|tojson }};
        const tests = {{ tests|tojson }};
        const lang = {{ lang|tojson }};
        const uiStrings = {{ ui|tojson }};  // UI文言をJavaScriptでも利用可能に
    </script>
    <script src="https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js"></script>
    <script src="https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js"></script>
    <script src="../../lib/js/i18n.js"></script>
    <script src="../../lib/js/exercise-common.js"></script>
    <script src="../../lib/js/runner.js"></script>
    <script src="../../lib/js/tester.js"></script>
</body>
</html>
```

**ポイント:**
- `const uiStrings = {{ ui|tojson }}` でJavaScript側でもUI文言を利用可能に（ボタンラベルなど）

---

## 開発ワークフロー

### 新しいレッスンの作成手順

```bash
# 1. レッスンディレクトリを作成
mkdir -p lessons_data/01_02_variables

# 2. 既存のYAMLファイルをテンプレートとしてコピー
cp lessons_data/01_01_hello/*.yaml lessons_data/01_02_variables/

# 3. 各YAMLファイルを編集
# theory.ja.yaml:
#   - lesson.number を "01_02" に変更（チャプター1のレッスン2）
#   - lesson.id を "variables" に変更
#   - lesson.title を "変数と代入" に変更
#   - content を新しい内容に書き換え

# theory.en.yaml:
#   - lesson.number を "01_02" に変更（チャプター1のレッスン2）
#   - lesson.id を "variables" に変更
#   - lesson.title を "Variables and Assignment" に変更
#   - content を新しい内容に書き換え

# exercise.ja.yaml:
#   - lesson情報を更新
#   - task_description, instructions, hints を記述

# exercise.en.yaml:
#   - lesson情報を更新
#   - task_description, instructions, hints を記述

# code.yaml:
#   - initial_code を記述
#   - tests を記述

# 4. ビルドスクリプトを実行
python build.py 01_02_variables

# 5. ブラウザで確認
open http://localhost:8080/lessons/01_02_variables/theory.ja.html

# 6. 修正が必要な場合
#    - 該当するYAMLファイルを編集
#    - python build.py 01_02_variables を再実行
#    - ブラウザをリロード
```

### 監視モードでの開発

```bash
# ビルド
python build.py

# 別のターミナルでHTTPサーバー起動
cd docs && python3 -m http.server 8080

# YAMLファイルを編集した後、再度 python build.py を実行
# ブラウザをリロードすれば変更が反映される
```
