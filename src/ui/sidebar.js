export function createSidebar() {
    if (document.getElementById("eduquick-sidebar")) return;

    const sidebarElement = document.createElement("div");
    sidebarElement.id = "eduquick-sidebar";
    sidebarElement.className =
        "bg-purple border-purple-30 text-white flex flex-col p-4 pb-0";

    Object.assign(sidebarElement.style, {
        position: "fixed",
        top: "0",
        right: "0",
        width: "25%",
        height: "92%",
        zIndex: "99",
        borderLeftWidth: "3px",
    });

    const titleElement = document.createElement("div");
    titleElement.id = "eduquick-sidebar-title";
    titleElement.className =
        "border-b-3 border-purple-30 font-bold text-3xl mb-4";

    const contentElement = document.createElement("div");
    contentElement.id = "eduquick-sidebar-content";
    contentElement.className = "flex-1";

    sidebarElement.appendChild(titleElement);
    sidebarElement.appendChild(contentElement);
    document.body.appendChild(sidebarElement);
}

/**
 * Set the sidebar title text
 * @param {string} text - Title text to display
 */
export function setEduQuickTitle(text = "") {
    const titleElement = document.getElementById("eduquick-sidebar-title");
    if (titleElement) {
        titleElement.textContent = text;
    }
}

/**
 * Set the sidebar content HTML
 * @param {string} content - HTML content to insert
 */
export function setEduQuickContent(content = "") {
    const contentElement = document.getElementById("eduquick-sidebar-content");
    if (contentElement) {
        contentElement.innerHTML = content;
    }
}
