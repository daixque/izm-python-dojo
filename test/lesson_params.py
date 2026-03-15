"""
lessons_data/ を走査して、テストパラメータを生成するモジュール。
solution_code が存在するレッスンのみを対象とする。
"""

from pathlib import Path

import yaml

LESSONS_DATA_DIR = Path(__file__).parent.parent / "lessons_data"


def get_lesson_params():
    """solution_code を持つ全レッスンのパラメータリストを返す。

    Returns:
        list of dict: [{
            'lesson_id': str,
            'enable_matplotlib': bool,
            'required_packages': list[str],
        }, ...]
    """
    params = []
    for lesson_dir in sorted(LESSONS_DATA_DIR.iterdir()):
        if not lesson_dir.is_dir():
            continue
        code_yaml_path = lesson_dir / "code.ja.yaml"
        if not code_yaml_path.exists():
            continue
        with open(code_yaml_path, "r", encoding="utf-8") as f:
            code_data = yaml.safe_load(f)
        solution_code = code_data.get("solution_code", "")
        if not solution_code or not solution_code.strip():
            continue
        params.append(
            {
                "lesson_id": lesson_dir.name,
                "enable_matplotlib": code_data.get("enable_matplotlib", False),
                "required_packages": code_data.get("required_packages", []),
            }
        )
    return params
