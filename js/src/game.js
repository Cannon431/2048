export default class Game {
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
