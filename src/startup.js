import { createSidebar } from "./ui/sidebar.js";
import { createBottomBar } from "./ui/bottombar.js";
import { adjustLayout } from "./ui/layout.js";
import { startEduQuickWatcher } from "./watcher.js";

export function initEduQuick() {
    const target = "https://my.educake.co.uk/my-educake/";

    if (!location.href.startsWith(target)) {
        location.href = target;
        return;
    }

    if (document.getElementById("eduquick-sidebar")) {
        removeEduQuick();
        return;
    }

    createSidebar();
    createBottomBar();
    adjustLayout();
    startEduQuickWatcher();
}

export function removeEduQuick() {
    const sidebar = document.getElementById("eduquick-sidebar");
    const bottombar = document.getElementById("eduquick-bottombar");
    if (sidebar) sidebar.remove();
    if (bottombar) bottombar.remove();

    document.body.style.marginRight = "";
    document.body.style.marginBottom = "";
}
