export function createSidebar() {
    if (document.getElementById("eduquick-sidebar")) return;

    const sidebar = document.createElement("div");
    sidebar.id = "eduquick-sidebar";
    sidebar.className =
        "bg-purple border-purple-30 text-white flex flex-col p-4 pb-0";
    // TODO: use tailwindcss or css, not both
    Object.assign(sidebar.style, {
        position: "fixed",
        top: "0",
        right: "0",
        width: "25%",
        height: "92%",
        zIndex: "99",
        borderLeftWidth: "3px",
    });

    const sidebarTitle = document.createElement("div");
    sidebarTitle.id = "eduquick-sidebar-title";
    sidebarTitle.className =
        "border-b-3 border-purple-30 font-bold text-3xl mb-4";
    sidebar.appendChild(sidebarTitle);

    const sidebarContent = document.createElement("div");
    sidebarContent.id = "eduquick-sidebar-content";
    sidebarContent.className = "flex-1";
    sidebar.appendChild(sidebarContent);

    document.body.appendChild(sidebar);
}

export function setEduQuickTitle(title) {
    const sidebarTitle = document.getElementById("eduquick-sidebar-title");
    if (sidebarTitle) {
        sidebarTitle.textContent = title;
    }
}

export function setEduQuickContent(content) {
    const sidebarContent = document.getElementById("eduquick-sidebar-content");
    if (sidebarContent) {
        sidebarContent.innerHTML = content;
    }
}
