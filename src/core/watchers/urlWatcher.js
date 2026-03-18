import { cancelCurrentTasks } from "../pageCancellation.js";
import handlePageChange from "../pageHandler.js";

export function startUrlWatcher() {
    let lastUrl = location.href;

    function hasUrlChanged() {
        const currentUrl = location.href;

        if (currentUrl === lastUrl) {
            return false;
        }

        lastUrl = currentUrl;
        return true;
    }

    function triggerPageChange() {
        cancelCurrentTasks();
        handlePageChange();
    }

    window.addEventListener("popstate", () => {
        if (hasUrlChanged()) {
            triggerPageChange();
        }
    });

    const originalPushState = history.pushState;

    history.pushState = function (...args) {
        originalPushState.apply(this, args);

        if (hasUrlChanged()) {
            triggerPageChange();
        }
    };

    triggerPageChange();
}
