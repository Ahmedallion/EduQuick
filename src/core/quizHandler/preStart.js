import { setEduQuickStatus } from "../../ui/bottombar.js";
import { setEduQuickTitle, setEduQuickContent } from "../../ui/sidebar.js";
import { trackTimer } from "../pageCancellation.js";

export default function handlePreStartState({ startBtn, stored }) {
    const original = startBtn.innerText.trim();
    let t = 10;

    setEduQuickStatus("Ready to start.");
    setEduQuickTitle("Answer overview");
    setEduQuickContent(stored.answers);

    startBtn.disabled = true;

    const timer = setInterval(() => {
        startBtn.innerText = `${original} (${t})`;
        t--;

        if (t < 0) {
            clearInterval(timer);
            startBtn.innerText = original;
            startBtn.disabled = false;
        }
    }, 1000);

    trackTimer(timer);
}
