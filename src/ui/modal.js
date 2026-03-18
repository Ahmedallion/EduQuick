export default function createModal({
    title = "",
    content = "",
    buttons = [],
    closeOnBackdrop = true,
    closeOnEscape = true,
    showCloseButton = true,
} = {}) {
    // Remove any existing modal to avoid overlapping
    const existingModal = document.getElementById("eduquick-modal");
    if (existingModal) existingModal.remove();

    const modalElement = document.createElement("div");
    modalElement.id = "eduquick-modal";

    modalElement.innerHTML = `
        <div
            id="eduquick-backdrop"
            class="not-print:bg-black/50 not-print:z-100 flex justify-center items-center not-print:h-full not-print:w-full not-print:top-0 not-print:left-0 not-print:fixed"
        >
            <div class="inset-0 z-50 flex items-center justify-center">
                <div
                    id="eduquick-modal-container"
                    class="modal-container flex flex-col min-w-250px max-w-screen max-h-[90vh] md:max-h-screen shadow-xl/20 hc:border rounded"
                    style="width: 400px; translate: 0px;"
                >
                    <!-- Header -->
                    <div
                        id="eduquick-modal-header"
                        class="modal-header w-full rounded-t block-3 border-3 border-page-bg purple"
                    >
                        <div class="text-bold p-2 w-full h-full flex justify-between">
                            <div class="pl-1 font-bold text-button-fg prose ellipsis my-auto">
                                <p id="eduquick-modal-title-text" class="my-auto">${title}</p>
                            </div>

                            ${
                                showCloseButton
                                    ? `<button
                                        id="eduquick-close-btn"
                                        class="btn bg-block-bg-3 hc:border-0 cursor-pointer hoverable p-1"
                                    >
                                        <em class="icon-cross text-base"></em>
                                    </button>`
                                    : ""
                            }
                        </div>
                    </div>

                    <!-- Body -->
                    <div
                        id="eduquick-modal-body"
                        class="modal-body flex-auto p-4 bg-page-bg not-print:overflow-auto h-full w-full"
                    >
                        ${content}
                    </div>

                    <!-- Footer -->
                    <div
                        id="eduquick-modal-footer"
                        class="modal-footer w-full p-4 bg-page-bg rounded-b"
                    >
                        <div class="flex justify-end flex-wrap gap-2">
                            ${buttons
                                .map((button, index) => {
                                    if (button.href) {
                                        return `<a
                                            data-btn="${index}"
                                            class="btn btn-small no-underline ${button.class || ""}"
                                            href="${button.href}"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            ${button.text}
                                        </a>`;
                                    }
                                    return `<button
                                        data-btn="${index}"
                                        class="btn btn-small ${button.class || ""}"
                                    >
                                        ${button.text}
                                    </button>`;
                                })
                                .join("")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modalElement);

    const closeModal = () => {
        document.removeEventListener("keydown", onKeyDown);
        modalElement.remove();
    };

    if (showCloseButton) {
        modalElement.querySelector("#eduquick-close-btn").onclick = closeModal;
    }

    if (closeOnBackdrop) {
        modalElement.querySelector("#eduquick-backdrop").onclick = (event) => {
            if (event.target.id === "eduquick-backdrop") closeModal();
        };
    }

    function onKeyDown(event) {
        if (closeOnEscape && event.key === "Escape") closeModal();
    }
    if (closeOnEscape) {
        document.addEventListener("keydown", onKeyDown);
    }

    buttons.forEach((button, index) => {
        if (!button.href) {
            modalElement.querySelector(`[data-btn="${index}"]`).onclick =
                () => {
                    button.onClick?.(closeModal);
                };
        }
    });

    return { close: closeModal };
}
