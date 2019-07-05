import Tile from './tile.js';
import {random, arrayIsEmpty, foreach2dArray, arrayOr, new2dArray} from './functions.js';

export default class Field {
    constructor(rows = 4, cols = 4) {
        this.cols = cols;
        this.rows = rows;
    }

    init(tiles = []) {
        if (tiles.length !== 0) {
            if (tiles.length !== this.rows) {
                throw new Error(`Tiles're must have ${this.rows} rows`);
            }

            for (let row = 0; row < this.rows; row++) {
                if (tiles[row].length !== this.cols) {
                    throw new Error(`Tiles're must have ${this.cols} cols`);
                }
            }

            this.tiles = tiles;
        } else {
            this.tiles = new2dArray(this.rows);

            for (let row = 0; row < this.rows; row++) {
                for (let col = 0; col < this.cols; col++) {
                    this.tiles[row][col] = null;
                }
            }
        }

        this.previousTiles = new2dArray(this.rows);
    }

    generateNewRandomTile() {
        if (this.isFull()) return false;

        let randInt = random(1, 10),
            value = 2;

        if (randInt === 10) {
            value = 4;
        }

        let tileCreated = false;
        while (!tileCreated) {
            let row = random(0, this.rows - 1),
                col = random(0, this.cols - 1);

            if (this.tiles[row][col] == null) {
                this.tiles[row][col] = new Tile(value);

                tileCreated = true;
            }
        }

        return true;
    }

    moveTiles(key) {
        if ([37, 65, 38, 87, 39, 68, 40, 83].indexOf(key) === -1) return [false, 0];

        foreach2dArray(this.tiles, (row, col) => {
            if (this.tiles[row][col] !== null) {
                this.tiles[row][col].canCombine = true;
            }
        });

        let tilesCopy = new2dArray(this.rows);
        foreach2dArray(this.previousTiles, (row, col) => tilesCopy[row][col] = this.previousTiles[row][col]);
        foreach2dArray(this.tiles, (row, col) => this.previousTiles[row][col] = this.tiles[row][col]);
        
        let gotScore = 0, tilesMoved = false;

        switch (key) {
            case 37:
            case 65:
                [tilesMoved, gotScore] = this.moveTilesLeft();
                break;
            case 38:
            case 87:
                [tilesMoved, gotScore] = this.moveTilesUp();
                break;
            case 39:
            case 68:
                [tilesMoved, gotScore] = this.moveTilesRight();
                break;
            case 40:
            case 83:
                [tilesMoved, gotScore] = this.moveTilesDown();
        }

        if (!tilesMoved) {
            foreach2dArray(tilesCopy, (row, col) => this.previousTiles[row][col] = tilesCopy[row][col]);
        }

        return [tilesMoved, gotScore];
    }

    has2048Tile() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.tiles[row][col] !== null && this.tiles[row][col].value === 2048) {
                    return true;
                }
            }
        }

        return false;
    }

    moveTilesLeft() {
        let gotScore = 0,
            isMoved = false;

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.tiles[row][col] == null) continue;

                let nextCol = col;

                for (let nextColPos = col - 1; nextColPos >= 0; nextColPos--) {
                    if (this.tiles[row][nextColPos] == null) {
                        nextCol = nextColPos;
                    }
                }

                if (nextCol !== col) {
                    this.tiles[row][nextCol] = new Tile(this.tiles[row][col].value);
                    this.tiles[row][col] = null;

                    isMoved = true;
                }

                if (this.tiles[row][nextCol - 1] !== undefined && this.tiles[row][nextCol - 1] !== null) {
                    if (this.tiles[row][nextCol - 1].canCombine && this.tiles[row][nextCol].value === this.tiles[row][nextCol - 1].value) {
                        this.tiles[row][nextCol - 1] = new Tile(this.tiles[row][nextCol].value * 2);
                        this.tiles[row][nextCol - 1].canCombine = false;
                        this.tiles[row][nextCol] = null;

                        isMoved = true;
                        gotScore += this.tiles[row][nextCol - 1].value;
                    }
                }
            }
        }

        return [isMoved, gotScore];
    }

    moveTilesUp() {
        let gotScore = 0,
            isMoved = false;

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.tiles[row][col] == null) continue;

                let nextRow = row;
                for (let nextRowPos = row - 1; nextRowPos >= 0; nextRowPos--) {
                    if (this.tiles[nextRowPos][col] == null) {
                        nextRow = nextRowPos;
                    }
                }

                if (nextRow !== row) {
                    this.tiles[nextRow][col] = new Tile(this.tiles[row][col].value);
                    this.tiles[row][col] = null;

                    isMoved = true;
                }

                if (this.tiles[nextRow - 1] !== undefined
                    && this.tiles[nextRow - 1][col] !== null
                    && this.tiles[nextRow - 1][col].canCombine
                    && this.tiles[nextRow - 1][col].value === this.tiles[nextRow][col].value) {
                    this.tiles[nextRow - 1][col] = new Tile(this.tiles[nextRow][col].value * 2);
                    this.tiles[nextRow - 1][col].canCombine = false;
                    this.tiles[nextRow][col] = null;

                    isMoved = true;
                    gotScore += this.tiles[nextRow - 1][col].value;
                }
            }
        }

        return [isMoved, gotScore];
    }

    moveTilesRight() {
        let gotScore = 0,
            isMoved = false;

        for (let row = 0; row < this.rows; row++) {
            for (let col = this.cols - 1; col >= 0; col--) {
                if (this.tiles[row][col] == null) continue;

                let nextCol = col;

                for (let nextColPos = col + 1; nextColPos < this.cols; nextColPos++) {
                    if (this.tiles[row][nextColPos] == null) {
                        nextCol = nextColPos;
                    }
                }

                if (nextCol !== col) {
                    this.tiles[row][nextCol] = new Tile(this.tiles[row][col].value);
                    this.tiles[row][col] = null;

                    isMoved = true;
                }

                if (this.tiles[row][nextCol + 1] !== undefined && this.tiles[row][nextCol + 1] !== null) {
                    if (this.tiles[row][nextCol + 1].canCombine
                        && this.tiles[row][nextCol].value === this.tiles[row][nextCol + 1].value) {
                        this.tiles[row][nextCol + 1] = new Tile(this.tiles[row][nextCol].value * 2);
                        this.tiles[row][nextCol + 1].canCombine = false;
                        this.tiles[row][nextCol] = null;

                        isMoved = true;
                        gotScore += this.tiles[row][nextCol + 1].value;
                    }
                }
            }
        }

        return [isMoved, gotScore];
    }

    moveTilesDown() {
        let gotScore = 0,
            isMoved = false;

        for (let row = this.rows - 1; row >= 0; row--) {
            for (let col = 0; col < this.cols; col++) {
                if (this.tiles[row][col] == null) continue;

                let nextRow = row;
                for (let nextRowPos = row + 1; nextRowPos < this.rows; nextRowPos++) {
                    if (this.tiles[nextRowPos][col] == null) {
                        nextRow = nextRowPos;
                    }
                }

                if (nextRow !== row) {
                    this.tiles[nextRow][col] = new Tile(this.tiles[row][col].value);
                    this.tiles[row][col] = null;

                    isMoved = true;
                }

                if (this.tiles[nextRow + 1] !== undefined && this.tiles[nextRow + 1][col] !== null) {
                    if (this.tiles[nextRow + 1][col].canCombine
                        && this.tiles[nextRow + 1][col].value === this.tiles[nextRow][col].value) {
                        this.tiles[nextRow + 1][col] = new Tile(this.tiles[nextRow][col].value * 2);
                        this.tiles[nextRow + 1][col].canCombine = false;
                        this.tiles[nextRow][col] = null;

                        isMoved = true;
                        gotScore += this.tiles[nextRow + 1][col].value;
                    }
                }
            }
        }

        return [isMoved, gotScore];
    }

    undo() {
        if (arrayIsEmpty(this.previousTiles)) return false;

        foreach2dArray(this.tiles, (row, col) => this.tiles[row][col] = this.previousTiles[row][col]);

        return true;
    }

    isFull() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.tiles[row][col] === null) {
                    return false;
                }
            }
        }

        return true;
    }

    hasCombinations() {
        if (!this.isFull()) {
            return true;
        }

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                let tiles = this.tiles,
                    conditions = [
                    (tiles[row + 1] !== undefined) && (tiles[row][col].value === tiles[row + 1][col].value),
                    (tiles[row - 1] !== undefined) && (tiles[row][col].value === tiles[row - 1][col].value),
                    (tiles[row][col + 1] !== undefined) && (tiles[row][col].value === tiles[row][col + 1].value),
                    (tiles[row][col - 1] !== undefined) && (tiles[row][col].value === tiles[row][col - 1].value)
                ];

                if (arrayOr(conditions)) {
                    return true;
                }
            }
        }

        return false;
    }
}
