import Counter from './Counter.js';

$(function () {
	let taskCounter = new Counter('taskCounter'),
		activeTaskCounter = new Counter('activeTaskCounter'),
		successTaskCounter = new Counter('successTaskCounter');

	$('#addTask').click(function () {
		let taskName = $('#taskName').val();
		if (taskName == '') {
			$('#taskName').addClass('is-invalid');
			return;
		}

		if ($('#taskName').hasClass('is-invalid')) {
			$('#taskName').removeClass('is-invalid');
		}

		$('#activeTasks').append(`
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

	$(document).on('click', '.removeTask', function () {
		$(this).parent().remove();

		taskCounter.decrement();

		let isChecked = $(this).parent().find('.checkbox').is(':checked');

		if (isChecked) {
			successTaskCounter.decrement();
		} else {
			activeTaskCounter.decrement();
		}
	});

	$(document).on('click', '.checkbox', function () {
		let isChecked = $(this).is(':checked');
		let $task = $(this).parent().parent();

		if (isChecked) {
			successTaskCounter.increment();
			activeTaskCounter.decrement();

			$('#successTasks').append($task);
		} else {
			successTaskCounter.decrement();
			activeTaskCounter.increment();

			$('#activeTasks').append($task);
		}
	});
});
