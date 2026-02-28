// Pyodide実行エンジン（共通ライブラリ）
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
        const runBtn = document.getElementById('btn-run');
        if (runBtn) runBtn.disabled = false;
        
        const testBtn = document.getElementById('btn-test');
        if (testBtn) testBtn.disabled = false;
        
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
    if (statusElement) {
        statusElement.textContent = message;
        
        if (ready) {
            statusElement.classList.add('ready');
        } else {
            statusElement.classList.remove('ready');
        }
    }
}

// Pythonコードの実行
async function runPythonCode(code) {
    if (!isReady) {
        appendToConsole('エラー: Pythonがまだ準備できていません', 'error');
        return null;
    }
    
    try {
        // Pythonコードを実行
        const result = await pyodide.runPythonAsync(code);
        return result;
    } catch (error) {
        // Pythonエラーを表示
        appendToConsole(`エラー: ${error.message}`, 'error');
        throw error;
    }
}

// コンソールに出力
function appendToConsole(message, type = 'output') {
    const consoleElement = document.getElementById('console');
    if (!consoleElement) return;
    
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
    if (consoleElement) {
        consoleElement.innerHTML = '';
    }
}

// ファイルシステム操作
const fileSystem = {
    // ファイル一覧を取得（カレントディレクトリ）
    listFiles: function() {
        if (!isReady || !pyodide) return [];
        
        try {
            const files = pyodide.FS.readdir('/home/pyodide');
            // '.' と '..' を除外
            return files.filter(f => f !== '.' && f !== '..');
        } catch (error) {
            console.error('Failed to list files:', error);
            return [];
        }
    },
    
    // ファイル内容を読み取り
    readFile: function(filename) {
        if (!isReady || !pyodide) return null;
        
        try {
            const path = `/home/pyodide/${filename}`;
            const data = pyodide.FS.readFile(path, { encoding: 'utf8' });
            return data;
        } catch (error) {
            console.error(`Failed to read file ${filename}:`, error);
            return null;
        }
    },
    
    // ファイルが存在するかチェック
    fileExists: function(filename) {
        if (!isReady || !pyodide) return false;
        
        try {
            const path = `/home/pyodide/${filename}`;
            pyodide.FS.stat(path);
            return true;
        } catch (error) {
            return false;
        }
    },
    
    // ファイルを削除
    deleteFile: function(filename) {
        if (!isReady || !pyodide) return false;
        
        try {
            const path = `/home/pyodide/${filename}`;
            pyodide.FS.unlink(path);
            return true;
        } catch (error) {
            console.error(`Failed to delete file ${filename}:`, error);
            return false;
        }
    },
    
    // ファイルをダウンロード
    downloadFile: function(filename) {
        const content = this.readFile(filename);
        if (!content) return;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
};

// グローバルに公開
window.pyodideRunner = {
    init: initPyodide,
    run: runPythonCode,
    isReady: () => isReady,
    getPyodide: () => pyodide,
    fs: fileSystem
};
