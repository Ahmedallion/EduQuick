import logoUrl from "../assets/eduquick-logo.png";

export function createBottomBar() {
    if (document.getElementById("eduquick-bottombar")) return;

    const bottomBar = document.createElement("div");
    bottomBar.id = "eduquick-bottombar";
    bottomBar.className =
        "bg-purple border-t-3 border-purple-30 text-white flex";

    Object.assign(bottomBar.style, {
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
        height: "8%",
        zIndex: "99",
        padding: "0 10px",
    });

    const leftSection = document.createElement("div");
    leftSection.className = "flex-1 flex items-center justify-start";

    const logoLink = document.createElement("a");
    logoLink.href = "https://github.com/Ahmedallion/EduQuick";
    logoLink.target = "_blank";
    logoLink.rel = "noopener noreferrer";
    logoLink.className = "flex items-center h-full";

    const logoImage = document.createElement("img");
    logoImage.src = logoUrl;
    logoImage.alt = "EduQuick";
    logoImage.style.height = "80%";

    logoLink.appendChild(logoImage);
    leftSection.appendChild(logoLink);

    const middleSection = document.createElement("div");
    middleSection.className = "flex-1 flex items-center justify-center";
    middleSection.id = "eduquick-status";

    const rightSection = document.createElement("div");
    rightSection.className = "flex-1 flex items-center justify-end";
    rightSection.innerHTML =
        '&copy;&nbsp;2026&nbsp;<a href="https://github.com/Ahmedallion" class="underline" target="_blank">Ahmedallion</a>.&nbsp;Not affiliated with Educake Ltd.';

    bottomBar.appendChild(leftSection);
    bottomBar.appendChild(middleSection);
    bottomBar.appendChild(rightSection);
    document.body.appendChild(bottomBar);
}

export function setEduQuickStatus(text = "") {
    const statusElement = document.getElementById("eduquick-status");
    if (statusElement) {
        statusElement.textContent = text;
    }
}
