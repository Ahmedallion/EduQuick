import { applyLayout, resetLayout } from "./layout";

export function showEduQuick() {
    const sidebarElement = document.getElementById("eduquick-sidebar");
    const bottomBarElement = document.getElementById("eduquick-bottombar");

    if (sidebarElement) sidebarElement.style.visibility = "visible";
    if (bottomBarElement) bottomBarElement.style.visibility = "visible";

    applyLayout();
}

export function hideEduQuick() {
    const sidebarElement = document.getElementById("eduquick-sidebar");
    const bottomBarElement = document.getElementById("eduquick-bottombar");

    if (sidebarElement) sidebarElement.style.visibility = "hidden";
    if (bottomBarElement) bottomBarElement.style.visibility = "hidden";

    resetLayout();
}
