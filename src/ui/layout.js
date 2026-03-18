export function applyLayout() {
    document.body.style.marginRight = "25%"; // Reserve space for sidebar
    document.body.style.marginBottom = "8%"; // Reserve space for bottom bar
}

export function resetLayout() {
    document.body.style.marginRight = "";
    document.body.style.marginBottom = "";
}
