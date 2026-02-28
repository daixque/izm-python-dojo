// Monaco Editorの設定
let editor = null;
let currentLesson = null;

// Monaco Editorの初期化
function initEditor() {
    require.config({ 
        paths: { 
            vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' 
        } 
    });
    
    require(['vs/editor/editor.main'], function() {
        editor = monaco.editor.create(document.getElementById('editor'), {
            value: '# コードをここに入力してください\nprint("Hello, World!")',
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
        });
        
        // Ctrl+Enter / Cmd+Enterで実行
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
            document.getElementById('btn-run').click();
        });
        
        console.log('Monaco Editor initialized');
        
        // レッスンをロード
        loadLesson('lessons/lesson01.json');
    });
}

// エディタの内容を取得
window.getEditorContent = function() {
    return editor ? editor.getValue() : '';
};

// エディタの内容を設定
function setEditorContent(code) {
    if (editor) {
        editor.setValue(code);
    }
}

// リセットボタン
document.getElementById('btn-reset').addEventListener('click', () => {
    if (currentLesson && currentLesson.initialCode) {
        setEditorContent(currentLesson.initialCode);
        clearConsole();
        appendToConsole('✓ コードをリセットしました', 'info');
    }
});

// レッスンをロード
async function loadLesson(lessonPath) {
    try {
        const response = await fetch(lessonPath);
        const lesson = await response.json();
        currentLesson = lesson;
        
        // レッスンタイトル
        document.getElementById('lesson-title').textContent = lesson.title;
        
        // レッスン説明
        const descriptionHTML = lesson.description
            .map(paragraph => `<p>${paragraph}</p>`)
            .join('');
        document.getElementById('lesson-description').innerHTML = `
            <h3>📚 このレッスンについて</h3>
            ${descriptionHTML}
        `;
        
        // タスク
        document.getElementById('lesson-task').innerHTML = `
            <h4>✏️ やってみよう</h4>
            <p>${lesson.task}</p>
        `;
        
        // 初期コード
        if (lesson.initialCode) {
            setEditorContent(lesson.initialCode);
        }
        
        console.log('Lesson loaded:', lesson.title);
    } catch (error) {
        console.error('Failed to load lesson:', error);
        document.getElementById('lesson-title').textContent = 'レッスンの読み込みに失敗しました';
        document.getElementById('lesson-description').innerHTML = `<p>エラー: ${error.message}</p>`;
    }
}

// Monaco Editorの初期化を開始
window.addEventListener('DOMContentLoaded', () => {
    initEditor();
});
