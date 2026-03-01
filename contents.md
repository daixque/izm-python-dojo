# Python学習プラットフォーム - レッスン一覧

中学生向けのPythonプログラミング教材として、基礎から応用まで段階的に学べるレッスンを提供します。

## 📚 カリキュラム構成

### 第1章：プログラミングの基礎

#### ✅ レッスン1: はじめてのPython (01_hello)
**ステータス:** 完成
**学習内容:**
- プログラミングとは何か
- `print()` 関数の使い方
- 文字列の表示
- Hello, World!プログラムの作成

**演習課題:**
- 「Hello, World!」と表示するプログラムを書く

---

#### ✅ レッスン2: 変数と計算 (01_02_variables)
**ステータス:** 完成
**学習内容:**
- 変数とは何か
- 変数への代入
- 数値の計算（四則演算）
- 変数を使った計算
- データ型の基本（整数、小数、文字列）

**演習課題:**
- 2つの数値を変数に代入し、合計を計算して表示する
- 自分の年齢を変数に入れて、10年後の年齢を計算する

---

#### ✅ レッスン3: データ型と変換 (01_03_types)
**ステータス:** 完成
**学習内容:**
- 主なデータ型（int, float, str, bool）
- 型変換（キャスト）
- `type()` 関数の使い方
- 文字列と数値の違い
- 文字列の連結

**演習課題:**
- 文字列として受け取った数値を計算に使う
- 計算結果を文字列に変換してメッセージを表示する

---

#### ✅ レッスン4: ユーザー入力 (01_04_input)
**ステータス:** 完成
**学習内容:**
- `input()` 関数の使い方
- ユーザーからのデータ取得
- 入力データの型変換
- インタラクティブなプログラム作成

**演習課題:**
- ユーザーに名前を聞いて、挨拶を返すプログラム

---

#### ✅ レッスン5: デバッグの基礎 (01_05_debug)
**ステータス:** 完成
**学習内容:**
- エラーメッセージの読み方
- よくあるエラーの種類（構文エラー、型エラー、名前エラー）
- エラーの原因を特定する方法
- デバッグの基本テクニック
- `print()` を使ったデバッグ

**演習課題:**
- バグのあるコードを修正する（構文エラー、型エラー、変数名の間違い）

---

### 第2章：条件分岐

#### 📝 レッスン6: 条件分岐の基礎 (02_01_if_basic)
**ステータス:** 完成
**学習内容:**
- `if` 文の基本構文
- 比較演算子（`==`, `!=`, `>`, `<`, `>=`, `<=`）
- インデント（字下げ）の重要性
- 真偽値（True/False）

**演習課題:**
- 数値の正負判定プログラム
  - 関数 `check_sign(number)` を実装
  - 数値を引数として受け取り、その数が正の数、負の数、ゼロのいずれかを判定
  - 戻り値：判定結果を示す文字列
    - 正の数（0より大きい） → `"positive"`
    - 負の数（0より小さい） → `"negative"`
    - ゼロ → `"zero"`
  - 初期コード：関数の定義と呼び出し部分は用意済み
  - ユーザーは if 文を使った条件判定のみを実装
  - テスト：様々な数値で正しく判定できるかをチェック
    - 例：`check_sign(10)` → `"positive"`
    - 例：`check_sign(-5)` → `"negative"`
    - 例：`check_sign(0)` → `"zero"`
    - 例：`check_sign(0.5)` → `"positive"`（小数も対応）

---

#### ✅ レッスン7: else と elif (02_02_if_else)
**ステータス:** 完成
**学習内容:**
- `else` 文の使い方
- `elif` による複数条件の分岐
- 条件の優先順位
- フローチャートの読み方
- 乱数の生成（`random` モジュールの基礎）

**演習課題:**
- じゃんけんゲームのプログラム
  - ユーザーが1: グー、2: チョキ、3: パーを入力
  - コンピュータがランダムに手を選択
  - 勝敗を判定して表示する
  - ユーザーは条件判定のみを実装する（コンピュータの手は用意されたコードで生成）
  - 条件判定部分をメソッドとしておき、ユーザーはそのメソッドを呼び出して勝敗を判定する
  - テストはこの条件判定メソッドに対して行う（ユーザーがぐー、コンピュータがチョキの場合ならユーザーの勝ち、など）

---

#### 📝 レッスン8: 論理演算子 (02_03_logic)
**ステータス:** 完成
**学習内容:**
- `and` 演算子
- `or` 演算子
- `not` 演算子
- 複雑な条件式の作成
- 真偽値表の理解

**演習課題:**
- 遊園地のアトラクション利用判定プログラム
  - 遊園地に来た4人の中で、唯一アトラクションに乗れるのは誰かを見つける
  - アトラクションの条件：「6歳以上」かつ「身長120cm以上」
  - 初期コード：
    - 4人のデータ（A、B、C、D）が変数として定義済み
      - A: 8歳, 125cm → 変数 `age_a = 8`, `height_a = 125`
      - B: 5歳, 130cm → 変数 `age_b = 5`, `height_b = 130`
      - C: 10歳, 115cm → 変数 `age_c = 10`, `height_c = 115`
      - D: 4歳, 140cm → 変数 `age_d = 4`, `height_d = 140`
  - ユーザーは各人について条件判定を実装
    - `if` 文と `and` 演算子を使って条件チェック
    - 条件を満たす人がいたら、その人の名前（A、B、C、またはD）だけを表示
    - 例：`print("A")` のように表示
  - 関数は使用しない（まだ学習していない）
  - inputは使用しない（データは最初から変数で定義されている）
  - ループは使用しない（まだ学習していない）
  - テスト：正しい人の名前が表示されるかをチェック
    - 期待される出力：`A`（8歳、125cm で両方の条件を満たす唯一の人）



---

### 第3章：繰り返し処理

#### 📝 レッスン9: for ループの基礎 (03_01_for_basic)
**ステータス:** 未実装
**学習内容:**
- `for` ループの基本構文
- `range()` 関数の使い方
- ループ変数の理解
- 繰り返し処理の考え方

**演習課題:**
- 九九の表を表示するプログラム
  - 関数 `print_multiplication_table(n)` を実装（n は段数：1〜9）
  - n の段の九九を表示する（例：n=3 なら「3 × 1 = 3」から「3 × 9 = 27」まで）
  - `for` ループと `range(1, 10)` を使って1から9まで繰り返す
  - 各行の出力形式：`{n} × {i} = {n*i}` （例：「3 × 5 = 15」）
  - 初期コード：関数の定義と呼び出し部分は用意済み
  - ユーザーは関数内のループ部分を実装
  - テスト：異なる段数で正しく九九が表示されるかをチェック
    - 例：`print_multiplication_table(2)` → 2の段を9行表示
    - 例：`print_multiplication_table(7)` → 7の段を9行表示

模範解答コード

```python
def print_multiplication_table(n):
    for i in range(1, 10):
        print(f"{n} × {i} = {n * i}")

# テスト例
print_multiplication_table(3)
# 出力：
# 3 × 1 = 3
# 3 × 2 = 6
# 3 × 3 = 9
# 3 × 4 = 12
# 3 × 5 = 15
# 3 × 6 = 18
# 3 × 7 = 21
# 3 × 8 = 24
# 3 × 9 = 27
```

---

#### 📝 レッスン10: for ループの応用 (03_02_for_advanced)
**ステータス:** 未実装
**学習内容:**
- `range()` の応用（開始、終了、ステップ）
- ループ内での計算
- 合計や平均の計算
- カウンター変数の活用

**演習課題:**
- 1からnまでの合計を計算するプログラム
  - 関数 `sum_numbers(n)` を実装（n は正の整数）
  - 1 から n までの全ての整数の合計を返す
  - `for` ループで `range(1, n+1)` を使い、合計用の変数に値を加算していく
  - 初期コード：関数の枠組みは用意済み、合計用の変数 `total = 0` も初期化済み
  - ユーザーはループ部分と戻り値を実装
  - テスト：複数の n で正しい合計が計算されるかをチェック
    - 例：`sum_numbers(5)` → `15` （1+2+3+4+5）
    - 例：`sum_numbers(10)` → `55` （1+2+...+10）
    - 例：`sum_numbers(100)` → `5050`

模範解答コード

```python
def sum_numbers(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total

# テスト例
print(sum_numbers(5))   # 15
print(sum_numbers(10))  # 55
print(sum_numbers(100)) # 5050
```

---

#### 📝 レッスン11: while ループ (03_03_while)
**ステータス:** 未実装
**学習内容:**
- `while` ループの基本構文
- 条件が真の間繰り返す
- `break` 文によるループの脱出
- `continue` 文によるスキップ
- 無限ループの危険性

**演習課題:**
- 数当てゲームの判定ロジック
  - 関数 `check_guess(secret, guess)` を実装
  - `secret`：正解の数値（1〜100）、`guess`：ユーザーの予想
  - 戻り値：判定結果を示す文字列
    - 予想が正解より小さい → `"Too low"`
    - 予想が正解より大きい → `"Too high"`
    - 予想が正解と一致 → `"Correct"`
  - 初期コード：ゲームのメインループ（while文）と入力処理は用意済み
  - ユーザーは判定関数の条件分岐のみを実装
  - テスト：様々な正解と予想の組み合わせで正しい判定が返るかをチェック
    - 例：`check_guess(50, 30)` → `"Too low"`
    - 例：`check_guess(50, 70)` → `"Too high"`
    - 例：`check_guess(50, 50)` → `"Correct"`

模範解答コード

```python
def check_guess(secret, guess):
    if guess < secret:
        return "Too low"
    elif guess > secret:
        return "Too high"
    else:
        return "Correct"

# テスト例
print(check_guess(50, 30))  # "Too low"
print(check_guess(50, 70))  # "Too high"
print(check_guess(50, 50))  # "Correct"
```

---

### 第4章：データ構造

#### 📝 レッスン12: リストの基礎 (04_01_list_basic)
**ステータス:** 未実装
**学習内容:**
- リストとは何か
- リストの作成方法
- 要素へのアクセス（インデックス）
- リストの長さ（`len()`）
- リストの変更

**演習課題:**
- リストから特定の要素を取得するプログラム
  - 関数 `get_element(fruits, index)` を実装
  - `fruits`：果物の名前が入ったリスト、`index`：取得したい位置（0始まり）
  - 指定されたインデックスの要素を返す
  - インデックスがリストの範囲外の場合は `None` を返す
  - 初期コード：関数の定義と、サンプルのリストは用意済み
  - ユーザーは範囲チェックと要素取得のロジックを実装
  - テスト：様々なインデックスで正しい要素が取得できるかをチェック
    - 例：`get_element(["apple", "banana", "orange"], 0)` → `"apple"`
    - 例：`get_element(["apple", "banana", "orange"], 2)` → `"orange"`
    - 例：`get_element(["apple", "banana"], 5)` → `None`（範囲外）

模範解答コード

```python
def get_element(fruits, index):
    if 0 <= index < len(fruits):
        return fruits[index]
    else:
        return None

# テスト例
print(get_element(["apple", "banana", "orange"], 0))  # "apple"
print(get_element(["apple", "banana", "orange"], 2))  # "orange"
print(get_element(["apple", "banana"], 5))            # None
```

---

#### 📝 レッスン13: リストの操作 (04_02_list_advanced)
**ステータス:** 未実装
**学習内容:**
- 要素の追加（`append()`, `insert()`）
- 要素の削除（`remove()`, `pop()`）
- リストのスライス
- リストのソート（`sort()`, `sorted()`）
- `in` 演算子による検索

**演習課題:**
- 数値リストから最大値を見つけるプログラム
  - 関数 `find_max(numbers)` を実装
  - `numbers`：数値が入ったリスト（空でない）
  - リスト内の最大値を返す
  - `max()` 関数は使わず、forループで全要素を比較して最大値を見つける
  - 初期コード：関数の枠組みと、最大値を記録する変数の初期化方法のヒントあり
  - ユーザーはループと比較のロジックを実装
  - テスト：様々な数値リストで正しい最大値が返るかをチェック
    - 例：`find_max([3, 7, 2, 9, 1])` → `9`
    - 例：`find_max([5])` → `5`（要素が1つ）
    - 例：`find_max([-5, -2, -10, -1])` → `-1`（負の数）

模範解答コード

```python
def find_max(numbers):
    max_value = numbers[0]  # 最初の要素を最大値として初期化
    for num in numbers:
        if num > max_value:
            max_value = num
    return max_value

# テスト例
print(find_max([3, 7, 2, 9, 1]))      # 9
print(find_max([5]))                  # 5
print(find_max([-5, -2, -10, -1]))   # -1
```

---

#### 📝 レッスン14: for ループとリスト (04_03_list_loop)
**ステータス:** 未実装
**学習内容:**
- リストの各要素に対するループ
- `enumerate()` によるインデックス付きループ
- リスト内包表記の基礎
- リストのフィルタリング

**演習課題:**
- リストから偶数だけを抽出するプログラム
  - 関数 `filter_even(numbers)` を実装
  - `numbers`：整数が入ったリスト
  - 偶数のみを含む新しいリストを返す
  - forループで各要素をチェックし、偶数（`n % 2 == 0`）なら結果リストに追加
  - 初期コード：関数の枠組みと、結果を格納する空リスト `result = []` は用意済み
  - ユーザーはループと条件判定、リストへの追加処理を実装
  - テスト：様々な数値リストで正しく偶数だけが抽出されるかをチェック
    - 例：`filter_even([1, 2, 3, 4, 5, 6])` → `[2, 4, 6]`
    - 例：`filter_even([1, 3, 5])` → `[]`（偶数なし）
    - 例：`filter_even([10, 15, 20, 25])` → `[10, 20]`

模範解答コード

```python
def filter_even(numbers):
    result = []
    for num in numbers:
        if num % 2 == 0:
            result.append(num)
    return result

# テスト例
print(filter_even([1, 2, 3, 4, 5, 6]))  # [2, 4, 6]
print(filter_even([1, 3, 5]))           # []
print(filter_even([10, 15, 20, 25]))    # [10, 20]
```

---

#### 📝 レッスン15: 辞書の基礎 (04_04_dict)
**ステータス:** 未実装
**学習内容:**
- 辞書（dict）とは何か
- キーと値のペア
- 辞書の作成と要素へのアクセス
- 要素の追加と変更
- `keys()`, `values()`, `items()` メソッド

**演習課題:**
- 生徒の点数を検索するプログラム
  - 関数 `get_score(students, name)` を実装
  - `students`：生徒名（文字列）をキー、点数（整数）を値とする辞書
  - `name`：検索したい生徒の名前
  - その生徒の点数を返す。存在しない名前の場合は `-1` を返す
  - 初期コード：関数の定義と、サンプルの辞書は用意済み
  - ユーザーは辞書からの値の取得と、存在チェック（`in` 演算子）を実装
  - テスト：様々な名前で正しい点数が返るかをチェック
    - 例：`get_score({"Alice": 85, "Bob": 92, "Charlie": 78}, "Alice")` → `85`
    - 例：`get_score({"Alice": 85, "Bob": 92}, "Charlie")` → `-1`（存在しない）
    - 例：`get_score({"田中": 88, "佐藤": 95}, "佐藤")` → `95`

模範解答コード

```python
def get_score(students, name):
    if name in students:
        return students[name]
    else:
        return -1

# テスト例
print(get_score({"Alice": 85, "Bob": 92, "Charlie": 78}, "Alice"))  # 85
print(get_score({"Alice": 85, "Bob": 92}, "Charlie"))               # -1
print(get_score({"田中": 88, "佐藤": 95}, "佐藤"))                   # 95
```

---

### 第5章：関数

#### 📝 レッスン16: 関数の基礎 (05_01_function_basic)
**ステータス:** 未実装
**学習内容:**
- 関数とは何か
- `def` による関数定義
- 関数の呼び出し
- パラメータと引数
- `return` 文による戻り値

**演習課題:**
- 2つの数値の合計を計算する関数
  - 関数 `add(a, b)` を実装
  - 2つの数値 `a` と `b` を引数として受け取る
  - 2つの数値の合計を `return` 文で返す
  - 初期コード：関数名と引数の定義（`def add(a, b):`）は記載済み
  - ユーザーは関数の本体（計算と return 文）を実装
  - テスト：様々な数値の組み合わせで正しい合計が返るかをチェック
    - 例：`add(3, 5)` → `8`
    - 例：`add(10, 20)` → `30`
    - 例：`add(-5, 3)` → `-2`（負の数）
    - 例：`add(1.5, 2.5)` → `4.0`（小数）

模範解答コード

```python
def add(a, b):
    return a + b

# テスト例
print(add(3, 5))      # 8
print(add(10, 20))    # 30
print(add(-5, 3))     # -2
print(add(1.5, 2.5))  # 4.0
```

---

#### 📝 レッスン17: 関数の応用 (05_02_function_advanced)
**ステータス:** 未実装
**学習内容:**
- デフォルト引数
- キーワード引数
- 複数の戻り値
- 変数のスコープ（グローバル/ローカル）
- 関数のドキュメント文字列

**演習課題:**
- 四則演算を行う計算機関数
  - 関数 `calculate(a, b, operation="add")` を実装
  - `a`, `b`：計算対象の2つの数値
  - `operation`：演算の種類（デフォルト値は `"add"`）
    - `"add"`：加算（a + b）
    - `"subtract"`：減算（a - b）
    - `"multiply"`：乗算（a × b）
    - `"divide"`：除算（a ÷ b）
  - 指定された演算の結果を返す
  - 除算で b が 0 の場合は `None` を返す
  - 初期コード：関数のシグネチャ（定義の最初の行）は記載済み
  - ユーザーは条件分岐と計算ロジックを実装
  - テスト：様々な演算と数値で正しい結果が返るかをチェック
    - 例：`calculate(10, 5)` → `15`（デフォルトで加算）
    - 例：`calculate(10, 5, "subtract")` → `5`
    - 例：`calculate(10, 5, "multiply")` → `50`
    - 例：`calculate(10, 5, "divide")` → `2.0`
    - 例：`calculate(10, 0, "divide")` → `None`（0除算）

模範解答コード

```python
def calculate(a, b, operation="add"):
    if operation == "add":
        return a + b
    elif operation == "subtract":
        return a - b
    elif operation == "multiply":
        return a * b
    elif operation == "divide":
        if b == 0:
            return None
        return a / b

# テスト例
print(calculate(10, 5))                  # 15
print(calculate(10, 5, "subtract"))      # 5
print(calculate(10, 5, "multiply"))      # 50
print(calculate(10, 5, "divide"))        # 2.0
print(calculate(10, 0, "divide"))        # None
```

---

### 第6章：実践プロジェクト

#### 📝 レッスン18: テキストベースゲーム (06_01_text_game)
**ステータス:** 未実装
**学習内容:**
- これまでの知識を総合的に活用
- ゲームロジックの設計
- ユーザーインターフェースの工夫

**演習課題:**
- 数当てゲーム（改良版）の完成
  - 1〜100のランダムな数字を当てるゲーム
  - 機能要件：
    1. ランダムな正解を生成（用意済み）
    2. ユーザーの入力を受け付ける（用意済み）
    3. 値を比較してヒントを返す（ユーザー実装）
    4. 試行回数をカウント（ユーザー実装）
    5. 正解時に結果を表示（ユーザー実装）
  - 初期コード：メインループ、入力処理、乱数生成部分は用意済み
  - ユーザーは判定ロジックとカウンター、結果表示を実装
  - テスト：様々なシナリオで正しく動作するかをチェック

模範解答コード

```python
import random

def play_game():
    secret = random.randint(1, 100)
    attempts = 0
    
    while True:
        guess = int(input("予想を入力してください (1-100): "))
        attempts += 1
        
        if guess < secret:
            print("もっと大きいです")
        elif guess > secret:
            print("もっと小さいです")
        else:
            print(f"正解！ {attempts}回で当てました")
            break

# ゲームを実行
play_game()
```

---

#### 📝 レッスン19: データ集計プログラム (06_02_data_analysis)
**ステータス:** 未実装
**学習内容:**
- リストと辞書を使ったデータ管理
- データの集計と分析
- 簡単な統計処理

**演習課題:**
- クラスの成績管理システム
  - 複数の生徒の点数データを分析する関数を実装
  - データ形式：生徒名をキー、点数リストを値とする辞書
  - 実装する機能：
    1. `calculate_average(scores)`：各生徒の平均点を計算
    2. `find_top_student(averages)`：最高平均点の生徒を找す
    3. `count_passing(averages, passing_score=60)`：合格者数をカウント
  - 初期コード：データ構造とメイン処理の枠組みは用意済み
  - ユーザーは上記3つの関数を実装
  - テスト：サンプルデータで正しく分析できるかをチェック

模範解答コード

```python
def calculate_average(scores):
    """各生徒の平均点を計算"""
    averages = {}
    for name, score_list in scores.items():
        averages[name] = sum(score_list) / len(score_list)
    return averages

def find_top_student(averages):
    """最高平均点の生徒を見つける"""
    top_student = None
    max_avg = -1
    for name, avg in averages.items():
        if avg > max_avg:
            max_avg = avg
            top_student = name
    return top_student

def count_passing(averages, passing_score=60):
    """合格者数をカウント"""
    count = 0
    for avg in averages.values():
        if avg >= passing_score:
            count += 1
    return count

# テスト例
scores = {
    "Alice": [85, 90, 88],
    "Bob": [70, 75, 72],
    "Charlie": [55, 60, 58]
}
averages = calculate_average(scores)
print("平均点:", averages)
print("トップ:", find_top_student(averages))
print("合格者数:", count_passing(averages))
```

---

#### 📝 レッスン20: ファイル操作の基礎 (06_03_file)
**ステータス:** 未実装
**学習内容:**
- ファイルの読み込み（`open()`, `read()`）
- ファイルへの書き込み（`write()`）
- `with` 文の使い方
- テキストファイルの処理
- CSVファイルの基礎

**演習課題:**
- メモ保存プログラム
  - 関数 `save_memo(filename, content)` と `load_memo(filename)` を実装
  - `save_memo`：テキストをファイルに保存
    - `filename`：保存先ファイル名
    - `content`：保存する文字列
    - `with` 文と `open()` を使ってファイルに書き込む
  - `load_memo`：ファイルからテキストを読み込む
    - `filename`：読み込むファイル名
    - ファイルの内容を文字列として返す
    - ファイルが存在しない場合は `None` を返す
  - 初期コード：関数の定義とテスト用のメインプログラムは用意済み
  - ユーザーはファイル操作のロジックを実装
  - テスト：保存と読み込みが正しく動作するかをチェック

模範解答コード

```python
def save_memo(filename, content):
    """テキストをファイルに保存"""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

def load_memo(filename):
    """ファイルからテキストを読み込む"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return None

# テスト例
save_memo("test.txt", "これはテストメモです")
content = load_memo("test.txt")
print(content)  # "これはテストメモです"

missing = load_memo("notfound.txt")
print(missing)  # None
```

---

#### 📝 レッスン21: 最終プロジェクト (06_04_final_project)
**ステータス:** 未実装
**学習内容:**
- 学習した内容の総復習
- 自分でプログラムを設計する
- デバッグとテスト

**演習課題:**
- タスク管理アプリの作成
  - TODOリストを管理するプログラムを完成させる
  - 必須機能：
    1. タスクの追加：`add_task(tasks, task_name)`
    2. タスクの完了マーク：`complete_task(tasks, task_id)`
    3. タスク一覧の表示：`show_tasks(tasks)`
    4. タスクのファイル保存：`save_tasks(tasks, filename)`
    5. タスクのファイル読み込み：`load_tasks(filename)`
  - タスクのデータ構造：辞書のリスト `[{"id": 1, "name": "タスク名", "completed": False}, ...]`
  - 初期コード：メインメニューと入力処理の枠組みは用意済み
  - ユーザーは上記5つの機能を実装
  - テスト：各機能が正しく動作するかを個別にチェック
  - オプション機能：タスクの削除、期限の追加など

模範解答コード

```python
import json

def add_task(tasks, task_name):
    """タスクを追加"""
    new_id = max([t["id"] for t in tasks], default=0) + 1
    tasks.append({"id": new_id, "name": task_name, "completed": False})
    return tasks

def complete_task(tasks, task_id):
    """タスクを完了にする"""
    for task in tasks:
        if task["id"] == task_id:
            task["completed"] = True
    return tasks

def show_tasks(tasks):
    """タスク一覧を表示"""
    for task in tasks:
        status = "✓" if task["completed"] else " "
        print(f"[{status}] {task['id']}: {task['name']}")

def save_tasks(tasks, filename):
    """タスクをファイルに保存"""
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(tasks, f, ensure_ascii=False, indent=2)

def load_tasks(filename):
    """タスクをファイルから読み込む"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

# テスト例
tasks = []
tasks = add_task(tasks, "Pythonの勉強")
tasks = add_task(tasks, "買い物")
show_tasks(tasks)
complete_task(tasks, 1)
show_tasks(tasks)
save_tasks(tasks, "tasks.json")
```

---

## 📊 学習の進め方

### 推奨学習順序
1. 第1章（レッスン1-5）：プログラミングの基本とデバッグを習得
2. 第2章（レッスン6-8）：条件分岐をマスター
3. 第3章（レッスン9-11）：繰り返し処理を学ぶ
4. 第4章（レッスン12-15）：データ構造を理解
5. 第5章（レッスン16-17）：関数で再利用可能なコードを書く
6. 第6章（レッスン18-21）：実践的なプログラムを作成

### 各レッスンの標準的な学習時間
- 説明学習：15-20分
- 演習課題：20-30分
- 合計：約40-50分

### 習得目標
このカリキュラムを完了することで、以下ができるようになります：
- ✅ 基本的なPythonプログラムを自分で書ける
- ✅ 条件分岐と繰り返しを使った複雑なロジックを実装できる
- ✅ データ構造（リスト・辞書）を効果的に使える
- ✅ 関数を使ってコードを整理できる
- ✅ 実用的な小規模プログラムを作成できる
- ✅ エラーを読み取って自分でデバッグできる

## 🎯 次のステップ

このカリキュラム完了後、以下の学習に進むことができます：
- オブジェクト指向プログラミング（クラスとオブジェクト）
- 外部ライブラリの活用（Pygame, Matplotlibなど）
- Webスクレイピング
- データ分析とグラフ作成
- GUIアプリケーション開発

## 📝 実装優先度

### フェーズ1（基礎固め） - 優先度：高
- [x] レッスン2: 変数と計算
- [x] レッスン3: データ型と変換
- [x] レッスン4: ユーザー入力
- [x] レッスン5: デバッグの基礎
- [x] レッスン6: 条件分岐の基礎
- [x] レッスン7: else と elif

### フェーズ2（制御構造） - 優先度：中
- [ ] レッスン8: 論理演算子
- [ ] レッスン9: for ループの基礎
- [ ] レッスン10: for ループの応用
- [ ] レッスン11: while ループ

### フェーズ3（データ構造） - 優先度：中
- [ ] レッスン12: リストの基礎
- [ ] レッスン13: リストの操作
- [ ] レッスン14: for ループとリスト
- [ ] レッスン15: 辞書の基礎

### フェーズ4（関数と実践） - 優先度：低
- [ ] レッスン16: 関数の基礎
- [ ] レッスン17: 関数の応用
- [ ] レッスン18: テキストベースゲーム
- [ ] レッスン19: データ集計プログラム
- [ ] レッスン20: ファイル操作の基礎
- [ ] レッスン21: 最終プロジェクト
