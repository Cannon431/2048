import Canvas from './classes/Canvas';
import Field from './classes/Field';
import View from './classes/View';
import Game from './classes/Game';

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
