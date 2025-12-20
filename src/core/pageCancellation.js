export let currentAbortController = null;
export const currentTimers = [];

export function cancelCurrentTasks() {
    if (currentAbortController) currentAbortController.abort();

    currentTimers.forEach(clearInterval);
    currentTimers.length = 0;
}

export function createNewController() {
    currentAbortController = new AbortController();
    return currentAbortController.signal;
}

export function trackTimer(timerId) {
    currentTimers.push(timerId);
}
