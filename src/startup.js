import { createSidebar } from "./ui/sidebar.js";
import { createBottomBar } from "./ui/bottombar.js";
import { applyLayout } from "./ui/layout.js";
import { startEduQuickWatcher } from "./core/watcher.js";
import createModal from "./ui/modal.js";
import { bmVersion } from "../package.json";

export default function initEduQuick() {
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
        (e) => {
            if (e.target && e.target.id === "eduquick") {
                createModal({
                    title: "EduQuick Runtime Error",
                    content: `<p class="prose">${
                        e.message || "Unknown error occurred"
                    }</p>`,
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
        true
    );

    // I have no idea if this one works. If you're reading this then please help!!!!
    window.addEventListener("unhandledrejection", (e) => {
        if (e.reason && e.reason.stack && e.reason.stack.includes("eduquick")) {
            createModal({
                title: "EduQuick Async Error",
                content: `<p class="prose">${
                    e.reason.message || "An async error occurred"
                }</p>`,
                buttons: [
                    {
                        text: "Close",
                        class: "purple",
                        onClick: (close) => close(),
                    },
                ],
            });
            e.preventDefault();
        }
    });

    applyLayout();
    createSidebar();
    createBottomBar();
    startEduQuickWatcher();
}
