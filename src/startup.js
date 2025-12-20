import { createSidebar } from "./ui/sidebar.js";
import { createBottomBar } from "./ui/bottombar.js";
import { applyLayout } from "./ui/layout.js";
import { startEduQuickWatcher } from "./core/watcher.js";

export default function initEduQuick() {
    const targetSite = "https://my.educake.co.uk/";

    if (!location.href.startsWith(targetSite + "my-educake/")) {
        if (location.href.startsWith(targetSite)) {
            const modal = document.createElement("div");

            modal.id = "eduquick-modal";
            modal.innerHTML = `
                <div class="not-print:bg-black/50 not-print:z-100 flex justify-center items-center not-print:h-full not-print:w-full not-print:top-0 not-print:left-0 not-print:fixed">
                <div class="inset-0 z-50 flex items-center justify-center">
                    <div id="eduquick-modal-container" class="modal-container flex flex-col min-w-250px max-w-screen max-h-[90vh] md:max-h-screen shadow-xl/20 hc:border rounded" style="width: 400px; translate: 0px;">
                    <div id="eduquick-modal-header" class="modal-header w-full rounded-t block-3 border-3 border-page-bg purple">
                        <div class="text-bold p-2 w-full h-full flex my-auto justify-between">
                        <div id="eduquick-modal-title" class="pl-1 font-bold text-button-fg prose ellipsis">
                            <p id="eduquick-modal-title-text" class="my-auto">Login Required</p>
                        </div>
                        <button id="eduquick-close-btn" class="btn bg-block-bg-3 hc:border-0 cursor-pointer hoverable p-1">
                            <em class="icon-cross text-base"></em>
                        </button>
                        </div>
                    </div>
                    <div id="eduquick-modal-body" class="modal-body flex-auto p-4 bg-page-bg not-print:overflow-auto h-full w-full">
                        <p class="prose">Please login first to use EduQuick.</p>
                    </div>
                    <div id="eduquick-modal-footer" class="modal-footer w-full p-4 bg-page-bg rounded-b">
                        <div class="flex justify-end flex-wrap">
                        <button id="eduquick-ok-btn" class="btn btn-small purple ml-2">Ok</button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            `;

            document.body.appendChild(modal);

            document
                .getElementById("eduquick-close-btn")
                .addEventListener("click", () => {
                    document.body.removeChild(modal);
                });

            document
                .getElementById("eduquick-ok-btn")
                .addEventListener("click", () => {
                    document.body.removeChild(modal);
                });

            return;
        } else {
            alert("Please navigate to my.educake.co.uk to use EduQuick.");
            return;
        }
    }

    applyLayout();
    createSidebar();
    createBottomBar();
    startEduQuickWatcher();
}
