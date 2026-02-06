import { showEduQuick, hideEduQuick } from "../ui/ui.js";
import handlePageChange from "./pageHandler.js";
import { cancelCurrentTasks } from "./pageCancellation.js";

// Been updated like a billion times, but it finally does what it should do. I hope.
/**
 * Start watching for page changes and handle them accordingly.
 */
export function startEduQuickWatcher() {
    let lastUrl = location.href;

    function urlChanged() {
        const currentUrl = location.href;
        if (currentUrl === lastUrl) return false;
        lastUrl = currentUrl;
        return true;
    }

    window.addEventListener("popstate", () => {
        if (urlChanged()) {
            cancelCurrentTasks();
            requestAnimationFrame(() => {
                requestAnimationFrame(handlePageChange);
            });
        }
    });

    const pushStateOriginal = history.pushState;
    history.pushState = function (...args) {
        pushStateOriginal.apply(this, args);
        if (urlChanged()) {
            cancelCurrentTasks();
            requestAnimationFrame(() => {
                requestAnimationFrame(handlePageChange);
            });
        }
    };

    document.addEventListener("click", (e) => {
        if (
            (e.target.closest("button") || e.target.closest(".btn")) &&
            !urlChanged()
        ) {
            cancelCurrentTasks();
            requestAnimationFrame(() => {
                requestAnimationFrame(handlePageChange);
            });
        }
    });

    document.addEventListener("input", (e) => {
        const target = e.target;
        if (
            (target.tagName === "INPUT" && target.type === "text") ||
            target.tagName === "TEXTAREA"
        ) {
            cancelCurrentTasks();
            requestAnimationFrame(() => {
                requestAnimationFrame(handlePageChange);
            });
        }
    });

    cancelCurrentTasks();
    handlePageChange();

    const script = document.getElementById("eduquick");
    const visibilityObserver = new MutationObserver(() => {
        script.getAttribute("eduquick-visible") === "true"
            ? showEduQuick()
            : hideEduQuick();
    });
    visibilityObserver.observe(script, { attributes: true });
}

/**
 * Wait for a element using a function that returns it, using MutationObserver.
 * @param {Function} targetFn - function returning the element
 * @returns {Promise<Element>} - resolves when the element exists
 */
export async function waitForElement(targetFn) {
    return new Promise((resolve) => {
        const check = () => {
            const el = targetFn();
            if (el) {
                observer.disconnect();
                resolve(el);
            }
        };

        const observer = new MutationObserver(check);
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });

        check();
    });
}
