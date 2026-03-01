# レッスンテンプレート

このディレクトリには、新しいレッスンを作成する際のテンプレートファイルが含まれています。

## ファイル一覧

- `exercise_template.ja.html` - 日本語版演習ページテンプレート
- `exercise_template.en.html` - 英語版演習ページテンプレート
- `learn_template.ja.html` - 日本語版理論ページテンプレート
- `learn_template.en.html` - 英語版理論ページテンプレート

## プレースホルダー一覧

テンプレート内の以下のプレースホルダーを実際の内容に置き換えてください。

### 共通プレースホルダー

| プレースホルダー | 説明 | 例 |
|---|---|---|
| `{{LESSON_NUMBER}}` | レッスン番号（2桁） | `01`, `02`, `15` |
| `{{LESSON_TITLE}}` | レッスンタイトル | `はじめてのPython`, `First Steps with Python` |

### 演習ページ (exercise_template) のプレースホルダー

| プレースホルダー | 説明 | 形式 |
|---|---|---|
| `{{TASK_DESCRIPTION}}` | 課題内容 | HTMLタグ（`<p>`, `<ul>`など） |
| `{{INSTRUCTIONS}}` | やること/指示 | HTMLタグ（通常は`<ul><li>...</li></ul>`） |
| `{{HINTS}}` | ヒント | HTMLタグ（通常は`<ul><li>...</li></ul>`） |
| `{{INITIAL_CODE}}` | 初期コード | Pythonコード（複数行可） |
| `{{TESTS}}` | テストコード | JavaScript配列 |
| `{{INITIAL_FILES}}` | 初期ファイル | JavaScript配列（通常は`[]`） |

### 理論ページ 説明ページ (learn_template) のプレースホルダー

| プレースホルダー | 説明 | 形式 |
|---|---|---|
| `{{LEARN_CONTENT}}` | 説明の本文 | HTMLセクション（`<section>`タグ） |

## 使用例

### 1. exercise.ja.html の作成

```html
<!-- TASK_DESCRIPTION の例 -->
<p>「Hello, World!」と表示するプログラムを書いてみましょう。</p>

<!-- INSTRUCTIONS の例 -->
<ul>
    <li><code>print()</code>関数を使います</li>
    <li>カッコの中に、ダブルクォーテーションで囲んだ「Hello, World!」を書きます</li>
    <li>最後のカッコを閉じるのを忘れずに！</li>
</ul>

<!-- HINTS の例 -->
<ul>
    <li>print()のカッコの中に、ダブルクォーテーションで囲んだ文字を書きます</li>
    <li>正解例: print("Hello, World!")</li>
</ul>
```

**INITIAL_CODE の例:**
```python
# ここにコードを書いてみよう

```

**TESTS の例:**
```javascript
[
    {
        name: "テスト1: Hello, World!を表示",
        description: "正しく「Hello, World!」と表示できているか",
        code: `import sys
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
    result = {"passed": True, "message": "✓ 正解です！"}
else:
    result = {"passed": False, "message": f"✗ 出力が違います。\\n期待: {repr(expected)}\\n実際: {repr(output)}"}

result`
    }
]
```

**INITIAL_FILES の例:**
```javascript
// 通常のレッスンでは空配列
[]

// データ分析レッスンなどで初期ファイルが必要な場合
[
    {
        name: 'data.csv',
        content: 'name,age\\nAlice,25\\nBob,30\\n'
    }
]
```

### 2. learn.ja.html の作成

**LEARN_CONTENT の例:**
```html
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

## 新しいレッスンの作成手順

### 1. レッスンディレクトリの作成

```bash
# 例: レッスン2を作成する場合
mkdir -p python/docs/lessons/02_variables
cd python/docs/lessons/02_variables
```

### 2. テンプレートをコピー

```bash
# テンプレートディレクトリから
cp ../../../../templates/exercise_template.ja.html exercise.ja.html
cp ../../../../templates/exercise_template.en.html exercise.en.html
cp ../../../../templates/learn_template.ja.html learn.ja.html
cp ../../../../templates/learn_template.en.html learn.en.html
```

### 3. プレースホルダーの置き換え

各ファイルを開いて、プレースホルダーを実際の内容に置き換えます。

**検索・置換を活用:**
- `{{LESSON_NUMBER}}` → `02`
- `{{LESSON_TITLE}}` → 日本語版は `変数と代入`、英語版は `Variables and Assignment`
- その他のプレースホルダーも同様に置き換え

### 4. 動作確認

1. ブラウザで `http://localhost:8080/lessons/02_variables/learn.ja.html` を開く
2. 理論ページの内容を確認
3. 「演習を始める」ボタンで演習ページに移動
4. コードを書いて実行・テストが正しく動作するか確認

## テストコードの書き方

テストコードは Python で記述し、以下の形式に従います：

```python
import sys
from io import StringIO

# 標準出力をキャプチャ
old_stdout = sys.stdout
sys.stdout = StringIO()

try:
    exec(user_code)  # ユーザーのコードを実行
    output = sys.stdout.getvalue()
finally:
    sys.stdout = old_stdout

# テストロジック
if output == "期待される出力\\n":
    result = {"passed": True, "message": "✓ 正解です！"}
else:
    result = {"passed": False, "message": "✗ エラーメッセージ"}

result  # 最後に result を返す
```

**重要なポイント:**
- `user_code` 変数にユーザーのコードが入っている
- 最後に `result` 辞書を返す（`passed` と `message` キー）
- 文字列内の改行は `\\n` とエスケープする

## 注意事項

1. **ファイル名の規則**: `exercise.ja.html`, `exercise.en.html`, `learn.ja.html`, `learn.en.html` を厳守
2. **レッスン番号**: 2桁（`01`, `02`, ...）で統一
3. **相対パス**: テンプレートは `../../lib/` から参照する前提（`docs/lessons/XX_name/` に配置）
4. **言語判定**: i18n.js がファイル名から自動判定するため、ファイル名規則を守る
5. **テストの改行**: JavaScript 文字列内の Python コードでは `\\n` を使用

## トラブルシューティング

### ページが真っ白になる

- ブラウザの開発者ツール（Console）でエラーを確認
- スクリプトファイルのパスが正しいか確認（`../../lib/js/...`）

### テストが実行されない

- `TESTS` 配列の JSON 形式が正しいか確認
- Python コード内の引用符のエスケープを確認

### 言語が切り替わらない

- ファイル名が `.ja.html` または `.en.html` で終わっているか確認
- i18n.js が正しく読み込まれているか確認

## 参考

実際のレッスン例は `docs/lessons/01_hello/` を参照してください。
