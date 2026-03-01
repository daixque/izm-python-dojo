// Monaco Editor（共通ライブラリ）
let editor = null;
let autoSaveTimer = null;
let currentLessonId = null;

// localStorageキーのプレフィックス
const CODE_STORAGE_PREFIX = 'pythonLearning_code_';

// コードをlocalStorageに保存
function saveCode(lessonId, code) {
    try {
        const key = CODE_STORAGE_PREFIX + lessonId;
        localStorage.setItem(key, code);
        console.log(`Code saved for lesson: ${lessonId}`);
    } catch (e) {
        console.warn('Failed to save code to localStorage:', e);
    }
}

// コードをlocalStorageから読み込み
function loadCode(lessonId) {
    try {
        const key = CODE_STORAGE_PREFIX + lessonId;
        const savedCode = localStorage.getItem(key);
        if (savedCode !== null) {
            console.log(`Code loaded for lesson: ${lessonId}`);
            return savedCode;
        }
    } catch (e) {
        console.warn('Failed to load code from localStorage:', e);
    }
    return null;
}

// 保存されたコードを削除
function clearSavedCode(lessonId) {
    try {
        const key = CODE_STORAGE_PREFIX + lessonId;
        localStorage.removeItem(key);
        console.log(`Saved code cleared for lesson: ${lessonId}`);
    } catch (e) {
        console.warn('Failed to clear saved code:', e);
    }
}

// 自動保存を設定（デバウンス付き）
function setupAutoSave(lessonId) {
    if (!editor || !lessonId) return;
    
    currentLessonId = lessonId;
    
    editor.onDidChangeModelContent(() => {
        // 既存のタイマーをクリア
        if (autoSaveTimer) {
            clearTimeout(autoSaveTimer);
        }
        
        // 1秒後に保存（デバウンス）
        autoSaveTimer = setTimeout(() => {
            const code = editor.getValue();
            saveCode(currentLessonId, code);
        }, 1000);
    });
}

// Monaco Editorの初期化
function initMonacoEditor(options = {}) {
    const defaultOptions = {
        value: '# ここにコードを書いてみよう\n',
        language: 'python',
        theme: 'vs-dark',
        fontSize: 16,
        minimap: { enabled: false },
        automaticLayout: true,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        tabSize: 4,
        insertSpaces: true
    };
    
    const editorOptions = { ...defaultOptions, ...options };
    
    require.config({ 
        paths: { 
            vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' 
        }
    });
    
    return new Promise((resolve) => {
        require(['vs/editor/editor.main'], function() {
            editor = monaco.editor.create(
                document.getElementById('editor'), 
                editorOptions
            );
            
            // Ctrl+Enter / Cmd+Enterで実行
            editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
                const runBtn = document.getElementById('btn-run');
                if (runBtn) runBtn.click();
            });
            
            console.log('Monaco Editor initialized');
            resolve(editor);
        });
    });
}

// エディタの内容を取得
function getEditorContent() {
    return editor ? editor.getValue() : '';
}

// エディタの内容を設定
function setEditorContent(code) {
    if (editor) {
        editor.setValue(code);
    }
}

// グローバルに公開
window.monacoEditor = {
    init: initMonacoEditor,
    getContent: getEditorContent,
    setContent: setEditorContent,
    getEditor: () => editor,
    saveCode: saveCode,
    loadCode: loadCode,
    clearSavedCode: clearSavedCode,
    setupAutoSave: setupAutoSave
};
