// 多言語対応ライブラリ

// UI要素の翻訳データ
const translations = {
    ja: {
        // ヘッダー
        appTitle: "Python学習環境",
        subtitle: "中学生向けプログラミング入門教材",
        status_loading: "準備中...",
        status_ready: "準備完了 ✓",
        
        // ボタン
        btn_run: "▶ 実行",
        btn_test: "✓ テスト",
        btn_reset: "🔄 リセット",
        btn_clear: "クリア",
        btn_close: "閉じる",
        btn_backToMenu: "← 目次に戻る",
        btn_backToTheory: "📚 理論に戻る",
        btn_startExercise: "演習を始める →",
        btn_nextLesson: "次のレッスン →",
        
        // ラベル
        label_codeEditor: "📝 コードエディタ",
        label_console: "💻 実行結果",
        label_task: "課題",
        label_theory: "📚 理論説明",
        label_exercise: "✏️ 演習課題",
        
        // メッセージ
        msg_loading: "レッスンを読み込んでいます...",
        msg_loadError: "エラー: レッスンデータの読み込みに失敗しました。",
        msg_pythonNotReady: "エラー: Pythonがまだ準備できていません",
        msg_pyodideNotReady: "Pythonがまだ準備できていません",
        msg_noTestsConfigured: "テストが設定されていません",
        msg_testExecutionError: "テスト実行エラー",
        msg_enterCode: "⚠ コードを入力してください",
        msg_executing: ">>> プログラムを実行中...",
        msg_executionComplete: ">>> 実行完了",
        msg_testing: ">>> テストを実行中...",
        msg_testComplete: ">>> テスト完了",
        msg_codeReset: "✓ コードをリセットしました",
        msg_returnValue: "戻り値:",
        
        // テスト結果
        test_results: "テスト結果",
        test_allPassed: "すべてのテストに合格しました！",
        test_someFailed: "一部のテストに失敗しました",
        test_passed: "件合格",
        test_of: "/",
        test_label: "テスト",
        test_error: "エラー",
        
        // セクション
        section_aboutLesson: "📚 このレッスンについて",
        section_task: "✏️ やってみよう",
        section_instructions: "✏️ やること",
        section_hints: "💡 ヒント",
        section_examples: "💡 コード例",
        
        // 言語
        language: "言語",
        lang_ja: "日本語",
        lang_en: "English"
    },
    en: {
        // Header
        appTitle: "Python Learning Environment",
        subtitle: "Programming Introduction for Middle School Students",
        status_loading: "Loading...",
        status_ready: "Ready ✓",
        
        // Buttons
        btn_run: "▶ Run",
        btn_test: "✓ Test",
        btn_reset: "🔄 Reset",
        btn_clear: "Clear",
        btn_close: "Close",
        btn_backToMenu: "← Back to Menu",
        btn_backToTheory: "📚 Back to Theory",
        btn_startExercise: "Start Exercise →",
        btn_nextLesson: "Next Lesson →",
        
        // Labels
        label_codeEditor: "📝 Code Editor",
        label_console: "💻 Output",
        label_task: "Task",
        label_theory: "📚 Theory",
        label_exercise: "✏️ Exercise",
        
        // Messages
        msg_loading: "Loading lesson...",
        msg_loadError: "Error: Failed to load lesson data.",
        msg_pythonNotReady: "Error: Python is not ready yet",
        msg_pyodideNotReady: "Python is not ready yet",
        msg_noTestsConfigured: "No tests configured",
        msg_testExecutionError: "Test execution error",
        msg_enterCode: "⚠ Please enter code",
        msg_executing: ">>> Executing program...",
        msg_executionComplete: ">>> Execution complete",
        msg_testing: ">>> Running tests...",
        msg_testComplete: ">>> Test complete",
        msg_codeReset: "✓ Code has been reset",
        msg_returnValue: "Return value:",
        
        // Test results
        test_results: "Test Results",
        test_allPassed: "All tests passed!",
        test_someFailed: "Some tests failed",
        test_passed: "passed",
        test_of: "/",
        test_label: "Test",
        test_error: "Error",
        
        // Sections
        section_aboutLesson: "📚 About This Lesson",
        section_task: "✏️ Your Task",
        section_instructions: "✏️ Instructions",
        section_hints: "💡 Hints",
        section_examples: "💡 Code Examples",
        
        // Language
        language: "Language",
        lang_ja: "日本語",
        lang_en: "English"
    }
};

// 現在の言語を管理
let currentLang = 'ja';

// 初期化：ファイル名、URLパラメータ、またはローカルストレージから言語を取得
function initLanguage() {
    // 1. URLパラメータをチェック
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    
    if (langParam && translations[langParam]) {
        currentLang = langParam;
        localStorage.setItem('preferredLanguage', langParam);
        return currentLang;
    }
    
    // 2. ファイル名から判定（exercise.ja.html, exercise.en.html など）
    const path = window.location.pathname;
    if (path.includes('.en.')) {
        currentLang = 'en';
        return currentLang;
    } else if (path.includes('.ja.')) {
        currentLang = 'ja';
        return currentLang;
    }
    
    // 3. ローカルストレージから取得
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    }
    
    return currentLang;
}

// 翻訳テキストを取得
function t(key) {
    return translations[currentLang][key] || key;
}

// 現在の言語を取得
function getCurrentLanguage() {
    return currentLang;
}

// 言語を切り替え
function setLanguage(lang, options = {}) {
    const { reload = false } = options;
    
    if (translations[lang]) {
        currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        
        // URLを更新（リロードなし）
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.pushState({}, '', url);
        
        // reloadオプションがtrueの場合のみページをリロード
        if (reload) {
            window.location.reload();
        }
    }
}

// 言語切り替えドロップダウンを作成
function createLanguageSwitcher(containerId, onLanguageChange) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found`);
        return null;
    }
    
    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.innerHTML = `
        <select id="language-select" class="language-select">
            <option value="ja" ${currentLang === 'ja' ? 'selected' : ''}>${t('lang_ja')}</option>
            <option value="en" ${currentLang === 'en' ? 'selected' : ''}>${t('lang_en')}</option>
        </select>
    `;
    
    // イベントリスナー
    switcher.querySelector('#language-select').addEventListener('change', (e) => {
        const newLang = e.target.value;
        if (translations[newLang]) {
            // コールバックがあれば実行、なければページリロード
            if (onLanguageChange && typeof onLanguageChange === 'function') {
                setLanguage(newLang, { reload: false });
                onLanguageChange();
            } else {
                setLanguage(newLang, { reload: true });
            }
        }
    });
    
    container.appendChild(switcher);
    return switcher;
}

// レッスンファイルのパスを取得
function getLessonFilePath() {
    return `lesson.${currentLang}.json`;
}

// レッスンメタデータファイルのパスを取得
function getMetadataFilePath() {
    return `lessons/metadata.${currentLang}.json`;
}

// グローバルに公開
window.i18n = {
    init: initLanguage,
    t: t,
    getCurrentLanguage: getCurrentLanguage,
    setLanguage: setLanguage,
    createLanguageSwitcher: createLanguageSwitcher,
    getLessonFilePath: getLessonFilePath,
    getMetadataFilePath: getMetadataFilePath,
    get currentLang() { return currentLang; }
};
