// 演習ページ共通機能

// 初期コードを保存（リセット用）
let savedInitialCode = '';

/**
 * タスクパネルの折りたたみ機能を設定
 */
function setupTaskPanel() {
    const taskPanel = document.querySelector('.task-panel');
    const taskHeader = document.querySelector('.task-header');
    const taskToggle = document.querySelector('.task-toggle');
    const mainContent = document.querySelector('.main-content');
    
    if (!taskPanel || !taskHeader || !mainContent) return;
    
    taskHeader.addEventListener('click', () => {
        const isCollapsed = taskPanel.classList.toggle('collapsed');
        mainContent.classList.toggle('task-collapsed', isCollapsed);
        
        if (taskToggle) {
            taskToggle.textContent = isCollapsed ? '▶' : '◀';
        }
    });
}

/**
 * コンソール出力関数
 */
function appendToConsole(text, type = 'output') {
    const consoleElement = document.getElementById('console');
    if (!consoleElement) return;
    
    const line = document.createElement('div');
    line.className = `console-line console-${type}`;
    line.textContent = text;
    consoleElement.appendChild(line);
    consoleElement.scrollTop = consoleElement.scrollHeight;
}

/**
 * コンソールクリア
 */
function clearConsole() {
    const consoleElement = document.getElementById('console');
    if (consoleElement) {
        consoleElement.innerHTML = '';
    }
}

/**
 * 共通の初期化処理
 */
async function initializeExercise(config = {}) {
    const {
        initialCode = '',
        tests = [],
        initialFiles = []
    } = config;
    
    // 初期コードを保存
    savedInitialCode = initialCode;
    
    // エディタの初期化
    await window.monacoEditor.init({
        value: initialCode
    });
    
    // テストを設定
    if (tests.length > 0) {
        window.tester.setTests(tests);
    }
    
    // タスクパネルの折りたたみ機能
    setupTaskPanel();
    
    // ファイルエクスプローラーの初期化
    window.fileExplorer.init({
        initialFiles: initialFiles
    });
    
    // Pyodideの初期化
    const t = (key, fallback) => window.i18n ? window.i18n.t(key) : fallback;
    const statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.textContent = t('msg_pythonNotReady', 'Python環境を初期化中...');
    }
    
    await window.pyodideRunner.init();
    
    // 初期ファイルをロード
    await window.fileExplorer.loadInitialFiles();
    
    if (statusElement) {
        statusElement.textContent = t('status_ready', '準備完了');
    }
}

/**
 * ボタンイベントの設定
 */
function setupButtons() {
    // i18nメッセージ取得ヘルパー
    const t = (key, fallback) => window.i18n ? window.i18n.t(key) : fallback;
    
    // 実行ボタン
    const btnRun = document.getElementById('btn-run');
    if (btnRun) {
        btnRun.addEventListener('click', async () => {
            const code = window.monacoEditor.getContent();
            if (code.trim()) {
                clearConsole();
                appendToConsole(t('msg_executing', 'コードを実行中...'), 'info');
                try {
                    const result = await window.pyodideRunner.run(code);
                    if (result !== undefined && result !== null) {
                        appendToConsole(`${t('msg_returnValue', '戻り値:')} ${result}`, 'output');
                    }
                    appendToConsole(t('msg_executionComplete', '実行が完了しました'), 'info');
                    
                    // ファイルエクスプローラーを更新
                    window.fileExplorer.refresh();
                } catch (error) {
                    // エラーは runner.js で表示される
                }
            } else {
                appendToConsole(t('msg_enterCode', 'コードを入力してください'), 'info');
            }
        });
    }
    
    // テストボタン
    const btnTest = document.getElementById('btn-test');
    if (btnTest) {
        btnTest.addEventListener('click', async () => {
            const code = window.monacoEditor.getContent();
            if (code.trim()) {
                clearConsole();
                appendToConsole(t('msg_testing', 'テストを実行中...'), 'info');
                
                const testResult = await window.tester.runAll(code);
                window.tester.displayResults(testResult);
                
                // テスト結果を表示
                const overlay = document.getElementById('test-results-overlay');
                if (overlay) {
                    overlay.style.display = 'block';
                }
                
                appendToConsole(t('msg_testComplete', 'テストが完了しました'), 'info');
                
                // ファイルエクスプローラーを更新
                window.fileExplorer.refresh();
            } else {
                appendToConsole(t('msg_enterCode', 'コードを入力してください'), 'info');
            }
        });
    }
    
    // リセットボタン
    const btnReset = document.getElementById('btn-reset');
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            window.monacoEditor.setContent(savedInitialCode);
            clearConsole();
            appendToConsole(t('msg_codeReset', 'コードをリセットしました'), 'info');
        });
    }
    
    // クリアボタン
    const btnClear = document.getElementById('btn-clear');
    if (btnClear) {
        btnClear.addEventListener('click', clearConsole);
    }
    
    // テスト結果オーバーレイの閉じるボタン
    const btnCloseResults = document.getElementById('btn-close-results');
    if (btnCloseResults) {
        btnCloseResults.addEventListener('click', () => {
            const overlay = document.getElementById('test-results-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
        });
    }
}

// コンソール関数をグローバルに公開（runner.jsから使用できるように）
window.appendToConsole = appendToConsole;
window.clearConsole = clearConsole;
