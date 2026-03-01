// 進捗管理ライブラリ

const STORAGE_KEY = 'pythonLearning_progress';
const FILTER_KEY = 'pythonLearning_filterMode';

// 進捗データの構造
// {
//   completedLessons: ["01_01_hello", "01_02_variables"],
//   lastVisited: "2026-03-01T12:34:56Z",
//   lessonTimestamps: {
//     "01_01_hello": "2026-03-01T10:00:00Z",
//     "01_02_variables": "2026-03-01T12:34:56Z"
//   }
// }

/**
 * 進捗データを読み込む
 */
function loadProgress() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Failed to load progress data:', error);
    }
    
    return {
        completedLessons: [],
        lastVisited: new Date().toISOString(),
        lessonTimestamps: {}
    };
}

/**
 * 進捗データを保存する
 */
function saveProgress(data) {
    try {
        data.lastVisited = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save progress data:', error);
    }
}

/**
 * レッスンを完了としてマークする
 */
function markLessonCompleted(lessonId) {
    const data = loadProgress();
    
    if (!data.completedLessons.includes(lessonId)) {
        data.completedLessons.push(lessonId);
        data.lessonTimestamps[lessonId] = new Date().toISOString();
        saveProgress(data);
    }
}

/**
 * レッスンを未完了としてマークする
 */
function markLessonIncomplete(lessonId) {
    const data = loadProgress();
    
    const index = data.completedLessons.indexOf(lessonId);
    if (index > -1) {
        data.completedLessons.splice(index, 1);
        delete data.lessonTimestamps[lessonId];
        saveProgress(data);
    }
}

/**
 * レッスンの完了/未完了を切り替える
 */
function toggleLessonCompletion(lessonId) {
    if (isLessonCompleted(lessonId)) {
        markLessonIncomplete(lessonId);
        return false;
    } else {
        markLessonCompleted(lessonId);
        return true;
    }
}

/**
 * レッスンが完了済みかチェックする
 */
function isLessonCompleted(lessonId) {
    const data = loadProgress();
    return data.completedLessons.includes(lessonId);
}

/**
 * 完了済みレッスンIDの配列を取得する
 */
function getCompletedLessons() {
    const data = loadProgress();
    return data.completedLessons;
}

/**
 * レッスンの完了日時を取得する
 */
function getLessonCompletionDate(lessonId) {
    const data = loadProgress();
    return data.lessonTimestamps[lessonId] || null;
}

/**
 * 全体の進捗を取得する
 * @param {number} totalLessons - 総レッスン数
 * @returns {Object} { completed: number, total: number, percentage: number }
 */
function getProgress(totalLessons) {
    const data = loadProgress();
    const completed = data.completedLessons.length;
    const percentage = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
    
    return {
        completed: completed,
        total: totalLessons,
        percentage: percentage
    };
}

/**
 * 章ごとの進捗を取得する
 * @param {string} chapterId - 章のID
 * @param {Array} chapterLessons - 章内のレッスン配列
 * @returns {Object} { completed: number, total: number, percentage: number }
 */
function getChapterProgress(chapterId, chapterLessons) {
    const data = loadProgress();
    const total = chapterLessons.length;
    const completed = chapterLessons.filter(lesson => 
        data.completedLessons.includes(lesson.id)
    ).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return {
        completed: completed,
        total: total,
        percentage: percentage
    };
}

/**
 * 全進捗データをリセットする
 */
function clearAllProgress() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Failed to clear progress data:', error);
        return false;
    }
}

/**
 * フィルターモードを取得する
 * @returns {string} "all" | "incomplete" | "completed"
 */
function getFilterMode() {
    try {
        const mode = localStorage.getItem(FILTER_KEY);
        if (mode && ['all', 'incomplete', 'completed'].includes(mode)) {
            return mode;
        }
    } catch (error) {
        console.error('Failed to load filter mode:', error);
    }
    return 'all';
}

/**
 * フィルターモードを設定する
 * @param {string} mode - "all" | "incomplete" | "completed"
 */
function setFilterMode(mode) {
    try {
        if (['all', 'incomplete', 'completed'].includes(mode)) {
            localStorage.setItem(FILTER_KEY, mode);
        }
    } catch (error) {
        console.error('Failed to save filter mode:', error);
    }
}

// グローバルに公開
window.progress = {
    markLessonCompleted: markLessonCompleted,
    markLessonIncomplete: markLessonIncomplete,
    toggleLessonCompletion: toggleLessonCompletion,
    isLessonCompleted: isLessonCompleted,
    getCompletedLessons: getCompletedLessons,
    getLessonCompletionDate: getLessonCompletionDate,
    getProgress: getProgress,
    getChapterProgress: getChapterProgress,
    clearAllProgress: clearAllProgress,
    getFilterMode: getFilterMode,
    setFilterMode: setFilterMode
};
