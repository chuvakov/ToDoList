export default class Task {
	constructor(name, parent, isSuccess = false) {
		this.name = name;
		this.isSuccess = isSuccess;

		$(parent).append(`
            <li class="list-group-item d-flex align-items-center justify-content-between">
                <div>
                    <input class="form-check-input me-1 checkbox" type="checkbox" value="" ${
						isSuccess ? 'checked' : ''
					}/>
                    <span class="taskName">${name}</span> 
                </div>
                <button type="button" class="btn btn-outline-danger removeTask">Удалить</button>
            </li>
        `);
	}
}
