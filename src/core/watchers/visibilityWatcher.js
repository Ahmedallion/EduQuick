import { showEduQuick, hideEduQuick } from "../../ui/display.js";

export function startVisibilityWatcher() {
    const script = document.getElementById("eduquick");

    const observer = new MutationObserver(() => {
        const isVisible = script.getAttribute("eduquick-visible") === "true";

        if (isVisible) {
            showEduQuick();
        } else {
            hideEduQuick();
        }
    });

    observer.observe(script, {
        attributes: true,
        attributeFilter: ["eduquick-visible"],
    });
}
