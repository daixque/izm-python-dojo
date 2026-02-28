// テスト機能（自動評価）
let currentTests = [];

// テストを設定
function setTests(tests) {
    currentTests = tests || [];
}

// すべてのテストを実行
async function runAllTests(userCode) {
    if (!window.pyodideRunner.isReady()) {
        return {
            success: false,
            message: window.i18n ? window.i18n.t('msg_pyodideNotReady') : 'Python is not ready yet'
        };
    }
    
    if (currentTests.length === 0) {
        return {
            success: false,
            message: window.i18n ? window.i18n.t('msg_noTestsConfigured') : 'No tests configured'
        };
    }
    
    const results = [];
    let allPassed = true;
    
    for (let i = 0; i < currentTests.length; i++) {
        const test = currentTests[i];
        const result = await runSingleTest(userCode, test, i + 1);
        results.push(result);
        
        if (!result.passed) {
            allPassed = false;
        }
    }
    
    return {
        success: true,
        allPassed: allPassed,
        results: results
    };
}

// 単一のテストを実行
async function runSingleTest(userCode, test, testNumber) {
    try {
        const pyodide = window.pyodideRunner.getPyodide();
        
        // ユーザーコードをPython環境に注入
        pyodide.globals.set('user_code', userCode);
        
        // テストコードを実行
        const result = await pyodide.runPythonAsync(test.code);
        
        // 結果を取得（Pythonの辞書をJSオブジェクトに変換）
        const jsResult = result.toJs();
        const resultObj = Object.fromEntries(jsResult);
        
        return {
            testNumber: testNumber,
            name: test.name || `${window.i18n ? window.i18n.t('test_label') : 'Test'} ${testNumber}`,
            description: test.description || '',
            passed: resultObj.passed,
            message: resultObj.message || ''
        };
    } catch (error) {
        return {
            testNumber: testNumber,
            name: test.name || `${window.i18n ? window.i18n.t('test_label') : 'Test'} ${testNumber}`,
            description: test.description || '',
            passed: false,
            message: `${window.i18n ? window.i18n.t('msg_testExecutionError') : 'Test execution error'}: ${error.message}`
        };
    }
}

// テスト結果を表示
function displayTestResults(testResult) {
    const resultContainer = document.getElementById('test-results');
    if (!resultContainer) return;
    
    resultContainer.innerHTML = '';
    
    if (!testResult.success) {
        const errorLabel = window.i18n ? window.i18n.t('test_error') : 'Error';
        resultContainer.innerHTML = `
            <div class="test-error">
                <strong>${errorLabel}:</strong> ${testResult.message}
            </div>
        `;
        return;
    }
    
    // 全体の結果
    const summaryClass = testResult.allPassed ? 'test-summary-success' : 'test-summary-failure';
    const summaryIcon = testResult.allPassed ? '✓' : '✗';
    const passedCount = testResult.results.filter(r => r.passed).length;
    const totalCount = testResult.results.length;
    const allPassedMsg = window.i18n ? window.i18n.t('test_allPassed') : 'All tests passed!';
    const someFailedMsg = window.i18n ? window.i18n.t('test_someFailed') : 'Some tests failed';
    const summaryText = testResult.allPassed 
        ? `${allPassedMsg} (${totalCount}/${totalCount})` 
        : `${someFailedMsg} (${passedCount}/${totalCount})`;
    
    const summaryHTML = `
        <div class="${summaryClass}">
            <strong>${summaryIcon} ${summaryText}</strong>
        </div>
    `;
    
    // 各テストの結果
    const resultsHTML = testResult.results.map(result => {
        const statusClass = result.passed ? 'test-passed' : 'test-failed';
        const icon = result.passed ? '✓' : '✗';
        
        return `
            <div class="test-item ${statusClass}">
                <div class="test-header">
                    <span class="test-icon">${icon}</span>
                    <span class="test-name">${result.name}</span>
                </div>
                ${result.description ? `<div class="test-description">${result.description}</div>` : ''}
                <div class="test-message">${result.message}</div>
            </div>
        `;
    }).join('');
    
    resultContainer.innerHTML = summaryHTML + resultsHTML;
}

// グローバルに公開
window.tester = {
    setTests: setTests,
    runAll: runAllTests,
    displayResults: displayTestResults
};
