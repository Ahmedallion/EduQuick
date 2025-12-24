export function createSidebar() {
    if (document.getElementById("eduquick-sidebar")) return;

    const sidebar = document.createElement("div");
    sidebar.id = "eduquick-sidebar";
    sidebar.className =
        "bg-purple border-purple-30 text-white flex flex-col p-4 pb-0";

    Object.assign(sidebar.style, {
        position: "fixed",
        top: "0",
        right: "0",
        width: "25%",
        height: "92%",
        zIndex: "99",
        borderLeftWidth: "3px",
    });

    const title = document.createElement("div");
    title.id = "eduquick-sidebar-title";
    title.className = "border-b-3 border-purple-30 font-bold text-4xl mb-4";

    const content = document.createElement("div");
    content.id = "eduquick-sidebar-content";
    content.className = "flex-1";

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
