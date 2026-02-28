// Monaco Editor（共通ライブラリ）
let editor = null;

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
    getEditor: () => editor
};
