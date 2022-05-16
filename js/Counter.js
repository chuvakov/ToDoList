export default class Counter {
	constructor(id) {
		this.$element = $('#' + id);
		this.id = id;
		this._count = 0;

		this.$element.text(this._count);
	}

	set count(value) {
		this._count = value;
		this.$element.text(this._count);
	}
}
