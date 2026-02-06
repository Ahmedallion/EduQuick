export function showEduQuick() {
    const sidebar = document.getElementById("eduquick-sidebar");
    const bottombar = document.getElementById("eduquick-bottombar");

    sidebar.style.visibility = "visible";
    bottombar.style.visibility = "visible";

    document.body.style.marginRight = "25%";
    document.body.style.marginBottom = "8%";
}

export function hideEduQuick() {
    const sidebar = document.getElementById("eduquick-sidebar");
    const bottombar = document.getElementById("eduquick-bottombar");

    sidebar.style.visibility = "hidden";
    bottombar.style.visibility = "hidden";

    document.body.style.marginRight = "";
    document.body.style.marginBottom = "";
}
