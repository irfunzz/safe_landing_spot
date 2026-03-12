
class LandingFieldScanner {
    constructor(gridSize = 12) {
        this.gridSize = gridSize;
        this.scanners = [];
        this.init();
    }

    init() {
        const scanConfigs = [
            { id: 0 },
            { id: 1 },
            { id: 2 }
        ];

        scanConfigs.forEach(config => {
            this.scanners.push(new FieldScanner(config));
        });

        this.attachEventListeners();
    }

    attachEventListeners() {
        document.querySelectorAll('.demo-item').forEach((item, index) => {
            const scanBtn = item.querySelector('.scan-btn');
            const resetBtn = item.querySelector('.reset-btn');

            scanBtn.addEventListener('click', () => this.handleScan(index));
            resetBtn.addEventListener('click', () => this.handleReset(index));
        });
    }

    handleScan(scanIndex) {
        this.scanners[scanIndex].performScan();
    }

    handleReset(scanIndex) {
        this.scanners[scanIndex].reset();
    }

    setCustomGrid(scanIndex, customGrid) {
        if (this.scanners[scanIndex]) {
            this.scanners[scanIndex].setCustomGridData(customGrid);
        }
    }
}

class FieldScanner {
    constructor(config) {
        this.id = config.id;
        this.gridData = [];
        this.gridSize = 0;
        this.isScanning = false;

        this.gridContainer = document.getElementById(`grid-${this.id}`);
        this.statusText = document.querySelectorAll('.demo-item')[this.id].querySelector('.status-text');

        this.initializeGrid();
    }

    initializeGrid() {
        if (this.id === 0) {
            this.gridData = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];

        } else if (this.id === 1) {
            this.gridData = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];

        } else if (this.id === 2) {
            this.gridData = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];
        }

        this.gridSize = this.gridData.length;
    }

    setCustomGridData(customGrid) {
        if (!Array.isArray(customGrid) || customGrid.length === 0) {
            console.error('Grid harus berupa array 2D yang valid');
            return;
        }

        this.gridSize = customGrid.length;
        this.gridData = customGrid.map(row => [...row]);

        console.log(`Custom grid berhasil di-set untuk scanner ${this.id}`);
        console.log(`Ukuran grid: ${this.gridSize}x${this.gridSize}`);
    }

    performScan() {
        if (this.isScanning) return;

        this.isScanning = true;
        this.updateStatus('Scanning field...');

        this.gridContainer.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
        this.gridContainer.style.gridTemplateRows = `repeat(${this.gridSize}, 1fr)`;

        this.gridContainer.innerHTML = '';

        const totalCells = this.gridSize * this.gridSize;
        let cellsProcessed = 0;

        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');

                cell.dataset.row = row;
                cell.dataset.col = col;

                this.gridContainer.appendChild(cell);

                setTimeout(() => {
                    const safetyValue = this.gridData[row][col];
                    cell.classList.add('scanning');

                    setTimeout(() => {
                        cell.classList.remove('scanning');
                        cell.classList.add(safetyValue === 1 ? 'safe' : 'unsafe');
                        cellsProcessed++;
                        if (cellsProcessed === totalCells) {
                            this.completeScan();
                        }
                    }, 200);
                }, (row * this.gridSize + col) * 15);
            }
        }
        this.gridContainer.classList.add('active');
    }

    completeScan() {
        this.isScanning = false;
        const safeCount = this.gridData.flat().filter(v => v === 1).length;
        const totalCells = this.gridSize * this.gridSize;
        const safetyPercentage = ((safeCount / totalCells) * 100).toFixed(1);
        this.updateStatus(`Scan complete: ${safetyPercentage}% safe zones`);
    }

    reset() {
        if (this.isScanning) return;
        this.gridContainer.innerHTML = '';
        this.gridContainer.classList.remove('active');
        this.initializeGrid();
        this.updateStatus('Ready to scan');
    }

    updateStatus(message) {
        this.statusText.textContent = message;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new LandingFieldScanner();
    window.app = app;
    console.log('Landing Field Scanner initialized!');
});
