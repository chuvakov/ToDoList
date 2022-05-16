export function toastSuccess(message) {
	let toastHtml = `
        <div class="toast-success position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div
                id="success-toast"
                class="toast align-items-center text-white border-0"
                style="background-color: #7EC173;"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div class="d-flex">
                    <div class="toast-body"> <img src="/img/check_circle_white_24dp.svg"> ${message}</div>
                    <button
                        type="button"
                        class="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    ></button>
                </div>
            </div>
        </div>
    `;

	$('.toast-success').remove();
	$('body').append(toastHtml);

	var toastOnPage = document.getElementById('success-toast');
	var toast = new bootstrap.Toast(toastOnPage);
	toast.show();
}

export function toastInfo(message) {
	let toastHtml = `
        <div class="toast-info position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div
                id="info-toast"
                class="toast align-items-center text-white border-0"
                style="background-color: #8B81FF;"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div class="d-flex">
                    <div class="toast-body"> <img src="/img/info_FILL0_wght400_GRAD0_opsz48.svg"> ${message}</div>
                    <button
                        type="button"
                        class="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    ></button>
                </div>
            </div>
        </div>
    `;

	$('.toast-info').remove();
	$('body').append(toastHtml);

	var toastOnPage = document.getElementById('info-toast');
	var toast = new bootstrap.Toast(toastOnPage);
	toast.show();
}

export function toastError(message) {
	let toastHtml = `
        <div class="toast-error position-fixed bottom-0 end-0 p-3" style="z-index: 11">
            <div
                id="error-toast"
                class="toast align-items-center text-white border-0"
                style="background-color: #8B81FF;"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
            >
                <div class="d-flex">
                    <div class="toast-body"> <img src="/img/info_FILL0_wght400_GRAD0_opsz48.svg"> ${message}</div>
                    <button
                        type="button"
                        class="btn-close btn-close-white me-2 m-auto"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                    ></button>
                </div>
            </div>
        </div>
    `;

	$('.toast-error').remove();
	$('body').append(toastHtml);

	var toastOnPage = document.getElementById('error-toast');
	var toast = new bootstrap.Toast(toastOnPage);
	toast.show();
}
