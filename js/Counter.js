export default class Counter {
	constructor(id) {
		this.$element = $('#' + id);
		this.id = id;
		this.count = $.cookie(id) || 0;

		this.$element.text(this.count);
	}

	increment() {
		this.count++;
		this.$element.text(this.count);

		$.cookie(this.id, this.count);
	}

	decrement() {
		this.count--;
		this.$element.text(this.count);

		$.cookie(this.id, this.count);
	}
}
