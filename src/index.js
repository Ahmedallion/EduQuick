import { createSidebar } from "./ui/sidebar.js";
import { createBottomBar } from "./ui/bottombar.js";
import { showEduQuick } from "./ui/ui.js";
import { startEduQuickWatcher } from "./core/watcher.js";
import createModal from "./ui/modal.js";
import { bmVersion } from "../package.json";

function initEduQuick() {
    const script = document.getElementById("eduquick");

    if (location.host == "my.educake.co.uk") {
        if (location.pathname.includes("login")) {
            createModal({
                title: "Login Required",
                content: `<p class="prose">Please login first to use EduQuick.</p>`,
                buttons: [
                    {
                        text: "Ok",
                        class: "purple",
                        onClick: (close) => close(),
                    },
                ],
            });
            script.remove();
            return;
        }
    } else {
        alert("Please navigate to my.educake.co.uk to use EduQuick.");
        script.remove();
        return;
    }

    // Check for updates
    if (script.getAttribute("eduquick-bm-version") !== bmVersion) {
        createModal({
            title: "Update Required",
            content: `
                <p class="prose">
                    The bookmarklet installed on your browser is outdated.
                </p>
                <p class="prose">
                    Please delete and uninstall EduQuick, then redownload the latest bookmarklet to continue.
                </p>
            `,
            buttons: [
                {
                    text: "Reinstall",
                    class: "purple",
                    href: "https://github.com/Ahmedallion/EduQuick/troubleshooting/update-required.md",
                },
            ],
            closeOnBackdrop: false,
            closeOnEscape: false,
            showCloseButton: false,
        });

        script.remove();
        return;
    }

    window.addEventListener(
        "error",
        (error) => {
            if (error.target && error.target.id === "eduquick") {
                createModal({
                    title: "EduQuick Runtime Error",
                    content: `<p class="prose">${error.message || "Unknown error occurred"}</p>`,
                    buttons: [
                        {
                            text: "Close",
                            class: "purple",
                            onClick: (close) => close(),
                        },
                    ],
                });
            }
        },
        true,
    );

    // Init GUI
    createSidebar();
    createBottomBar();
    showEduQuick();

    startEduQuickWatcher();
}

initEduQuick();
