/**
 * Waits for an element to exist in the DOM.
 * @param {Function} targetFn - Function that returns the desired element
 * @returns {Promise<Element>} Resolves when the element is found
 */
export function waitForElement(targetFn) {
    return new Promise((resolve) => {
        const observer = new MutationObserver(() => {
            const element = targetFn();

            if (element) {
                observer.disconnect();
                resolve(element);
            }
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
        });

        const element = targetFn();
        if (element) {
            observer.disconnect();
            resolve(element);
        }
    });
}
