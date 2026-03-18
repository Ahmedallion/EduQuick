export function triggerQuizReload() {
    // Redirects to quiz result page to force Educake to send an api request
    const reloadPath = location.pathname
        .replace("/quiz", "/quiz-result")
        .replace("/true", "");

    const url = new URL(location.origin + reloadPath);
    url.searchParams.set("reload", "true");

    history.replaceState({}, "", url.toString());
    window.dispatchEvent(new Event("popstate"));
}

export function handleQuizReload() {
    const restoredPath = location.pathname.replace("/quiz-result", "/quiz");

    const url = new URL(location.origin + restoredPath);
    url.searchParams.delete("reload");

    history.replaceState({}, "", url.toString());
    window.dispatchEvent(new Event("popstate"));
}
