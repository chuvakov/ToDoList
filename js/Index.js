import { toastSuccess, toastInfo } from './Toast.js';
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
                    <span class="taskName">${taskName}</span> 
                </div>
                <button type="button" class="btn btn-outline-danger removeTask">Удалить</button>
            </li>
        `);

		taskCounter.increment();
		activeTaskCounter.increment();

		toastInfo(`Задача "${taskName}" успешно добавлена.`);
	});

	$(document).on('click', '.removeTask', function () {
		let $task = $(this).parent(),
			taskName = $task.find('.taskName').text();

		$task.remove();
		taskCounter.decrement();

		let isChecked = $(this).parent().find('.checkbox').is(':checked');

		if (isChecked) {
			successTaskCounter.decrement();
		} else {
			activeTaskCounter.decrement();
		}

		toastInfo(`Задача "${taskName}" успешно удалена.`);
	});

	$(document).on('click', '.checkbox', function () {
		let isChecked = $(this).is(':checked'),
			$task = $(this).parent().parent(),
			taskName = $task.find('.taskName').text();

		if (isChecked) {
			successTaskCounter.increment();
			activeTaskCounter.decrement();

			$('#successTasks').append($task);
			toastSuccess(`Задача "${taskName}" перемещена в раздел "Выполненные задачи".`);
		} else {
			successTaskCounter.decrement();
			activeTaskCounter.increment();

			$('#activeTasks').append($task);
			toastInfo(`Задача "${taskName}" перемещена в раздел "Активные задачи".`);
		}
	});
});
