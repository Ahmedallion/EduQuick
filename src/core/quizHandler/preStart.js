import { setEduQuickStatus } from "../../ui/bottombar.js";
import { setEduQuickTitle, setEduQuickContent } from "../../ui/sidebar.js";
import { trackTimer } from "../pageCancellation.js";
import loadTemplate from "../../templates/load.js";
import preStartTemplate from "../../templates/prestart.html?raw";

export default async function handlePreStartState({ startBtn, storedQuiz }) {
    window.location.hash = "";

    startBtn.disabled = true;

    setEduQuickStatus("Fetched all answers.");
    setEduQuickTitle("Before you begin");
    setEduQuickContent(await loadTemplate(preStartTemplate));

    const original = startBtn.textContent.trim();
    let t = 10;

    const timer = setInterval(() => {
        startBtn.textContent = `${original} (${t})`;
        t--;

        if (t < 0) {
            clearInterval(timer);
            startBtn.textContent = original;
            startBtn.disabled = false;
        }
    }, 1000);

    trackTimer(timer);
}
