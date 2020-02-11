/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/classes/Canvas.js":
/*!**********************************!*\
  !*** ./src/js/classes/Canvas.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Canvas; });
class Canvas {
	constructor(id = 'canvas', width = 450, height = 450, context = '2d') {
		this.id = id;
		this.width = width;
		this.height = height;
		this.context = '2d';
		this.element = document.querySelector('#' + this.id);
		this.ctx = this.element.getContext(this.context);

        this.element.width = this.width;
        this.element.height = this.height;

        this.element.style.width = this.width + 'px';
        this.element.style.height = this.height + 'px';
	}
}


/***/ }),

/***/ "./src/js/classes/Field.js":
/*!*********************************!*\
  !*** ./src/js/classes/Field.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Field; });
/* harmony import */ var _Tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile */ "./src/js/classes/Tile.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../functions */ "./src/js/functions.js");



class Field {
    constructor(rows, cols) {
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
            this.tiles = Object(_functions__WEBPACK_IMPORTED_MODULE_1__["new2dArray"])(this.rows);

            for (let row = 0; row < this.rows; row++) {
                for (let col = 0; col < this.cols; col++) {
                    this.tiles[row][col] = null;
                }
            }
        }

        this.previousTiles = Object(_functions__WEBPACK_IMPORTED_MODULE_1__["new2dArray"])(this.rows);
    }

    generateNewRandomTile() {
        if (this.isFull()) return false;

        let randInt = Object(_functions__WEBPACK_IMPORTED_MODULE_1__["random"])(1, 10),
            value = 2;

        if (randInt === 10) {
            value = 4;
        }

        let tileCreated = false;
        while (!tileCreated) {
            let row = Object(_functions__WEBPACK_IMPORTED_MODULE_1__["random"])(0, this.rows - 1),
                col = Object(_functions__WEBPACK_IMPORTED_MODULE_1__["random"])(0, this.cols - 1);

            if (this.tiles[row][col] == null) {
                this.tiles[row][col] = new _Tile__WEBPACK_IMPORTED_MODULE_0__["default"](value);

                tileCreated = true;
            }
        }

        return true;
    }

    moveTiles(direction) {
        if (['left', 'up', 'right', 'down'].indexOf(direction.toLowerCase()) === -1) {
            throw new Error('Unknown direction ' + direction);
        }

        Object(_functions__WEBPACK_IMPORTED_MODULE_1__["foreach2dArray"])(this.tiles, (row, col) => {
            if (this.tiles[row][col] !== null) {
                this.tiles[row][col].canCombine = true;
            }
        });

        let tilesCopy = Object(_functions__WEBPACK_IMPORTED_MODULE_1__["new2dArray"])(this.rows);
        Object(_functions__WEBPACK_IMPORTED_MODULE_1__["foreach2dArray"])(this.previousTiles, (row, col) => tilesCopy[row][col] = this.previousTiles[row][col]);
        Object(_functions__WEBPACK_IMPORTED_MODULE_1__["foreach2dArray"])(this.tiles, (row, col) => this.previousTiles[row][col] = this.tiles[row][col]);
        
        let movingFunctionName = 'moveTiles' + Object(_functions__WEBPACK_IMPORTED_MODULE_1__["firstToUpper"])(direction)
        let [tilesMoved, gotScore] = this[movingFunctionName]();
                
        if (!tilesMoved) {
            Object(_functions__WEBPACK_IMPORTED_MODULE_1__["foreach2dArray"])(tilesCopy, (row, col) => this.previousTiles[row][col] = tilesCopy[row][col]);
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
                    this.tiles[row][nextCol] = new _Tile__WEBPACK_IMPORTED_MODULE_0__["default"](this.tiles[row][col].value);
                    this.tiles[row][col] = null;

                    isMoved = true;
                }

                if (this.tiles[row][nextCol - 1] !== undefined && this.tiles[row][nextCol - 1] !== null) {
                    if (this.tiles[row][nextCol - 1].canCombine && this.tiles[row][nextCol].value === this.tiles[row][nextCol - 1].value) {
                        this.tiles[row][nextCol - 1] = new _Tile__WEBPACK_IMPORTED_MODULE_0__["default"](this.tiles[row][nextCol].value * 2);
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
                    this.tiles[nextRow][col] = new _Tile__WEBPACK_IMPORTED_MODULE_0__["default"](this.tiles[row][col].value);
                    this.tiles[row][col] = null;

                    isMoved = true;
                }

                if (this.tiles[nextRow - 1] !== undefined
                    && this.tiles[nextRow - 1][col] !== null
                    && this.tiles[nextRow - 1][col].canCombine
                    && this.tiles[nextRow - 1][col].value === this.tiles[nextRow][col].value) {
                    this.tiles[nextRow - 1][col] = new _Tile__WEBPACK_IMPORTED_MODULE_0__["default"](this.tiles[nextRow][col].value * 2);
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
                    this.tiles[row][nextCol] = new _Tile__WEBPACK_IMPORTED_MODULE_0__["default"](this.tiles[row][col].value);
                    this.tiles[row][col] = null;

                    isMoved = true;
                }

                if (this.tiles[row][nextCol + 1] !== undefined && this.tiles[row][nextCol + 1] !== null) {
                    if (this.tiles[row][nextCol + 1].canCombine
                        && this.tiles[row][nextCol].value === this.tiles[row][nextCol + 1].value) {
                        this.tiles[row][nextCol + 1] = new _Tile__WEBPACK_IMPORTED_MODULE_0__["default"](this.tiles[row][nextCol].value * 2);
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
                    this.tiles[nextRow][col] = new _Tile__WEBPACK_IMPORTED_MODULE_0__["default"](this.tiles[row][col].value);
                    this.tiles[row][col] = null;

                    isMoved = true;
                }

                if (this.tiles[nextRow + 1] !== undefined && this.tiles[nextRow + 1][col] !== null) {
                    if (this.tiles[nextRow + 1][col].canCombine
                        && this.tiles[nextRow + 1][col].value === this.tiles[nextRow][col].value) {
                        this.tiles[nextRow + 1][col] = new _Tile__WEBPACK_IMPORTED_MODULE_0__["default"](this.tiles[nextRow][col].value * 2);
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
        if (Object(_functions__WEBPACK_IMPORTED_MODULE_1__["arrayIsEmpty"])(this.previousTiles)) return false;

        Object(_functions__WEBPACK_IMPORTED_MODULE_1__["foreach2dArray"])(this.tiles, (row, col) => this.tiles[row][col] = this.previousTiles[row][col]);

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

                if (Object(_functions__WEBPACK_IMPORTED_MODULE_1__["arrayOr"])(conditions)) {
                    return true;
                }
            }
        }

        return false;
    }
}


/***/ }),

/***/ "./src/js/classes/Game.js":
/*!********************************!*\
  !*** ./src/js/classes/Game.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
class Game {
	init() {
		this.score = 0;
		this.previousScore = 0;
		this.isWin = false;
		this.isOver = false;
	}

	static get higherScore() {
		let higherScore = localStorage.getItem('higher_score');

		if (higherScore === null) {
			return 0;
		}

		return higherScore;
	}

	static set higherScore(score) {
		localStorage.setItem('higher_score', score);
	}

	win() {
	    this.isWin = true;
    }

	over() {
		if (this.score > Game.higherScore) {
			Game.higherScore = this.score;
		}

		this.isOver = true;
	}
}


/***/ }),

/***/ "./src/js/classes/Tile.js":
/*!********************************!*\
  !*** ./src/js/classes/Tile.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tile; });
class Tile {
	constructor(value) {
		this.value = value;
		this.canCombine = true;
	}

	get color() {
		if (Object.keys(Tile.colors).indexOf(this.value.toString()) === -1) {
			return Tile.anotherColor;
		}

		return Tile.colors[this.value];
	}

	get textColor() {
		if (this.value === 2 || this.value === 4) {
			return Tile.textColors.dark;
		}

		return Tile.textColors.bright;
	}

	static get colors() {
		return {
			'2': '#CDC1B4',
			'4': '#EDE0C8',
			'8': '#F2B179',
			'16': '#F59563',
			'32': '#F67C5F',
			'64': '#F65E3B',
			'128': '#EDCF72',
			'256': '#EDCC61',
			'512': '#E5C125',
			'1024': '#E2B912',
			'2048': '#ECC400'
		};
	}

	static get anotherColor() {
		return '#000000';
	}

	static get textColors() {
		return {
			'bright': '#F9F6F2',
			'dark': '#776E65'
		};
	}
}


/***/ }),

/***/ "./src/js/classes/View.js":
/*!********************************!*\
  !*** ./src/js/classes/View.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return View; });
class View {
	constructor(canvas, rows, cols) {
		this.canvas = canvas;
		this.rows = rows;
		this.cols = cols;
		this.tileWidth = this.canvas.width / this.cols;
		this.tileHeight = this.canvas.height / this.rows;
		this.winIsOpened = false;
		this.overIsOpened = false;
	}

	renderFieldBackground(color = '#E2D6C9') {
		this.canvas.ctx.fillStyle = color;
		this.canvas.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	renderFieldGrid(color = '#BBADA0', lineWidth = 6) {
		let ctx = this.canvas.ctx;

		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;

		for (let i = 1; i < this.rows; i++) {
			ctx.beginPath();
			ctx.moveTo(0, i * this.tileHeight);
			ctx.lineTo(this.canvas.width, i * this.tileHeight);
			ctx.stroke();
			ctx.closePath();
		}

		for (let i = 1; i < this.cols; i++) {
			ctx.beginPath();
			ctx.moveTo(i * this.tileWidth, 0);
			ctx.lineTo(i * this.tileWidth, this.canvas.height);
			ctx.stroke();
			ctx.closePath();
		}
	}

	renderTiles(tiles) {
		let ctx = this.canvas.ctx;
		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols; col++) {
				let tile = tiles[row][col];
				if (tile == null) continue;

				let x = col * this.tileWidth, y = row * this.tileHeight;
				ctx.fillStyle = tile.color;
				ctx.fillRect(x, y, this.tileWidth, this.tileHeight);

				ctx.fillStyle = tile.textColor;
				ctx.font = '46px Arial';
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(tile.value, x + (this.tileWidth / 2), y + (this.tileHeight / 2));
			}
		}
	}

	renderScore(score, scoreId = 'score') {
		document.querySelector('#' + scoreId).innerHTML = score;
	}

	renderHigherScore(score, scoreId = 'higher-score') {
		document.querySelector('#' + scoreId).innerHTML = score;
	}

	openWin() {
		this.winIsOpened = true;
	}

	closeWin(continueId = 'continue') {
        this.winIsOpened = false;
        document.querySelector('#' + continueId).style.display = 'none';
    }

    renderWin(score, continueId = 'continue') {
        let ctx = this.canvas.ctx;

        ctx.fillStyle = '#EDCC61';
        ctx.globalAlpha = 0.85;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.globalAlpha = 1.0;

        ctx.fillStyle = '#2A1818';
        ctx.font = '50px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('YOU WIN', this.canvas.width / 2, 170);

        ctx.font = '28px Arial';
        ctx.fillText('Your score: ' + score, this.canvas.width / 2, 210);

        document.querySelector('#' + continueId).style.display = 'inline-block';
    }

    openOver() {
		this.overIsOpened = true;
	}

	closeOver(closeId = 'close') {
		this.overIsOpened = false;
		document.querySelector('#' + closeId).style.display = 'none';
	}

	renderOver(score, closeId = 'close') {
		let ctx = this.canvas.ctx;

		ctx.fillStyle = '#F65E3B';
		ctx.globalAlpha = 0.85;
		ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		ctx.globalAlpha = 1.0;

		ctx.fillStyle = '#2A1818';
		ctx.font = '50px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText('YOU LOSE', this.canvas.width / 2, 170);

		ctx.font = '28px Arial';
		ctx.fillText('Your score: ' + score, this.canvas.width / 2, 210);

		document.querySelector('#' + closeId).style.display = 'inline-block';
	}
}


/***/ }),

/***/ "./src/js/functions.js":
/*!*****************************!*\
  !*** ./src/js/functions.js ***!
  \*****************************/
/*! exports provided: random, arrayIsEmpty, foreach2dArray, arrayOr, new2dArray, firstToUpper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "random", function() { return random; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayIsEmpty", function() { return arrayIsEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "foreach2dArray", function() { return foreach2dArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayOr", function() { return arrayOr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "new2dArray", function() { return new2dArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "firstToUpper", function() { return firstToUpper; });
function random(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

function arrayIsEmpty(array) {
    if (array.length === 0) return true;

    for (let i = 0; i < array.length; i++) {
        if (array[i] !== undefined) {
            if (array[i] instanceof Array) {
                return arrayIsEmpty(array[i]);
            }

            return false;
        }
    }

    return true;
}

function foreach2dArray(array, func) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            func(i, j, array[i][j]);
        }
    }
}

function arrayOr(conditions) {
    for (let i = 0; i < conditions.length; i++) {
        if (conditions[i]) {
            return true;
        }
    }

    return false;
}

function new2dArray(rows) {
    let newArray = [];

    for (let row = 0; row < rows; row++) {
        newArray[row] = [];
    }

    return newArray;
}

function firstToUpper(string) {
    return string[0].toUpperCase() + string.slice(1);
}


/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classes_Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Canvas */ "./src/js/classes/Canvas.js");
/* harmony import */ var _classes_Field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Field */ "./src/js/classes/Field.js");
/* harmony import */ var _classes_View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/View */ "./src/js/classes/View.js");
/* harmony import */ var _classes_Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./classes/Game */ "./src/js/classes/Game.js");





const rows = 4,
    cols = 4;

let canvas = new _classes_Canvas__WEBPACK_IMPORTED_MODULE_0__["default"](),
    field = new _classes_Field__WEBPACK_IMPORTED_MODULE_1__["default"](rows, cols),
    view = new _classes_View__WEBPACK_IMPORTED_MODULE_2__["default"](canvas, rows, cols),
    game = new _classes_Game__WEBPACK_IMPORTED_MODULE_3__["default"]();

function render() {
    view.renderScore(game.score);
    view.renderHigherScore(_classes_Game__WEBPACK_IMPORTED_MODULE_3__["default"].higherScore);
    view.renderFieldBackground();
    view.renderTiles(field.tiles);
    view.renderFieldGrid();

    if (game.isOver && view.overIsOpened) {
        view.renderOver(game.score);
    }

    if (game.isWin && view.winIsOpened) {
        view.renderWin(game.score);
    }
}

function move(keyCode) {
    if ([37, 65, 38, 87, 39, 68, 40, 83].indexOf(keyCode) === -1) return [false, 0];
    let direction = '';

    switch (keyCode) {
            case 37:
            case 65:
                direction = 'left';
                break;
            case 38:
            case 87:
                direction = 'up';
                break;
            case 39:
            case 68:
                direction = 'right';
                break;
            case 40:
            case 83:
                direction = 'down';
        }

    let [tilesMoved, gotScore] = field.moveTiles(direction);

    if (!tilesMoved) return;

    game.previousScore = game.score;
    game.score += gotScore;

    field.generateNewRandomTile();

    if (!field.hasCombinations()) {
        game.over();
        view.openOver();
    }

    if (!game.isWin && field.has2048Tile()) {
        game.win();
        view.openWin();
    }
}

function undo() {
    if (field.undo()) {
        game.score = game.previousScore;
    }

    view.closeWin();
    view.closeOver();
}

function newGame() {
    game.over();
    game.init();
    field.init();
    field.generateNewRandomTile();
    field.generateNewRandomTile();
    view.closeWin();
    view.closeOver();
}

function continueWonGame() {
    view.closeWin();
}

function closeOver() {
    view.closeOver();
}

newGame();

setInterval(render, 50);
document.addEventListener('keydown', e => move(e.keyCode));
document.querySelector('#undo').addEventListener('click', undo);
document.querySelector('#new-game').addEventListener('click', newGame);
document.querySelector('#continue').addEventListener('click', continueWonGame);
document.querySelector('#close').addEventListener('click', closeOver);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NsYXNzZXMvQ2FudmFzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jbGFzc2VzL0ZpZWxkLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jbGFzc2VzL0dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NsYXNzZXMvVGlsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY2xhc3Nlcy9WaWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL2luZGV4LmpzXCIpO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzIHtcblx0Y29uc3RydWN0b3IoaWQgPSAnY2FudmFzJywgd2lkdGggPSA0NTAsIGhlaWdodCA9IDQ1MCwgY29udGV4dCA9ICcyZCcpIHtcblx0XHR0aGlzLmlkID0gaWQ7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMuY29udGV4dCA9ICcyZCc7XG5cdFx0dGhpcy5lbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyB0aGlzLmlkKTtcblx0XHR0aGlzLmN0eCA9IHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KHRoaXMuY29udGV4dCk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy5lbGVtZW50LmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS53aWR0aCA9IHRoaXMud2lkdGggKyAncHgnO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgKyAncHgnO1xuXHR9XG59XG4iLCJpbXBvcnQgVGlsZSBmcm9tICcuL1RpbGUnO1xuaW1wb3J0IHsgcmFuZG9tLCBhcnJheUlzRW1wdHksIGZvcmVhY2gyZEFycmF5LCBhcnJheU9yLCBuZXcyZEFycmF5LCBmaXJzdFRvVXBwZXIgfSBmcm9tICcuLi9mdW5jdGlvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWVsZCB7XG4gICAgY29uc3RydWN0b3Iocm93cywgY29scykge1xuICAgICAgICB0aGlzLmNvbHMgPSBjb2xzO1xuICAgICAgICB0aGlzLnJvd3MgPSByb3dzO1xuICAgIH1cblxuICAgIGluaXQodGlsZXMgPSBbXSkge1xuICAgICAgICBpZiAodGlsZXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAodGlsZXMubGVuZ3RoICE9PSB0aGlzLnJvd3MpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRpbGVzJ3JlIG11c3QgaGF2ZSAke3RoaXMucm93c30gcm93c2ApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLnJvd3M7IHJvdysrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRpbGVzW3Jvd10ubGVuZ3RoICE9PSB0aGlzLmNvbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaWxlcydyZSBtdXN0IGhhdmUgJHt0aGlzLmNvbHN9IGNvbHNgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudGlsZXMgPSB0aWxlcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGlsZXMgPSBuZXcyZEFycmF5KHRoaXMucm93cyk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMucm93czsgcm93KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLmNvbHM7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNbcm93XVtjb2xdID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByZXZpb3VzVGlsZXMgPSBuZXcyZEFycmF5KHRoaXMucm93cyk7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGVOZXdSYW5kb21UaWxlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0Z1bGwoKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGxldCByYW5kSW50ID0gcmFuZG9tKDEsIDEwKSxcbiAgICAgICAgICAgIHZhbHVlID0gMjtcblxuICAgICAgICBpZiAocmFuZEludCA9PT0gMTApIHtcbiAgICAgICAgICAgIHZhbHVlID0gNDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0aWxlQ3JlYXRlZCA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAoIXRpbGVDcmVhdGVkKSB7XG4gICAgICAgICAgICBsZXQgcm93ID0gcmFuZG9tKDAsIHRoaXMucm93cyAtIDEpLFxuICAgICAgICAgICAgICAgIGNvbCA9IHJhbmRvbSgwLCB0aGlzLmNvbHMgLSAxKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudGlsZXNbcm93XVtjb2xdID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVzW3Jvd11bY29sXSA9IG5ldyBUaWxlKHZhbHVlKTtcblxuICAgICAgICAgICAgICAgIHRpbGVDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIG1vdmVUaWxlcyhkaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKFsnbGVmdCcsICd1cCcsICdyaWdodCcsICdkb3duJ10uaW5kZXhPZihkaXJlY3Rpb24udG9Mb3dlckNhc2UoKSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZGlyZWN0aW9uICcgKyBkaXJlY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yZWFjaDJkQXJyYXkodGhpcy50aWxlcywgKHJvdywgY29sKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy50aWxlc1tyb3ddW2NvbF0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRpbGVzW3Jvd11bY29sXS5jYW5Db21iaW5lID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHRpbGVzQ29weSA9IG5ldzJkQXJyYXkodGhpcy5yb3dzKTtcbiAgICAgICAgZm9yZWFjaDJkQXJyYXkodGhpcy5wcmV2aW91c1RpbGVzLCAocm93LCBjb2wpID0+IHRpbGVzQ29weVtyb3ddW2NvbF0gPSB0aGlzLnByZXZpb3VzVGlsZXNbcm93XVtjb2xdKTtcbiAgICAgICAgZm9yZWFjaDJkQXJyYXkodGhpcy50aWxlcywgKHJvdywgY29sKSA9PiB0aGlzLnByZXZpb3VzVGlsZXNbcm93XVtjb2xdID0gdGhpcy50aWxlc1tyb3ddW2NvbF0pO1xuICAgICAgICBcbiAgICAgICAgbGV0IG1vdmluZ0Z1bmN0aW9uTmFtZSA9ICdtb3ZlVGlsZXMnICsgZmlyc3RUb1VwcGVyKGRpcmVjdGlvbilcbiAgICAgICAgbGV0IFt0aWxlc01vdmVkLCBnb3RTY29yZV0gPSB0aGlzW21vdmluZ0Z1bmN0aW9uTmFtZV0oKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgaWYgKCF0aWxlc01vdmVkKSB7XG4gICAgICAgICAgICBmb3JlYWNoMmRBcnJheSh0aWxlc0NvcHksIChyb3csIGNvbCkgPT4gdGhpcy5wcmV2aW91c1RpbGVzW3Jvd11bY29sXSA9IHRpbGVzQ29weVtyb3ddW2NvbF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFt0aWxlc01vdmVkLCBnb3RTY29yZV07XG4gICAgfVxuXG4gICAgaGFzMjA0OFRpbGUoKSB7XG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMucm93czsgcm93KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHRoaXMuY29sczsgY29sKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50aWxlc1tyb3ddW2NvbF0gIT09IG51bGwgJiYgdGhpcy50aWxlc1tyb3ddW2NvbF0udmFsdWUgPT09IDIwNDgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIG1vdmVUaWxlc0xlZnQoKSB7XG4gICAgICAgIGxldCBnb3RTY29yZSA9IDAsXG4gICAgICAgICAgICBpc01vdmVkID0gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5yb3dzOyByb3crKykge1xuICAgICAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgdGhpcy5jb2xzOyBjb2wrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbGVzW3Jvd11bY29sXSA9PSBudWxsKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGxldCBuZXh0Q29sID0gY29sO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbmV4dENvbFBvcyA9IGNvbCAtIDE7IG5leHRDb2xQb3MgPj0gMDsgbmV4dENvbFBvcy0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbGVzW3Jvd11bbmV4dENvbFBvc10gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dENvbCA9IG5leHRDb2xQb3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobmV4dENvbCAhPT0gY29sKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNbcm93XVtuZXh0Q29sXSA9IG5ldyBUaWxlKHRoaXMudGlsZXNbcm93XVtjb2xdLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc1tyb3ddW2NvbF0gPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbGVzW3Jvd11bbmV4dENvbCAtIDFdICE9PSB1bmRlZmluZWQgJiYgdGhpcy50aWxlc1tyb3ddW25leHRDb2wgLSAxXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50aWxlc1tyb3ddW25leHRDb2wgLSAxXS5jYW5Db21iaW5lICYmIHRoaXMudGlsZXNbcm93XVtuZXh0Q29sXS52YWx1ZSA9PT0gdGhpcy50aWxlc1tyb3ddW25leHRDb2wgLSAxXS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc1tyb3ddW25leHRDb2wgLSAxXSA9IG5ldyBUaWxlKHRoaXMudGlsZXNbcm93XVtuZXh0Q29sXS52YWx1ZSAqIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc1tyb3ddW25leHRDb2wgLSAxXS5jYW5Db21iaW5lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzW3Jvd11bbmV4dENvbF0gPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvdFNjb3JlICs9IHRoaXMudGlsZXNbcm93XVtuZXh0Q29sIC0gMV0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW2lzTW92ZWQsIGdvdFNjb3JlXTtcbiAgICB9XG5cbiAgICBtb3ZlVGlsZXNVcCgpIHtcbiAgICAgICAgbGV0IGdvdFNjb3JlID0gMCxcbiAgICAgICAgICAgIGlzTW92ZWQgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLnJvd3M7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLmNvbHM7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGlsZXNbcm93XVtjb2xdID09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgbGV0IG5leHRSb3cgPSByb3c7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbmV4dFJvd1BvcyA9IHJvdyAtIDE7IG5leHRSb3dQb3MgPj0gMDsgbmV4dFJvd1Bvcy0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbGVzW25leHRSb3dQb3NdW2NvbF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFJvdyA9IG5leHRSb3dQb3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobmV4dFJvdyAhPT0gcm93KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNbbmV4dFJvd11bY29sXSA9IG5ldyBUaWxlKHRoaXMudGlsZXNbcm93XVtjb2xdLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc1tyb3ddW2NvbF0gPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbGVzW25leHRSb3cgLSAxXSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMudGlsZXNbbmV4dFJvdyAtIDFdW2NvbF0gIT09IG51bGxcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy50aWxlc1tuZXh0Um93IC0gMV1bY29sXS5jYW5Db21iaW5lXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMudGlsZXNbbmV4dFJvdyAtIDFdW2NvbF0udmFsdWUgPT09IHRoaXMudGlsZXNbbmV4dFJvd11bY29sXS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzW25leHRSb3cgLSAxXVtjb2xdID0gbmV3IFRpbGUodGhpcy50aWxlc1tuZXh0Um93XVtjb2xdLnZhbHVlICogMik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNbbmV4dFJvdyAtIDFdW2NvbF0uY2FuQ29tYmluZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzW25leHRSb3ddW2NvbF0gPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBnb3RTY29yZSArPSB0aGlzLnRpbGVzW25leHRSb3cgLSAxXVtjb2xdLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbaXNNb3ZlZCwgZ290U2NvcmVdO1xuICAgIH1cblxuICAgIG1vdmVUaWxlc1JpZ2h0KCkge1xuICAgICAgICBsZXQgZ290U2NvcmUgPSAwLFxuICAgICAgICAgICAgaXNNb3ZlZCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMucm93czsgcm93KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCA9IHRoaXMuY29scyAtIDE7IGNvbCA+PSAwOyBjb2wtLSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbGVzW3Jvd11bY29sXSA9PSBudWxsKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGxldCBuZXh0Q29sID0gY29sO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbmV4dENvbFBvcyA9IGNvbCArIDE7IG5leHRDb2xQb3MgPCB0aGlzLmNvbHM7IG5leHRDb2xQb3MrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50aWxlc1tyb3ddW25leHRDb2xQb3NdID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRDb2wgPSBuZXh0Q29sUG9zO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5leHRDb2wgIT09IGNvbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzW3Jvd11bbmV4dENvbF0gPSBuZXcgVGlsZSh0aGlzLnRpbGVzW3Jvd11bY29sXS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNbcm93XVtjb2xdID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICBpc01vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50aWxlc1tyb3ddW25leHRDb2wgKyAxXSAhPT0gdW5kZWZpbmVkICYmIHRoaXMudGlsZXNbcm93XVtuZXh0Q29sICsgMV0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudGlsZXNbcm93XVtuZXh0Q29sICsgMV0uY2FuQ29tYmluZVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy50aWxlc1tyb3ddW25leHRDb2xdLnZhbHVlID09PSB0aGlzLnRpbGVzW3Jvd11bbmV4dENvbCArIDFdLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzW3Jvd11bbmV4dENvbCArIDFdID0gbmV3IFRpbGUodGhpcy50aWxlc1tyb3ddW25leHRDb2xdLnZhbHVlICogMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzW3Jvd11bbmV4dENvbCArIDFdLmNhbkNvbWJpbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNbcm93XVtuZXh0Q29sXSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ290U2NvcmUgKz0gdGhpcy50aWxlc1tyb3ddW25leHRDb2wgKyAxXS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbaXNNb3ZlZCwgZ290U2NvcmVdO1xuICAgIH1cblxuICAgIG1vdmVUaWxlc0Rvd24oKSB7XG4gICAgICAgIGxldCBnb3RTY29yZSA9IDAsXG4gICAgICAgICAgICBpc01vdmVkID0gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgcm93ID0gdGhpcy5yb3dzIC0gMTsgcm93ID49IDA7IHJvdy0tKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLmNvbHM7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGlsZXNbcm93XVtjb2xdID09IG51bGwpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgbGV0IG5leHRSb3cgPSByb3c7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbmV4dFJvd1BvcyA9IHJvdyArIDE7IG5leHRSb3dQb3MgPCB0aGlzLnJvd3M7IG5leHRSb3dQb3MrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50aWxlc1tuZXh0Um93UG9zXVtjb2xdID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRSb3cgPSBuZXh0Um93UG9zO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5leHRSb3cgIT09IHJvdykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzW25leHRSb3ddW2NvbF0gPSBuZXcgVGlsZSh0aGlzLnRpbGVzW3Jvd11bY29sXS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGlsZXNbcm93XVtjb2xdID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICBpc01vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy50aWxlc1tuZXh0Um93ICsgMV0gIT09IHVuZGVmaW5lZCAmJiB0aGlzLnRpbGVzW25leHRSb3cgKyAxXVtjb2xdICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbGVzW25leHRSb3cgKyAxXVtjb2xdLmNhbkNvbWJpbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICYmIHRoaXMudGlsZXNbbmV4dFJvdyArIDFdW2NvbF0udmFsdWUgPT09IHRoaXMudGlsZXNbbmV4dFJvd11bY29sXS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc1tuZXh0Um93ICsgMV1bY29sXSA9IG5ldyBUaWxlKHRoaXMudGlsZXNbbmV4dFJvd11bY29sXS52YWx1ZSAqIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aWxlc1tuZXh0Um93ICsgMV1bY29sXS5jYW5Db21iaW5lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRpbGVzW25leHRSb3ddW2NvbF0gPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvdFNjb3JlICs9IHRoaXMudGlsZXNbbmV4dFJvdyArIDFdW2NvbF0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW2lzTW92ZWQsIGdvdFNjb3JlXTtcbiAgICB9XG5cbiAgICB1bmRvKCkge1xuICAgICAgICBpZiAoYXJyYXlJc0VtcHR5KHRoaXMucHJldmlvdXNUaWxlcykpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBmb3JlYWNoMmRBcnJheSh0aGlzLnRpbGVzLCAocm93LCBjb2wpID0+IHRoaXMudGlsZXNbcm93XVtjb2xdID0gdGhpcy5wcmV2aW91c1RpbGVzW3Jvd11bY29sXSk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaXNGdWxsKCkge1xuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLnJvd3M7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLmNvbHM7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudGlsZXNbcm93XVtjb2xdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBoYXNDb21iaW5hdGlvbnMoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0Z1bGwoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLnJvd3M7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLmNvbHM7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRpbGVzID0gdGhpcy50aWxlcyxcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9ucyA9IFtcbiAgICAgICAgICAgICAgICAgICAgKHRpbGVzW3JvdyArIDFdICE9PSB1bmRlZmluZWQpICYmICh0aWxlc1tyb3ddW2NvbF0udmFsdWUgPT09IHRpbGVzW3JvdyArIDFdW2NvbF0udmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAodGlsZXNbcm93IC0gMV0gIT09IHVuZGVmaW5lZCkgJiYgKHRpbGVzW3Jvd11bY29sXS52YWx1ZSA9PT0gdGlsZXNbcm93IC0gMV1bY29sXS52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICh0aWxlc1tyb3ddW2NvbCArIDFdICE9PSB1bmRlZmluZWQpICYmICh0aWxlc1tyb3ddW2NvbF0udmFsdWUgPT09IHRpbGVzW3Jvd11bY29sICsgMV0udmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAodGlsZXNbcm93XVtjb2wgLSAxXSAhPT0gdW5kZWZpbmVkKSAmJiAodGlsZXNbcm93XVtjb2xdLnZhbHVlID09PSB0aWxlc1tyb3ddW2NvbCAtIDFdLnZhbHVlKVxuICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlPcihjb25kaXRpb25zKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG5cdGluaXQoKSB7XG5cdFx0dGhpcy5zY29yZSA9IDA7XG5cdFx0dGhpcy5wcmV2aW91c1Njb3JlID0gMDtcblx0XHR0aGlzLmlzV2luID0gZmFsc2U7XG5cdFx0dGhpcy5pc092ZXIgPSBmYWxzZTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgaGlnaGVyU2NvcmUoKSB7XG5cdFx0bGV0IGhpZ2hlclNjb3JlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2hpZ2hlcl9zY29yZScpO1xuXG5cdFx0aWYgKGhpZ2hlclNjb3JlID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cblx0XHRyZXR1cm4gaGlnaGVyU2NvcmU7XG5cdH1cblxuXHRzdGF0aWMgc2V0IGhpZ2hlclNjb3JlKHNjb3JlKSB7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hpZ2hlcl9zY29yZScsIHNjb3JlKTtcblx0fVxuXG5cdHdpbigpIHtcblx0ICAgIHRoaXMuaXNXaW4gPSB0cnVlO1xuICAgIH1cblxuXHRvdmVyKCkge1xuXHRcdGlmICh0aGlzLnNjb3JlID4gR2FtZS5oaWdoZXJTY29yZSkge1xuXHRcdFx0R2FtZS5oaWdoZXJTY29yZSA9IHRoaXMuc2NvcmU7XG5cdFx0fVxuXG5cdFx0dGhpcy5pc092ZXIgPSB0cnVlO1xuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUaWxlIHtcblx0Y29uc3RydWN0b3IodmFsdWUpIHtcblx0XHR0aGlzLnZhbHVlID0gdmFsdWU7XG5cdFx0dGhpcy5jYW5Db21iaW5lID0gdHJ1ZTtcblx0fVxuXG5cdGdldCBjb2xvcigpIHtcblx0XHRpZiAoT2JqZWN0LmtleXMoVGlsZS5jb2xvcnMpLmluZGV4T2YodGhpcy52YWx1ZS50b1N0cmluZygpKSA9PT0gLTEpIHtcblx0XHRcdHJldHVybiBUaWxlLmFub3RoZXJDb2xvcjtcblx0XHR9XG5cblx0XHRyZXR1cm4gVGlsZS5jb2xvcnNbdGhpcy52YWx1ZV07XG5cdH1cblxuXHRnZXQgdGV4dENvbG9yKCkge1xuXHRcdGlmICh0aGlzLnZhbHVlID09PSAyIHx8IHRoaXMudmFsdWUgPT09IDQpIHtcblx0XHRcdHJldHVybiBUaWxlLnRleHRDb2xvcnMuZGFyaztcblx0XHR9XG5cblx0XHRyZXR1cm4gVGlsZS50ZXh0Q29sb3JzLmJyaWdodDtcblx0fVxuXG5cdHN0YXRpYyBnZXQgY29sb3JzKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHQnMic6ICcjQ0RDMUI0Jyxcblx0XHRcdCc0JzogJyNFREUwQzgnLFxuXHRcdFx0JzgnOiAnI0YyQjE3OScsXG5cdFx0XHQnMTYnOiAnI0Y1OTU2MycsXG5cdFx0XHQnMzInOiAnI0Y2N0M1RicsXG5cdFx0XHQnNjQnOiAnI0Y2NUUzQicsXG5cdFx0XHQnMTI4JzogJyNFRENGNzInLFxuXHRcdFx0JzI1Nic6ICcjRURDQzYxJyxcblx0XHRcdCc1MTInOiAnI0U1QzEyNScsXG5cdFx0XHQnMTAyNCc6ICcjRTJCOTEyJyxcblx0XHRcdCcyMDQ4JzogJyNFQ0M0MDAnXG5cdFx0fTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgYW5vdGhlckNvbG9yKCkge1xuXHRcdHJldHVybiAnIzAwMDAwMCc7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IHRleHRDb2xvcnMoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdCdicmlnaHQnOiAnI0Y5RjZGMicsXG5cdFx0XHQnZGFyayc6ICcjNzc2RTY1J1xuXHRcdH07XG5cdH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xuXHRjb25zdHJ1Y3RvcihjYW52YXMsIHJvd3MsIGNvbHMpIHtcblx0XHR0aGlzLmNhbnZhcyA9IGNhbnZhcztcblx0XHR0aGlzLnJvd3MgPSByb3dzO1xuXHRcdHRoaXMuY29scyA9IGNvbHM7XG5cdFx0dGhpcy50aWxlV2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aCAvIHRoaXMuY29scztcblx0XHR0aGlzLnRpbGVIZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQgLyB0aGlzLnJvd3M7XG5cdFx0dGhpcy53aW5Jc09wZW5lZCA9IGZhbHNlO1xuXHRcdHRoaXMub3ZlcklzT3BlbmVkID0gZmFsc2U7XG5cdH1cblxuXHRyZW5kZXJGaWVsZEJhY2tncm91bmQoY29sb3IgPSAnI0UyRDZDOScpIHtcblx0XHR0aGlzLmNhbnZhcy5jdHguZmlsbFN0eWxlID0gY29sb3I7XG5cdFx0dGhpcy5jYW52YXMuY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuXHR9XG5cblx0cmVuZGVyRmllbGRHcmlkKGNvbG9yID0gJyNCQkFEQTAnLCBsaW5lV2lkdGggPSA2KSB7XG5cdFx0bGV0IGN0eCA9IHRoaXMuY2FudmFzLmN0eDtcblxuXHRcdGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuXHRcdGN0eC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG5cblx0XHRmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMucm93czsgaSsrKSB7XG5cdFx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0XHRjdHgubW92ZVRvKDAsIGkgKiB0aGlzLnRpbGVIZWlnaHQpO1xuXHRcdFx0Y3R4LmxpbmVUbyh0aGlzLmNhbnZhcy53aWR0aCwgaSAqIHRoaXMudGlsZUhlaWdodCk7XG5cdFx0XHRjdHguc3Ryb2tlKCk7XG5cdFx0XHRjdHguY2xvc2VQYXRoKCk7XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLmNvbHM7IGkrKykge1xuXHRcdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRcdFx0Y3R4Lm1vdmVUbyhpICogdGhpcy50aWxlV2lkdGgsIDApO1xuXHRcdFx0Y3R4LmxpbmVUbyhpICogdGhpcy50aWxlV2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG5cdFx0XHRjdHguc3Ryb2tlKCk7XG5cdFx0XHRjdHguY2xvc2VQYXRoKCk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyVGlsZXModGlsZXMpIHtcblx0XHRsZXQgY3R4ID0gdGhpcy5jYW52YXMuY3R4O1xuXHRcdGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHRoaXMucm93czsgcm93KyspIHtcblx0XHRcdGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHRoaXMuY29sczsgY29sKyspIHtcblx0XHRcdFx0bGV0IHRpbGUgPSB0aWxlc1tyb3ddW2NvbF07XG5cdFx0XHRcdGlmICh0aWxlID09IG51bGwpIGNvbnRpbnVlO1xuXG5cdFx0XHRcdGxldCB4ID0gY29sICogdGhpcy50aWxlV2lkdGgsIHkgPSByb3cgKiB0aGlzLnRpbGVIZWlnaHQ7XG5cdFx0XHRcdGN0eC5maWxsU3R5bGUgPSB0aWxlLmNvbG9yO1xuXHRcdFx0XHRjdHguZmlsbFJlY3QoeCwgeSwgdGhpcy50aWxlV2lkdGgsIHRoaXMudGlsZUhlaWdodCk7XG5cblx0XHRcdFx0Y3R4LmZpbGxTdHlsZSA9IHRpbGUudGV4dENvbG9yO1xuXHRcdFx0XHRjdHguZm9udCA9ICc0NnB4IEFyaWFsJztcblx0XHRcdFx0Y3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuXHRcdFx0XHRjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG5cdFx0XHRcdGN0eC5maWxsVGV4dCh0aWxlLnZhbHVlLCB4ICsgKHRoaXMudGlsZVdpZHRoIC8gMiksIHkgKyAodGhpcy50aWxlSGVpZ2h0IC8gMikpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlclNjb3JlKHNjb3JlLCBzY29yZUlkID0gJ3Njb3JlJykge1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgc2NvcmVJZCkuaW5uZXJIVE1MID0gc2NvcmU7XG5cdH1cblxuXHRyZW5kZXJIaWdoZXJTY29yZShzY29yZSwgc2NvcmVJZCA9ICdoaWdoZXItc2NvcmUnKSB7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBzY29yZUlkKS5pbm5lckhUTUwgPSBzY29yZTtcblx0fVxuXG5cdG9wZW5XaW4oKSB7XG5cdFx0dGhpcy53aW5Jc09wZW5lZCA9IHRydWU7XG5cdH1cblxuXHRjbG9zZVdpbihjb250aW51ZUlkID0gJ2NvbnRpbnVlJykge1xuICAgICAgICB0aGlzLndpbklzT3BlbmVkID0gZmFsc2U7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgY29udGludWVJZCkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICByZW5kZXJXaW4oc2NvcmUsIGNvbnRpbnVlSWQgPSAnY29udGludWUnKSB7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLmNhbnZhcy5jdHg7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjRURDQzYxJztcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC44NTtcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxLjA7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMkExODE4JztcbiAgICAgICAgY3R4LmZvbnQgPSAnNTBweCBBcmlhbCc7XG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgICAgICBjdHguZmlsbFRleHQoJ1lPVSBXSU4nLCB0aGlzLmNhbnZhcy53aWR0aCAvIDIsIDE3MCk7XG5cbiAgICAgICAgY3R4LmZvbnQgPSAnMjhweCBBcmlhbCc7XG4gICAgICAgIGN0eC5maWxsVGV4dCgnWW91ciBzY29yZTogJyArIHNjb3JlLCB0aGlzLmNhbnZhcy53aWR0aCAvIDIsIDIxMCk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBjb250aW51ZUlkKS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgfVxuXG4gICAgb3Blbk92ZXIoKSB7XG5cdFx0dGhpcy5vdmVySXNPcGVuZWQgPSB0cnVlO1xuXHR9XG5cblx0Y2xvc2VPdmVyKGNsb3NlSWQgPSAnY2xvc2UnKSB7XG5cdFx0dGhpcy5vdmVySXNPcGVuZWQgPSBmYWxzZTtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIGNsb3NlSWQpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cdH1cblxuXHRyZW5kZXJPdmVyKHNjb3JlLCBjbG9zZUlkID0gJ2Nsb3NlJykge1xuXHRcdGxldCBjdHggPSB0aGlzLmNhbnZhcy5jdHg7XG5cblx0XHRjdHguZmlsbFN0eWxlID0gJyNGNjVFM0InO1xuXHRcdGN0eC5nbG9iYWxBbHBoYSA9IDAuODU7XG5cdFx0Y3R4LmZpbGxSZWN0KDAsMCx0aGlzLmNhbnZhcy53aWR0aCx0aGlzLmNhbnZhcy5oZWlnaHQpO1xuXHRcdGN0eC5nbG9iYWxBbHBoYSA9IDEuMDtcblxuXHRcdGN0eC5maWxsU3R5bGUgPSAnIzJBMTgxOCc7XG5cdFx0Y3R4LmZvbnQgPSAnNTBweCBBcmlhbCc7XG5cdFx0Y3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuXHRcdGN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcblx0XHRjdHguZmlsbFRleHQoJ1lPVSBMT1NFJywgdGhpcy5jYW52YXMud2lkdGggLyAyLCAxNzApO1xuXG5cdFx0Y3R4LmZvbnQgPSAnMjhweCBBcmlhbCc7XG5cdFx0Y3R4LmZpbGxUZXh0KCdZb3VyIHNjb3JlOiAnICsgc2NvcmUsIHRoaXMuY2FudmFzLndpZHRoIC8gMiwgMjEwKTtcblxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgY2xvc2VJZCkuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuXHR9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gcmFuZG9tKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobWluIC0gMC41ICsgTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheUlzRW1wdHkoYXJyYXkpIHtcbiAgICBpZiAoYXJyYXkubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFycmF5W2ldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChhcnJheVtpXSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5SXNFbXB0eShhcnJheVtpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yZWFjaDJkQXJyYXkoYXJyYXksIGZ1bmMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYXJyYXlbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGZ1bmMoaSwgaiwgYXJyYXlbaV1bal0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlPcihjb25kaXRpb25zKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb25kaXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChjb25kaXRpb25zW2ldKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ldzJkQXJyYXkocm93cykge1xuICAgIGxldCBuZXdBcnJheSA9IFtdO1xuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgcm93czsgcm93KyspIHtcbiAgICAgICAgbmV3QXJyYXlbcm93XSA9IFtdO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdBcnJheTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0VG9VcHBlcihzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG59XG4iLCJpbXBvcnQgQ2FudmFzIGZyb20gJy4vY2xhc3Nlcy9DYW52YXMnO1xuaW1wb3J0IEZpZWxkIGZyb20gJy4vY2xhc3Nlcy9GaWVsZCc7XG5pbXBvcnQgVmlldyBmcm9tICcuL2NsYXNzZXMvVmlldyc7XG5pbXBvcnQgR2FtZSBmcm9tICcuL2NsYXNzZXMvR2FtZSc7XG5cbmNvbnN0IHJvd3MgPSA0LFxuICAgIGNvbHMgPSA0O1xuXG5sZXQgY2FudmFzID0gbmV3IENhbnZhcygpLFxuICAgIGZpZWxkID0gbmV3IEZpZWxkKHJvd3MsIGNvbHMpLFxuICAgIHZpZXcgPSBuZXcgVmlldyhjYW52YXMsIHJvd3MsIGNvbHMpLFxuICAgIGdhbWUgPSBuZXcgR2FtZSgpO1xuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmlldy5yZW5kZXJTY29yZShnYW1lLnNjb3JlKTtcbiAgICB2aWV3LnJlbmRlckhpZ2hlclNjb3JlKEdhbWUuaGlnaGVyU2NvcmUpO1xuICAgIHZpZXcucmVuZGVyRmllbGRCYWNrZ3JvdW5kKCk7XG4gICAgdmlldy5yZW5kZXJUaWxlcyhmaWVsZC50aWxlcyk7XG4gICAgdmlldy5yZW5kZXJGaWVsZEdyaWQoKTtcblxuICAgIGlmIChnYW1lLmlzT3ZlciAmJiB2aWV3Lm92ZXJJc09wZW5lZCkge1xuICAgICAgICB2aWV3LnJlbmRlck92ZXIoZ2FtZS5zY29yZSk7XG4gICAgfVxuXG4gICAgaWYgKGdhbWUuaXNXaW4gJiYgdmlldy53aW5Jc09wZW5lZCkge1xuICAgICAgICB2aWV3LnJlbmRlcldpbihnYW1lLnNjb3JlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vdmUoa2V5Q29kZSkge1xuICAgIGlmIChbMzcsIDY1LCAzOCwgODcsIDM5LCA2OCwgNDAsIDgzXS5pbmRleE9mKGtleUNvZGUpID09PSAtMSkgcmV0dXJuIFtmYWxzZSwgMF07XG4gICAgbGV0IGRpcmVjdGlvbiA9ICcnO1xuXG4gICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgICAgY2FzZSA2NTpcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAnbGVmdCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgY2FzZSA4NzpcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAndXAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgIGNhc2UgNjg6XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICBjYXNlIDgzOlxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdkb3duJztcbiAgICAgICAgfVxuXG4gICAgbGV0IFt0aWxlc01vdmVkLCBnb3RTY29yZV0gPSBmaWVsZC5tb3ZlVGlsZXMoZGlyZWN0aW9uKTtcblxuICAgIGlmICghdGlsZXNNb3ZlZCkgcmV0dXJuO1xuXG4gICAgZ2FtZS5wcmV2aW91c1Njb3JlID0gZ2FtZS5zY29yZTtcbiAgICBnYW1lLnNjb3JlICs9IGdvdFNjb3JlO1xuXG4gICAgZmllbGQuZ2VuZXJhdGVOZXdSYW5kb21UaWxlKCk7XG5cbiAgICBpZiAoIWZpZWxkLmhhc0NvbWJpbmF0aW9ucygpKSB7XG4gICAgICAgIGdhbWUub3ZlcigpO1xuICAgICAgICB2aWV3Lm9wZW5PdmVyKCk7XG4gICAgfVxuXG4gICAgaWYgKCFnYW1lLmlzV2luICYmIGZpZWxkLmhhczIwNDhUaWxlKCkpIHtcbiAgICAgICAgZ2FtZS53aW4oKTtcbiAgICAgICAgdmlldy5vcGVuV2luKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB1bmRvKCkge1xuICAgIGlmIChmaWVsZC51bmRvKCkpIHtcbiAgICAgICAgZ2FtZS5zY29yZSA9IGdhbWUucHJldmlvdXNTY29yZTtcbiAgICB9XG5cbiAgICB2aWV3LmNsb3NlV2luKCk7XG4gICAgdmlldy5jbG9zZU92ZXIoKTtcbn1cblxuZnVuY3Rpb24gbmV3R2FtZSgpIHtcbiAgICBnYW1lLm92ZXIoKTtcbiAgICBnYW1lLmluaXQoKTtcbiAgICBmaWVsZC5pbml0KCk7XG4gICAgZmllbGQuZ2VuZXJhdGVOZXdSYW5kb21UaWxlKCk7XG4gICAgZmllbGQuZ2VuZXJhdGVOZXdSYW5kb21UaWxlKCk7XG4gICAgdmlldy5jbG9zZVdpbigpO1xuICAgIHZpZXcuY2xvc2VPdmVyKCk7XG59XG5cbmZ1bmN0aW9uIGNvbnRpbnVlV29uR2FtZSgpIHtcbiAgICB2aWV3LmNsb3NlV2luKCk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlT3ZlcigpIHtcbiAgICB2aWV3LmNsb3NlT3ZlcigpO1xufVxuXG5uZXdHYW1lKCk7XG5cbnNldEludGVydmFsKHJlbmRlciwgNTApO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4gbW92ZShlLmtleUNvZGUpKTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1bmRvJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1bmRvKTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctZ2FtZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbmV3R2FtZSk7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGludWUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbnRpbnVlV29uR2FtZSk7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlT3Zlcik7XG4iXSwic291cmNlUm9vdCI6IiJ9