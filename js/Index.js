import Counter from './Counter.js';

$(function () {
	let taskCounter = new Counter('taskCounter'),
		activeTaskCounter = new Counter('activeTaskCounter'),
		successTaskCounter = new Counter('successTaskCounter');

	$('#addTask').click(function () {
		let taskName = $('#taskName').val();

		$('#tasks').append(`
            <li class="list-group-item d-flex align-items-center justify-content-between">
                <div>
                    <input class="form-check-input me-1 checkbox" type="checkbox" value="" aria-label="..." />
                    ${taskName}
                </div>
                <button type="button" class="btn btn-outline-danger removeTask">Удалить</button>
            </li>
        `);

		taskCounter.increment();
		activeTaskCounter.increment();
	});

	$('#tasks').on('click', '.removeTask', function () {
		$(this).parent().remove();

		taskCounter.decrement();

		let isChecked = $(this).parent().find('.checkbox').is(':checked');

		if (isChecked) {
			successTaskCounter.decrement();
		} else {
			activeTaskCounter.decrement();
		}
	});

	$('#tasks').on('click', '.checkbox', function () {
		let isChecked = $(this).is(':checked');

		if (isChecked) {
			successTaskCounter.increment();
			activeTaskCounter.decrement();
		} else {
			successTaskCounter.decrement();
			activeTaskCounter.increment();
		}
	});
});
