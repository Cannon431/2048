export default class Tile {
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
