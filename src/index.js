import { createSidebar } from "./ui/sidebar.js";
import { createBottomBar } from "./ui/bottombar.js";
import { applyLayout } from "./ui/layout.js";
import { startEduQuickWatchers } from "./core/watchers";
import createModal from "./ui/modal.js";
import { bmVersion } from "../package.json";

function initEduQuick() {
    const script = document.getElementById("eduquick");
    const targetSite = "https://my.educake.co.uk/";

    if (!location.href.startsWith(targetSite + "my-educake/")) {
        if (location.href.startsWith(targetSite)) {
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
        } else {
            alert("Please navigate to my.educake.co.uk to use EduQuick.");
        }
        script.remove();
        return;
    }

    if (script.getAttribute("eduquick-bm-version") !== bmVersion) {
        createModal({
            title: "Update Required",
            content: `
                <p class="prose">The bookmarklet installed on your browser is outdated.</p>
                <p class="prose">Please delete and uninstall EduQuick, then redownload the latest bookmarklet to continue.</p>
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
        (eventError) => {
            if (eventError.target?.id === "eduquick") {
                createModal({
                    title: "EduQuick Runtime Error",
                    content: `<p class="prose">${eventError.message || "Unknown error occurred"}</p>`,
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

    window.addEventListener("unhandledrejection", (unhandledRejectionEvent) => {
        if (unhandledRejectionEvent.reason?.stack?.includes("eduquick")) {
            createModal({
                title: "EduQuick Async Error",
                content: `<p class="prose">${unhandledRejectionEvent.reason.message || "An async error occurred"}</p>`,
                buttons: [
                    {
                        text: "Close",
                        class: "purple",
                        onClick: (close) => close(),
                    },
                ],
            });
            unhandledRejectionEvent.preventDefault();
        }
    });

    applyLayout();
    createSidebar();
    createBottomBar();
    startEduQuickWatchers();
}

initEduQuick();
