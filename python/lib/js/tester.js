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
            message: 'Pythonがまだ準備できていません'
        };
    }
    
    if (currentTests.length === 0) {
        return {
            success: false,
            message: 'テストが設定されていません'
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
            name: test.name || `テスト${testNumber}`,
            description: test.description || '',
            passed: resultObj.passed,
            message: resultObj.message || ''
        };
    } catch (error) {
        return {
            testNumber: testNumber,
            name: test.name || `テスト${testNumber}`,
            description: test.description || '',
            passed: false,
            message: `テスト実行エラー: ${error.message}`
        };
    }
}

// テスト結果を表示
function displayTestResults(testResult) {
    const resultContainer = document.getElementById('test-results');
    if (!resultContainer) return;
    
    resultContainer.innerHTML = '';
    
    if (!testResult.success) {
        resultContainer.innerHTML = `
            <div class="test-error">
                <strong>エラー:</strong> ${testResult.message}
            </div>
        `;
        return;
    }
    
    // 全体の結果
    const summaryClass = testResult.allPassed ? 'test-summary-success' : 'test-summary-failure';
    const summaryIcon = testResult.allPassed ? '✓' : '✗';
    const summaryText = testResult.allPassed 
        ? `すべてのテストに合格しました！ (${testResult.results.length}/${testResult.results.length})` 
        : `一部のテストに失敗しました (${testResult.results.filter(r => r.passed).length}/${testResult.results.length})`;
    
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
