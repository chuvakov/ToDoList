export default class Task {
	constructor(id, name, status) {
		this.id = id;
		this.name = name;
		this.status = status;

		parent = status == 1 ? '#successTasks' : '#activeTasks';
		$(parent).append(`
            <li class="list-group-item d-flex align-items-center justify-content-between">
                <div>
                    <input class="form-check-input me-1 checkbox" type="checkbox" value="" ${
						status == 1 ? 'checked' : ''
					}/>
                    <span class="taskName">${name}</span> 
                </div>
                <button type="button" class="btn btn-outline-danger removeTask">Удалить</button>
            </li>
        `);
	}
}
