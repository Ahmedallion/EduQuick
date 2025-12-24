import logoUrl from "../assets/eduquick-logo.png";

export function createBottomBar() {
    if (document.getElementById("eduquick-bottombar")) return;

    const bottombar = document.createElement("div");
    bottombar.id = "eduquick-bottombar";
    bottombar.className =
        "bg-purple border-t-3 border-purple-30 text-white flex";

    Object.assign(bottombar.style, {
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        height: "8%",
        zIndex: "99",
        padding: "0 10px",
    });

    const left = document.createElement("div");
    left.className = "flex-1 flex items-center justify-start";

    const logoLink = document.createElement("a");
    logoLink.href = "https://github.com/Ahmedallion/EduQuick";
    logoLink.target = "_blank";
    logoLink.rel = "noopener noreferrer";
    logoLink.className = "flex items-center h-full";

    const logoImg = document.createElement("img");
    logoImg.src = logoUrl;
    logoImg.alt = "EduQuick";
    logoImg.style.height = "80%";

    logoLink.appendChild(logoImg);
    left.appendChild(logoLink);

    const middle = document.createElement("div");
    middle.className = "flex-1 flex items-center justify-center";
    middle.id = "eduquick-status";

    const right = document.createElement("div");
    right.className = "flex-1 flex items-center justify-end";
    right.innerHTML =
        '&copy;&nbsp;2025&nbsp;<a href="https://github.com/Ahmedallion" class="underline" target="_blank">Ahmedallion</a>.&nbsp;Not affiliated with Educake Ltd.';

    bottombar.appendChild(left);
    bottombar.appendChild(middle);
    bottombar.appendChild(right);
    document.body.appendChild(bottombar);
}

export function setEduQuickStatus(text) {
    const statusEl = document.getElementById("eduquick-status");
    if (statusEl) {
        statusEl.textContent = text;
    }
}
