import { applyLayout, resetLayout } from "./layout";

export function showEduQuick() {
    const sidebar = document.getElementById("eduquick-sidebar");
    const bottombar = document.getElementById("eduquick-bottombar");

    sidebar.style.visibility = "visible";
    bottombar.style.visibility = "visible";

    applyLayout();
}

export function hideEduQuick() {
    const sidebar = document.getElementById("eduquick-sidebar");
    const bottombar = document.getElementById("eduquick-bottombar");

    sidebar.style.visibility = "hidden";
    bottombar.style.visibility = "hidden";

    resetLayout();
}
