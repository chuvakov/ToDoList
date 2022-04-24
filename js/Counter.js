export default class Counter {
	constructor(id) {
		this.$element = $('#' + id);
		this.count = 0;
	}

	increment() {
		this.count++;
		this.$element.text(this.count);
	}

	decrement() {
		this.count--;
		this.$element.text(this.count);
	}
}
