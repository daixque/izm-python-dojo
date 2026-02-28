// ファイルエクスプローラー（ファイル操作レッスン用）
class FileExplorer {
    constructor() {
        this.container = null;
        this.fileListElement = null;
        this.fileContentElement = null;
        this.currentFile = null;
        this.isCollapsed = true; // デフォルトで閉じた状態
        this.initialFiles = [];
    }
    
    // 初期化
    init(options = {}) {
        this.container = document.getElementById('file-explorer');
        if (!this.container) return;
        
        this.fileListElement = document.getElementById('file-list');
        this.fileContentElement = document.getElementById('file-content');
        
        // 初期ファイルを設定
        if (options.initialFiles) {
            this.initialFiles = options.initialFiles;
        }
        
        // デフォルトで閉じた状態にする
        this.container.classList.add('collapsed');
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.classList.add('explorer-collapsed');
        }
        
        // ヘッダークリックで折りたたみ/展開
        const header = this.container.querySelector('.file-explorer-header');
        if (header) {
            header.addEventListener('click', () => this.toggleCollapse());
        }
    }
    
    // 初期ファイルをロード（Pyodide初期化後に呼ぶ）
    async loadInitialFiles() {
        if (!window.pyodideRunner.isReady() || this.initialFiles.length === 0) return;
        
        for (const file of this.initialFiles) {
            try {
                const path = `/home/pyodide/${file.name}`;
                window.pyodideRunner.getPyodide().FS.writeFile(path, file.content);
                console.log(`Loaded initial file: ${file.name}`);
            } catch (error) {
                console.error(`Failed to load initial file ${file.name}:`, error);
            }
        }
        
        // 初期ファイルがある場合は自動的に表示
        if (this.initialFiles.length > 0) {
            this.refresh();
        }
    }
    
    // ファイル一覧を更新
    refresh() {
        if (!this.container || !window.pyodideRunner.isReady()) return;
        
        const files = window.pyodideRunner.fs.listFiles();
        
        // ファイルがあれば一覧を表示
        if (files.length > 0) {
            this.renderFileList(files);
            
            // 現在選択中のファイルがあれば内容を再読み込み
            if (this.currentFile && files.includes(this.currentFile)) {
                this.displayFileContent(this.currentFile);
            } else if (this.currentFile && !files.includes(this.currentFile)) {
                // 選択中のファイルが削除された場合
                this.currentFile = null;
                if (this.fileContentElement) {
                    this.fileContentElement.innerHTML = '<div class="file-empty-state">ファイルを選択してください</div>';
                }
            }
        } else {
            // ファイルがない場合は空の状態を表示
            this.currentFile = null;
            if (this.fileListElement) {
                this.fileListElement.innerHTML = '<div class="file-empty-state">ファイルがありません</div>';
            }
            if (this.fileContentElement) {
                this.fileContentElement.innerHTML = '';
            }
        }
    }
    
    // ファイル一覧を描画
    renderFileList(files) {
        if (!this.fileListElement) return;
        
        this.fileListElement.innerHTML = '';
        
        files.forEach(filename => {
            const item = document.createElement('div');
            item.className = 'file-list-item';
            item.dataset.filename = filename;
            if (filename === this.currentFile) {
                item.classList.add('active');
            }
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'file-name';
            nameSpan.textContent = filename;
            nameSpan.title = filename;
            
            const actions = document.createElement('div');
            actions.className = 'file-actions';
            
            // ダウンロードボタン
            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'file-action-btn';
            downloadBtn.textContent = '⬇';
            downloadBtn.title = 'ダウンロード';
            downloadBtn.onclick = (e) => {
                e.stopPropagation();
                this.downloadFile(filename);
            };
            
            // 削除ボタン
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'file-action-btn';
            deleteBtn.textContent = '🗑';
            deleteBtn.title = '削除';
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                this.deleteFile(filename);
            };
            
            actions.appendChild(downloadBtn);
            actions.appendChild(deleteBtn);
            
            item.appendChild(nameSpan);
            item.appendChild(actions);
            
            item.addEventListener('click', () => this.selectFile(filename));
            
            this.fileListElement.appendChild(item);
        });
        
        // 最初のファイルを自動選択
        if (files.length > 0 && !this.currentFile) {
            this.selectFile(files[0]);
        }
    }
    
    // ファイルを選択
    selectFile(filename) {
        this.currentFile = filename;
        this.displayFileContent(filename);
        
        // アクティブ状態を更新
        const items = this.fileListElement.querySelectorAll('.file-list-item');
        items.forEach(item => {
            if (item.dataset.filename === filename) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // ファイル内容を表示
    displayFileContent(filename) {
        if (!this.fileContentElement) return;
        
        const content = window.pyodideRunner.fs.readFile(filename);
        if (content === null) {
            this.fileContentElement.innerHTML = '<div class="file-empty-state">ファイルを読み込めませんでした</div>';
            return;
        }
        
        const pre = document.createElement('pre');
        pre.textContent = content;
        this.fileContentElement.innerHTML = '';
        this.fileContentElement.appendChild(pre);
    }
    
    // ファイルをダウンロード
    downloadFile(filename) {
        window.pyodideRunner.fs.downloadFile(filename);
    }
    
    // ファイルを削除
    deleteFile(filename) {
        if (!confirm(`${filename} を削除しますか？`)) return;
        
        if (window.pyodideRunner.fs.deleteFile(filename)) {
            if (this.currentFile === filename) {
                this.currentFile = null;
                this.fileContentElement.innerHTML = '';
            }
            this.refresh();
        }
    }
    
    // 折りたたみ/展開
    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
        if (this.container) {
            this.container.classList.toggle('collapsed', this.isCollapsed);
        }
        
        // main-contentのクラスも切り替え
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.classList.toggle('explorer-collapsed', this.isCollapsed);
        }
        
        const toggle = this.container.querySelector('.file-explorer-toggle');
        if (toggle) {
            toggle.textContent = this.isCollapsed ? '▶' : '◀';
        }
    }
}

// グローバルに公開
window.fileExplorer = new FileExplorer();
