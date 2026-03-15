"""
Playwright ページ操作のユーティリティ関数。
"""


def compute_timeout(lesson: dict) -> int:
    """Pyodide 初期化待機のタイムアウト（ミリ秒）を返す。

    enable_matplotlib > required_packages > 通常 の優先順で判定する。
    """
    if lesson.get("enable_matplotlib"):
        return 90_000
    if lesson.get("required_packages"):
        return 60_000
    return 30_000


def wait_for_ready(page, timeout_ms: int) -> None:
    """#status テキストが「準備完了」を含むまで待機する。

    Pyodide（および追加パッケージ）の初期化完了を示す。
    """
    page.wait_for_function(
        "() => (document.getElementById('status')?.textContent ?? '').includes('準備完了')",
        timeout=timeout_ms,
    )


def inject_solution(page, solution_code: str) -> None:
    """Monaco Editor に solution_code を注入する。"""
    page.evaluate(
        "(code) => window.monacoEditor.setContent(code)",
        solution_code,
    )


def get_solution_code(page) -> str:
    """ページ内の SOLUTION_CODE JS 定数を返す。"""
    return page.evaluate("() => SOLUTION_CODE")


def click_test_button(page) -> None:
    """テストボタンをクリックし、結果オーバーレイが表示されるまで待機する。"""
    page.click("#btn-test")
    page.wait_for_selector(
        "#test-results-overlay",
        state="visible",
        timeout=30_000,
    )


def get_failed_tests(page) -> list[dict]:
    """失敗したテスト項目を [{name, message}, ...] 形式で返す。"""
    failed_elements = page.query_selector_all(".test-item.test-failed")
    results = []
    for el in failed_elements:
        name_el = el.query_selector(".test-name")
        message_el = el.query_selector(".test-message")
        results.append(
            {
                "name": name_el.inner_text() if name_el else "(unknown)",
                "message": message_el.inner_text() if message_el else "",
            }
        )
    return results


def format_failures(lesson_id: str, failures: list[dict]) -> str:
    """失敗テストを人が読みやすい文字列にフォーマットする。"""
    lines = [f"[{lesson_id}] {len(failures)} test(s) failed:"]
    for f in failures:
        lines.append(f"  ✗ {f['name']}")
        if f["message"]:
            lines.append(f"    {f['message']}")
    return "\n".join(lines)
