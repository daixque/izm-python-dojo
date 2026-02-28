## このプロジェクトについて

このプロジェクトでは、中学生程度の子ども向けのPythonプログラミング教材を提供します。
教材は、Pythonの基本的な文法や構文を学ぶことができ、子どもたちが楽しく学べるように、実際にコードを書いて動かすことができるようになっています。

最終的な成果物は、HTML形式の教材で、ブラウザ上で閲覧できるようになります。
各セクションで、まず理論的な説明があり、その後に実際のコード例が示されます。次に演習課題が提供され、子どもたちが自分でコードを書いてみることができます。

ブラウザ上で動作するインタラクティブな学習環境を提供します。学習者はブラウザ内でPythonコードを記述・実行・テストできます。

**主な技術：**
- Pyodide（WebAssembly版Python 3.12）
- Monaco Editor（VS Codeと同じエディタ）
- 完全クライアントサイド実行（サーバー不要）
- 多言語対応（日本語・英語）

## フォルダ構成

```text
python/
  README.md              # プロジェクト概要
  index.html             # 目次ページ（レッスン一覧）
  lib/                   # 共通ライブラリ
    css/
      theory.css         # 理論説明ページ用スタイル
      exercise.css       # 演習課題ページ用スタイル
    js/
      i18n.js            # 多言語対応ライブラリ（共通UIのみ）
      runner.js          # Pyodide実行エンジン
      editor.js          # Monaco Editor制御
      tester.js          # 自動テスト機能
  lessons/               # レッスンデータ
    metadata.ja.json     # レッスンメタデータ（日本語）
    metadata.en.json     # レッスンメタデータ（英語）
    01_hello/            # レッスン1: はじめてのPython
      theory.html        # 理論説明ページ
      exercise.html      # 演習課題ページ
      lesson.ja.json     # レッスンデータ（日本語）
      lesson.en.json     # レッスンデータ（英語）
    02_variables/        # (今後追加予定)
    03_if/               # (今後追加予定)
```

## 使い方

### ローカルサーバーで起動（推奨）

ブラウザのセキュリティ制約（CORS）対策のため、ローカルサーバーで起動してください：

```bash
cd python
python3 -m http.server 8080
```

その後、ブラウザで `http://localhost:8080` を開きます。

### 学習の流れ

1. **目次ページ**で学びたいレッスンを選択
2. **理論説明ページ**で概念を学習
3. **演習課題ページ**でコードを記述し、実行・テスト

## 多言語対応

このプロジェクトは日本語と英語に対応しています。

### 言語の切り替え方法

各ページの右上にある言語セレクターで日本語⇄英語を切り替えできます。選択した言語は自動的に記憶され、次回アクセス時も同じ言語が表示されます。

また、URL パラメータを使用して直接言語を指定することもできます：
- 日本語: `http://localhost:8080/?lang=ja`
- 英語: `http://localhost:8080/?lang=en`

### 翻訳の仕組み

多言語対応は階層的な構造で実現されています：

#### 1. 共通UIラベル（`lib/js/i18n.js`）
すべてのページで共通して使用されるUI要素の翻訳を管理します：
- ボタンラベル（実行、テスト、リセットなど）
- ステータスメッセージ（準備中、実行完了など）
- エラーメッセージ
- セクションラベル（理論、演習など）

**編集が必要な場面**: 新しい共通UIコンポーネントやメッセージを追加する場合のみ

#### 2. レッスンメタデータ（`lessons/metadata.{lang}.json`）
目次ページで表示されるレッスンの一覧情報を管理します：
- レッスン番号
- レッスンタイトル
- レッスンの説明
- 公開状態（available: true/false）

**編集が必要な場面**: 新しいレッスンを追加する場合

#### 3. レッスンコンテンツ（`lessons/{id}/lesson.{lang}.json`）
各レッスン固有のコンテンツを管理します：
- 理論説明（sections, examples）
- 演習課題（task, instructions, hints）
- テストケース（tests）

**編集が必要な場面**: レッスンの内容を作成・編集する場合

### 新しい言語を追加する方法

#### 1. 共通UIテキストの翻訳

`lib/js/i18n.js` の `translations` オブジェクトに新しい言語コードを追加：

```javascript
const translations = {
    ja: { /* 日本語翻訳 */ },
    en: { /* 英語翻訳 */ },
    fr: { /* 新しい言語（例：フランス語） */ }
};
```

#### 2. レッスンメタデータの翻訳

`lessons/metadata.{lang}.json` ファイルを作成：

```bash
# 既存のファイルをコピーして編集
cp lessons/metadata.ja.json lessons/metadata.fr.json
```

#### 3. レッスンコンテンツの翻訳

各レッスンフォルダに `lesson.{lang}.json` ファイルを作成：

```bash
cp lessons/01_hello/lesson.ja.json lessons/01_hello/lesson.fr.json
```

#### 4. 言語セレクターへの追加

`lib/js/i18n.js` の `createLanguageSwitcher` 関数に新しいオプションを追加：

```javascript
switcher.innerHTML = `
    <select id="language-select" class="language-select">
        <option value="ja" ${currentLang === 'ja' ? 'selected' : ''}>${t('lang_ja')}</option>
        <option value="en" ${currentLang === 'en' ? 'selected' : ''}>${t('lang_en')}</option>
        <option value="fr" ${currentLang === 'fr' ? 'selected' : ''}>${t('lang_fr')}</option>
    </select>
`;
```

そして `lang_fr` キーを translations オブジェクトに追加：

```javascript
ja: { lang_fr: "Français" },
en: { lang_fr: "Français" },
fr: { lang_fr: "Français" }
```


## レッスンの構成

それぞれのレッスンは以下のような構成を持つものとします。

1. **理論説明ページ** (`theory.html`): Pythonの基本的な概念や文法、およびコード例を説明。
2. **演習課題ページ** (`exercise.html`): 学習者が自分でコードを書いてみるための課題を提供。コードを実行するためのUIを提供。

### 演習課題の機能

- **コードエディタ**: Monaco Editor（VS Code同等）でコード記述
- **実行機能**: Pyodideでブラウザ内でPython実行
- **自動テスト**: 実行結果を評価し、正解か不正解かをフィードバック
- **ヒント表示**: 学習者をサポートするヒントを表示

### レッスンデータ形式

各レッスンは言語ごとに `lesson.{lang}.json` ファイルを持ち、以下の形式で記述します：

```json
{
  "id": "lesson01",
  "title": "レッスン名",
  "theory": {
    "title": "理論のタイトル",
    "sections": [...],
    "examples": [...]
  },
  "exercise": {
    "task": "課題内容",
    "initialCode": "初期コード",
    "tests": [
      {
        "name": "テスト名",
        "description": "テストの説明",
        "code": "テスト用Pythonコード"
      }
    ]
  }
}
```

**注意**: `lesson.json` という名前のファイルは使用しません。必ず `lesson.ja.json`、`lesson.en.json` のように言語コードを含めてください。
