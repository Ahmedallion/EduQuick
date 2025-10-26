export function createSidebar() {
    if (document.getElementById("eduquick-sidebar")) return;

    const sidebar = document.createElement("div");
    sidebar.id = "eduquick-sidebar";
    sidebar.className =
        "bg-purple border-purple-30 text-white flex flex-col p-4";

    Object.assign(sidebar.style, {
        position: "fixed",
        top: "0",
        right: "0",
        width: "25%",
        height: "100%",
        zIndex: "9999",
        borderLeftWidth: "3px",
    });

    const title = document.createElement("div");
    title.id = "eduquick-sidebar-title";
    title.className = "font-bold text-4xl mb-8";

    const content = document.createElement("div");
    content.id = "eduquick-sidebar-content";
    content.className = "flex-1 overflow-auto";

    sidebar.appendChild(title);
    sidebar.appendChild(content);
    document.body.appendChild(sidebar);
}

export function setEduQuickTitle(text) {
    const titleEl = document.getElementById("eduquick-sidebar-title");
    if (titleEl) {
        titleEl.textContent = text;
    }
}

export function setEduQuickContent(content) {
    const contentEl = document.getElementById("eduquick-sidebar-content");
    if (contentEl) {
        contentEl.innerHTML = content;
    }
}
