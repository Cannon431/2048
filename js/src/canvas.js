export default class Canvas {
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
