// Pyodide実行エンジン（共通ライブラリ）
let pyodide = null;
let isReady = false;
let inputMode = 'interactive'; // 'interactive' or 'test'
let inputQueue = []; // テスト時の入力キュー
let inputIndex = 0; // 現在の入力インデックス

// Pyodideの初期化
async function initPyodide() {
    try {
        updateStatus('Pythonを読み込み中...', false);
        
        // Pyodideのロード
        pyodide = await loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.0/full/'
        });
        
        // 標準出力・標準エラーのリダイレクト
        pyodide.setStdout({ batched: (msg) => {
            if (window.appendToConsole) window.appendToConsole(msg, 'output');
        }});
        pyodide.setStderr({ batched: (msg) => {
            if (window.appendToConsole) window.appendToConsole(msg, 'error');
        }});
        
        // Pythonのinput()関数を上書き
        await pyodide.runPythonAsync(`
import builtins
import js

def custom_input(prompt=''):
    # JavaScriptの関数を呼び出し
    result = js.window.pyodideRunner.getInput(prompt)
    
    if result is None:
        raise KeyboardInterrupt('入力がキャンセルされました')
    
    return result

# 元のinput関数を上書き
builtins.input = custom_input
        `);
        
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
        if (window.appendToConsole) {
            window.appendToConsole(`初期化エラー: ${error.message}`, 'error');
        }
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
        if (window.appendToConsole) {
            window.appendToConsole('エラー: Pythonがまだ準備できていません', 'error');
        }
        return null;
    }
    
    try {
        // Pythonコードを実行
        const result = await pyodide.runPythonAsync(code);
        return result;
    } catch (error) {
        // Pythonエラーを表示
        if (window.appendToConsole) {
            window.appendToConsole(`エラー: ${error.message}`, 'error');
        }
        throw error;
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

// 入力モードの設定
function setInputMode(mode, inputs = []) {
    inputMode = mode;
    inputQueue = inputs;
    inputIndex = 0;
}

// input()関数の実装（Pythonから呼ばれる）
function getInput(promptMessage) {
    if (inputMode === 'test') {
        // テストモード: 事前設定された入力を使用
        if (inputIndex < inputQueue.length) {
            const value = inputQueue[inputIndex];
            inputIndex++;
            if (window.appendToConsole) {
                window.appendToConsole(promptMessage + value, 'input');
            }
            return value;
        } else {
            throw new Error('テスト用の入力データが不足しています');
        }
    } else {
        // インタラクティブモード: promptダイアログを使用
        const value = prompt(promptMessage || '入力してください:');
        if (value === null) {
            return null;
        }
        if (window.appendToConsole) {
            window.appendToConsole(promptMessage + value, 'input');
        }
        return value;
    }
}

// グローバルに公開
window.pyodideRunner = {
    init: initPyodide,
    run: runPythonCode,
    isReady: () => isReady,
    getPyodide: () => pyodide,
    fs: fileSystem,
    setInputMode: setInputMode,
    getInput: getInput
};
