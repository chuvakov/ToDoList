import { toastSuccess, toastInfo } from './Toast.js';
import Counter from './Counter.js';
import Task from './Task.js';

$(function () {
	let taskCounter = new Counter('taskCounter'),
		activeTaskCounter = new Counter('activeTaskCounter'),
		successTaskCounter = new Counter('successTaskCounter');

	let _tasks = [];

	initTasks();

	function initTasks() {
		let tasks = $.cookie('tasks');

		if (tasks == null) {
			return;
		}

		tasks = JSON.parse(tasks);

		for (let task of tasks) {
			_tasks.push(new Task(task.name, task.isSuccess ? '#successTasks' : '#activeTasks', task.isSuccess));
		}
	}

	$('#addTask').click(function () {
		let taskName = $('#taskName').val();

		if (taskName == '') {
			$('#validationTaskName').text('Поле не заполнено!');
			$('#taskName').addClass('is-invalid');

			return;
		}

		if (_tasks.find((t) => t.name == taskName) != undefined) {
			$('#validationTaskName').text('Такая задача уже добавлена!');
			$('#taskName').addClass('is-invalid');

			return;
		}

		if ($('#taskName').hasClass('is-invalid')) {
			$('#taskName').removeClass('is-invalid');
		}

		let task = new Task(taskName, '#activeTasks');
		_tasks.push(task);

		$.cookie('tasks', JSON.stringify(_tasks));

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

		let taskIndex = _tasks.findIndex((t) => t.name == taskName);
		_tasks.splice(taskIndex, 1);

		$.cookie('tasks', JSON.stringify(_tasks));

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

		let task = _tasks.find((t) => t.name == taskName);
		task.isSuccess = isChecked;

		$.cookie('tasks', JSON.stringify(_tasks));
	});
});
