"""
全レッスンの模範解答が、ブラウザ内テストをすべてパスすることを確認するテスト。

各レッスンについて:
1. exercise.ja.html を開く
2. Pyodide の初期化完了を待つ
3. SOLUTION_CODE をエディタに注入する
4. テストボタンをクリックして結果を検証する
"""

import pytest

from helpers import (
    click_test_button,
    compute_timeout,
    format_failures,
    get_failed_tests,
    get_solution_code,
    inject_solution,
    wait_for_ready,
)
from lesson_params import get_lesson_params

_LESSONS = get_lesson_params()


@pytest.mark.parametrize("lesson", _LESSONS, ids=lambda p: p["lesson_id"])
def test_solution_passes_all_tests(page, base_url, lesson):
    """模範解答を実行し、レッスン内の全テストがパスすることを確認する。"""
    lesson_id = lesson["lesson_id"]
    timeout_ms = compute_timeout(lesson)

    # ページを開く（ナビゲーションタイムアウトも伸ばす）
    page.set_default_navigation_timeout(timeout_ms)
    page.goto(f"{base_url}/lessons/{lesson_id}/exercise.ja.html")

    # Pyodide 初期化完了まで待機
    wait_for_ready(page, timeout_ms)

    # 模範解答を取得してエディタに注入
    solution_code = get_solution_code(page)
    inject_solution(page, solution_code)

    # テスト実行 → 結果オーバーレイ表示まで待機
    click_test_button(page)

    # 失敗テストがないことを確認
    failures = get_failed_tests(page)
    assert not failures, format_failures(lesson_id, failures)
