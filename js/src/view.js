export default class View {
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
