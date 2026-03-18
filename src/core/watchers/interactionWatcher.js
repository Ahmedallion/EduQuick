import { cancelCurrentTasks } from "../pageCancellation.js";
import handlePageChange from "../pageHandler.js";

export function startInteractionWatcher() {
    document.addEventListener("click", (e) => {
        if (e.target.closest("button") || e.target.closest(".btn")) {
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

    // Enter key on quiz page only
    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && document.getElementById("quiz-top")) {
            cancelCurrentTasks();
            requestAnimationFrame(() => {
                requestAnimationFrame(handlePageChange);
            });
        }
    });
}
