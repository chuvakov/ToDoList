import { toastSuccess, toastInfo, toastError } from './Toast.js';
import Counter from './Counter.js';
import Task from './Task.js';

$(function () {
	let taskCounter = new Counter('taskCounter'),
		activeTaskCounter = new Counter('activeTaskCounter'),
		successTaskCounter = new Counter('successTaskCounter'),
		_tasks = [];

	const initCounters = () => {
		axios
			.get('https://localhost:7195/Tasks/GetTaskCounts')
			.then(function (response) {
				const data = response.data;

				taskCounter.count = data.totalCount;
				activeTaskCounter.count = data.activeCount;
				successTaskCounter.count = data.successCount;
			})
			.catch(function (error) {});
	};

	//Инициализация задач
	const initTasks = (status) => {
		axios
			.post('https://localhost:7195/Tasks/GetAll', {
				status: status,
			})
			.then(function (response) {
				_tasks = [];
				initCounters();

				$('#activeTasks').empty();
				$('#successTasks').empty();

				let tasks = response.data;
				for (let task of tasks) {
					_tasks.push(new Task(task.id, task.name, task.status));
				}
			})
			.catch(function (error) {
				// обработка ошибки
				console.log(error);
			});
	};

	initTasks(0);

	//Добавление
	$('#addTask').click(function () {
		let taskName = $('#taskName').val();

		if (taskName == '') {
			$('#validationTaskName').text('Поле не заполнено!');
			$('#taskName').addClass('is-invalid');

			return;
		}

		if ($('#taskName').hasClass('is-invalid')) {
			$('#taskName').removeClass('is-invalid');
		}

		axios
			.post('https://localhost:7195/Tasks/Create', {
				name: taskName,
			})
			.then(function (response) {
				initTasks(0);
				toastInfo(`Задача "${taskName}" успешно добавлена.`);
			})
			.catch(function (error) {
				$('#validationTaskName').text(error.response.data);
				$('#taskName').addClass('is-invalid');
			});
	});

	//Удаление
	$(document).on('click', '.removeTask', function () {
		const taskName = $(this).parent().find('.taskName').text(),
			task = _tasks.find((t) => t.name == taskName);

		axios
			.post('https://localhost:7195/Tasks/Delete', null, {
				params: {
					id: task.id,
				},
			})
			.then(function () {
				if ($('#successTasksContent').hasClass('active')) {
					initTasks(1);
				} else {
					initTasks(0);
				}
				toastInfo(`Задача "${taskName}" успешно удалена.`);
			})
			.catch(function (error) {
				toastError(error.response.data);
			});
	});

	//Обновление
	$(document).on('click', '.checkbox', function () {
		let status = $(this).is(':checked') ? 1 : 0,
			taskName = $(this).parent().parent().find('.taskName').text(),
			task = _tasks.find((t) => t.name == taskName);

		axios
			.post('https://localhost:7195/Tasks/Update', {
				id: task.id,
				status: status,
			})
			.then(function () {
				if (status == 1) {
					toastSuccess(`Задача "${taskName}" перемещена в раздел "Выполненные задачи".`);
					initTasks(0);
				} else {
					toastInfo(`Задача "${taskName}" перемещена в раздел "Активные задачи".`);
					initTasks(1);
				}
			})
			.catch(function (error) {
				toastError(error.response.data);
			});
	});

	//Нажатие по вкладке активных
	$('#activeTasksTab').click(function () {
		initTasks(0);
	});

	//Нажатие по вкладке успешных
	$('#successTasksTab').click(function () {
		initTasks(1);
	});
});
