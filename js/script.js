import Canvas from './src/canvas.js';
import Field from './src/field.js';
import View from './src/view.js';
import Game from './src/game.js';

const rows = 4,
    cols = 4;

let canvas = new Canvas(),
    field = new Field(rows, cols),
    view = new View(canvas, rows, cols),
    game = new Game();

function render() {
    view.renderScore(game.score);
    view.renderHigherScore(Game.higherScore);
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
    let [tilesMoved, gotScore] = field.moveTiles(keyCode);

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