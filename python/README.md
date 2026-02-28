## このプロジェクトについて

このプロジェクトでは、中学生程度の子ども向けのPythonプログラミング教材を提供します。
ブラウザ上で動作するインタラクティブな学習環境で、学習者はブラウザ内でPythonコードを記述・実行・テストできます。

**主な特徴：**
- 📝 **完全なHTMLドキュメント**: 各ページにコンテンツが直接埋め込まれており、1つのURLで完結
- 🌐 **GitHub Pages対応**: サーバーサイドロジック不要で静的ホスティング可能
- 🚀 **ブラウザ内Python実行**: Pyodide（WebAssembly版Python 3.12）を使用
- ✏️ **高品質エディタ**: Monaco Editor（VS Codeと同じエディタ）を搭載
- 🌍 **多言語対応**: 日本語・英語の完全対応

## フォルダ構成

```text
python/
  README.md                        # プロジェクト概要
  docs/                            # Webコンテンツ（GitHub Pages公開用）
    index.html                     # 目次ページ（レッスン一覧）
    lib/                           # 共通ライブラリ
      css/
        theory.css                 # 理論説明ページ用スタイル
        exercise.css               # 演習課題ページ用スタイル
      js/
        i18n.js                    # 多言語対応（index.htmlのみ使用）
        runner.js                  # Pyodide実行エンジン
        editor.js                  # Monaco Editor制御
        tester.js                  # 自動テスト機能
    lessons/                       # レッスンデータ
      metadata.ja.json             # レッスンメタデータ（日本語）
      metadata.en.json             # レッスンメタデータ（英語）
      01_hello/                    # レッスン1: はじめてのPython
        theory.ja.html             # 理論説明ページ（日本語）
        theory.en.html             # 理論説明ページ（英語）
        exercise.ja.html           # 演習課題ページ（日本語）
        exercise.en.html           # 演習課題ページ（英語）
      02_variables/                # (今後追加予定)
      03_if/                       # (今後追加予定)
```

## 使い方

### ローカルサーバーで起動

```bash
cd python/docs
python3 -m http.server 8080
```

ブラウザで `http://localhost:8080` を開きます。

### GitHub Pagesでの公開

1. GitHubリポジトリの Settings → Pages を開く
2. Source で `main` ブランチと `/docs` フォルダを選択
3. Save をクリック

数分後、`https://<username>.github.io/<repository>/` でアクセス可能になります。

### 学習の流れ

1. **目次ページ**で学びたいレッスンを選択
2. **理論説明ページ**で概念を学習
3. **演習課題ページ**でコードを記述し、実行・テスト

## 多言語対応

### 基本概念

このプロジェクトでは、**言語ごとに独立したHTMLファイル**を持つ設計を採用しています：

- `theory.ja.html` / `theory.en.html` - 理論ページ
- `exercise.ja.html` / `exercise.en.html` - 演習ページ

各HTMLファイルには全てのコンテンツが直接埋め込まれており、JavaScriptなしでも内容が読めます。

### 言語の切り替え方法

**目次ページ（docs/index.html）:**
- 右上の言語セレクターで切り替え
- 選択した言語は記憶され、適切な言語のページへリンク

**レッスンページ:**
- 各ページ右上に言語切り替えリンクを配置
- 例: 日本語ページには「English」リンク、英語ページには「日本語」リンク

### 翻訳が必要なファイル

新しい言語を追加する際に編集が必要なファイル：

#### 1. 目次ページの共通UI（`docs/lib/js/i18n.js`）
- ボタンラベル（理論、演習など）
- システムメッセージ

#### 2. レッスンメタデータ（`docs/lessons/metadata.{lang}.json`）
目次ページに表示されるレッスン一覧：

```json
{
  "lessons": [
    {
      "id": "01_hello",
      "number": 1,
      "title": "はじめてのPython",
      "description": "print関数を使って「Hello, World!」を表示してみよう。",
      "available": true
    }
  ]
}
```

#### 3. レッスンページ（`docs/lessons/{id}/theory.{lang}.html`, `exercise.{lang}.html`）
各言語用のHTMLファイルを作成し、全コンテンツを翻訳して埋め込みます。

## レッスンの構成

各レッスンは以下の4つのHTMLファイルで構成されます：

1. **theory.ja.html** - 日本語の理論説明（コンテンツ全て埋め込み）
2. **theory.en.html** - 英語の理論説明（コンテンツ全て埋め込み）
3. **exercise.ja.html** - 日本語の演習課題（コンテンツ全て埋め込み）
4. **exercise.en.html** - 英語の演習課題（コンテンツ全て埋め込み）

### 演習課題の機能

- **コードエディタ**: Monaco Editor（VS Code同等）でコード記述
- **実行機能**: Pyodideでブラウザ内でPython実行
- **自動テスト**: 実行結果を評価し、正解か不正解かをフィードバック
- **ヒント表示**: 学習者をサポートするヒントを表示

## 新しいレッスンの追加方法

### 手順

#### 1. レッスンフォルダの作成

```bash
mkdir docs/lessons/02_variables
```

#### 2. HTMLファイルの作成

既存のレッスンをテンプレートとしてコピー：

```bash
cd docs/lessons/02_variables
cp ../01_hello/theory.ja.html theory.ja.html
cp ../01_hello/theory.en.html theory.en.html
cp ../01_hello/exercise.ja.html exercise.ja.html
cp ../01_hello/exercise.en.html exercise.en.html
```

#### 3. コンテンツの編集

各HTMLファイルを開いて、レッスン内容を編集：

**theory.ja.html / theory.en.html:**
- `<title>` タグ
- `<h1>` レッスンタイトル
- `<section>` 内の理論説明
- コード例

**exercise.ja.html / exercise.en.html:**
- `<title>` タグ
- `<h1>` レッスンタイトル
- 課題説明（`<div class="task-description">`）
- 指示（`<div class="instructions">`）
- ヒント（`<div class="hints">`）
- 初期コード（`INITIAL_CODE` 変数）
- テストケース（`TESTS` 配列）

#### 4. メタデータの更新

**docs/lessons/metadata.ja.json** と **docs/lessons/metadata.en.json** にレッスン情報を追加：

```json
{
  "lessons": [
    {
      "id": "01_hello",
      "number": 1,
      "title": "はじめてのPython",
      "description": "print関数を使って「Hello, World!」を表示してみよう。",
      "available": true
    },
    {
      "id": "02_variables",
      "number": 2,
      "title": "変数と計算",
      "description": "変数を使ってデータを保存し、計算をしてみよう。",
      "available": true
    }
  ]
}
```

#### 5. ナビゲーションリンクの追加（オプション）

前後のレッスンがある場合、フッターにナビゲーションリンクを追加：

```html
<footer class="footer">
    <a href="../../index.html" class="btn btn-secondary">← 目次に戻る</a>
    <div style="display: flex; gap: 12px;">
        <a href="exercise.ja.html" class="btn btn-primary">演習を始める →</a>
        <a href="../02_variables/theory.ja.html" class="btn btn-primary">次のレッスン →</a>
    </div>
</footer>
```

### 完了

以上でレッスンの追加は完了です。ブラウザをリロードすると、目次ページに新しいレッスンが表示されます。

## 設計思想

このプロジェクトは**「HTMLはドキュメントであり、それ自体がデータ」**という原則に基づいています：

- ✅ URLにアクセスすればコンテンツが直接読める
- ✅ 検索エンジンがコンテンツをインデックス可能
- ✅ GitHub Pagesなど静的ホスティングで動作
- ✅ サーバーサイドロジック不要

この設計により、メンテナンス性、可搬性、アクセシビリティが向上しています。

## ファイル操作機能

### ファイルエクスプローラー

演習ページ（`exercise.*.html`）には、右側にファイルエクスプローラーが配置されています。
Pythonコードでファイルを作成・操作すると、ここに表示されます。

**機能：**
- 📁 **ファイル一覧**: Pyodideの仮想ファイルシステム（`/home/pyodide`）内のファイルを表示
- 👁️ **プレビュー**: ファイルをクリックすると内容を確認できます
- ⬇️ **ダウンロード**: ファイルをローカルに保存
- 🗑️ **削除**: 不要なファイルを削除
- ◀▶ **折りたたみ**: ヘッダーをクリックすると表示/非表示を切り替え

**レイアウト：**
- デスクトップ（>1200px）: タスクパネル | コード/コンソール | ファイルエクスプローラー
- タブレット（768-1200px）: コード/コンソールのみ（タスクとファイルは非表示）
- モバイル（<768px）: 縦積み表示、ファイルエクスプローラーは非表示

### 事前ロードされたファイル

データ分析などのレッスンで、最初から既存のファイルを用意することができます。

**使い方：**

`exercise.*.html` の `<script>` 内で `INITIAL_FILES` 配列を定義します：

```javascript
// 事前ロードするファイル
const INITIAL_FILES = [
    {
        name: 'students.csv',
        content: 'name,age,grade\nAlice,14,8\nBob,13,7\nCharlie,15,9\n'
    },
    {
        name: 'README.txt',
        content: 'このファイルには学生データが含まれています。\nPythonで読み込んで分析してみましょう。'
    }
];
```

この配列を `fileExplorer.init()` に渡します：

```javascript
window.fileExplorer.init({
    initialFiles: INITIAL_FILES
});
```

あとは `loadInitialFiles()` を呼び出すだけ：

```javascript
await window.pyodideRunner.init();
await window.fileExplorer.loadInitialFiles();
```

**活用例：**
- **Lesson 18（データ集計）**: CSVファイルを事前配置し、集計プログラムを書く
- **Lesson 19（ファイル操作）**: サンプルテキストファイルを用意し、読み書き練習
- **Lesson 20（最終プロジェクト）**: データベースやタスクリストのテンプレートを提供

### ファイル操作API

`runner.js` は Pyodide のファイルシステムを操作するAPIを提供します：

```javascript
// ファイル一覧を取得
const files = window.pyodideRunner.fs.listFiles();

// ファイル内容を読み込み
const content = window.pyodideRunner.fs.readFile('data.csv');

// ファイルの存在確認
const exists = window.pyodideRunner.fs.fileExists('data.csv');

// ファイルを削除
window.pyodideRunner.fs.deleteFile('old.txt');

// ファイルをダウンロード
window.pyodideRunner.fs.downloadFile('result.csv');
```

Pythonコード内では通常のファイル操作：

```python
# ファイル書き込み
with open('output.txt', 'w') as f:
    f.write('Hello, File!')

# ファイル読み込み
with open('data.csv', 'r') as f:
    content = f.read()
    print(content)
```
