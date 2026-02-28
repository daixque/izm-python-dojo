// Pyodide実行エンジン
let pyodide = null;
let isReady = false;

// Pyodideの初期化
async function initPyodide() {
    try {
        updateStatus('Pythonを読み込み中...', false);
        
        // Pyodideのロード
        pyodide = await loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/'
        });
        
        // 標準出力・標準エラーのリダイレクト
        pyodide.setStdout({ batched: (msg) => appendToConsole(msg, 'output') });
        pyodide.setStderr({ batched: (msg) => appendToConsole(msg, 'error') });
        
        isReady = true;
        updateStatus('準備完了 ✓', true);
        
        // 実行ボタンを有効化
        document.getElementById('btn-run').disabled = false;
        
        console.log('Pyodide initialized successfully');
    } catch (error) {
        updateStatus('エラー: Python読み込み失敗', false);
        appendToConsole(`初期化エラー: ${error.message}`, 'error');
        console.error('Pyodide initialization failed:', error);
    }
}

// ステータス更新
function updateStatus(message, ready) {
    const statusElement = document.getElementById('status');
    statusElement.textContent = message;
    
    if (ready) {
        statusElement.classList.add('ready');
    } else {
        statusElement.classList.remove('ready');
    }
}

// Pythonコードの実行
async function runPythonCode(code) {
    if (!isReady) {
        appendToConsole('エラー: Pythonがまだ準備できていません', 'error');
        return;
    }
    
    try {
        // コンソールをクリアして実行開始を表示
        appendToConsole('>>> プログラムを実行中...', 'info');
        
        // Pythonコードを実行
        const result = await pyodide.runPythonAsync(code);
        
        // 結果がある場合は表示（print以外の最後の式の戻り値）
        if (result !== undefined && result !== null) {
            appendToConsole(`戻り値: ${result}`, 'output');
        }
        
        appendToConsole('>>> 実行完了', 'info');
    } catch (error) {
        // Pythonエラーを表示
        appendToConsole(`エラー: ${error.message}`, 'error');
    }
}

// コンソールに出力
function appendToConsole(message, type = 'output') {
    const consoleElement = document.getElementById('console');
    const line = document.createElement('div');
    line.className = `console-${type}`;
    line.textContent = message;
    consoleElement.appendChild(line);
    
    // 自動スクロール
    consoleElement.scrollTop = consoleElement.scrollHeight;
}

// コンソールをクリア
function clearConsole() {
    const consoleElement = document.getElementById('console');
    consoleElement.innerHTML = '';
}

// ボタンイベントの設定
function setupButtons() {
    // 実行ボタン
    document.getElementById('btn-run').addEventListener('click', async () => {
        const code = window.getEditorContent ? window.getEditorContent() : '';
        if (code.trim()) {
            await runPythonCode(code);
        } else {
            appendToConsole('⚠ コードを入力してください', 'info');
        }
    });
    
    // クリアボタン
    document.getElementById('btn-clear').addEventListener('click', clearConsole);
}

// 初期化
window.addEventListener('DOMContentLoaded', () => {
    setupButtons();
    initPyodide();
});
