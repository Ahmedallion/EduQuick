import { setEduQuickStatus } from "../../ui/bottombar.js";
import { setEduQuickTitle, setEduQuickContent } from "../../ui/sidebar.js";
import { trackTimer } from "../pageCancellation.js";
import loadTemplate from "../../templates/load.js";
import preStartTemplate from "../../templates/prestart.html?raw";

export default async function handlePreStartState(startBtn = null) {
    // Reset any auto-answer state
    window.location.hash = "";

    startBtn.disabled = true;

    setEduQuickStatus("Fetched all answers.");
    setEduQuickTitle("Before you begin");
    setEduQuickContent(loadTemplate(preStartTemplate));

    const originalButtonText = startBtn.textContent.trim();
    let countdown = 10;

    const timerId = setInterval(() => {
        startBtn.textContent = `${originalButtonText} (${countdown})`;
        countdown--;

        if (countdown < 0) {
            clearInterval(timerId);
            startBtn.textContent = originalButtonText;
            startBtn.disabled = false;
        }
    }, 1000);

    trackTimer(timerId);
}
