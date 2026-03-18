import { triggerQuizReload } from "../reload.js";

let lastQuizResponse = null;
let lastReloadId = null;
let resolvePromise = null; // Used to trigger the 'get' instantly

export async function getQuizRequest(quizId) {
    const findId = () => {
        try {
            const data = JSON.parse(lastQuizResponse);
            return data?.attempt?.[quizId] || null;
        } catch {
            return null;
        }
    };

    const existing = findId();
    if (existing) return existing;

    if (lastQuizResponse === null && lastReloadId !== quizId) {
        lastReloadId = quizId;
        triggerQuizReload();
        return null;
    }

    return new Promise((resolve) => {
        resolvePromise = () => {
            const result = findId();
            if (result) {
                resolve(result);
                resolvePromise = null;
            }
        };
    });
}

export function startApiWatcher() {
    const originalOpen = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (method, url) {
        if (url.includes("/api/student/quiz")) {
            this.addEventListener("load", function () {
                lastQuizResponse = this.response;

                // INSTANT TRIGGER: If a getter is waiting
                if (resolvePromise) {
                    resolvePromise();
                }
            });
        }
        return originalOpen.apply(this, arguments);
    };
}
