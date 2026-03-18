import { setEduQuickStatus } from "../ui/bottombar";
import { setEduQuickTitle, setEduQuickContent } from "../ui/sidebar";
import { handleQuizPage } from "./quizHandler";
import handleQuizResult from "./resultHandler.js";
import loadTemplate from "../templates/load.js";
import howItWorksTemplate from "../templates/how-it-works.html?raw";
import { version } from "../../package.json";
import { handleQuizReload } from "./reload.js";

export default async function handlePageChange() {
    await new Promise(requestAnimationFrame);

    const currentUrl = location.href;

    setEduQuickStatus("Loading…");
    setEduQuickTitle("Please wait");
    setEduQuickContent("<p>Content is loading based on the page...</p>");

    if (new URLSearchParams(window.location.search).has("reload")) {
        return handleQuizReload();
    }

    if (currentUrl.includes("/quiz/")) {
        return handleQuizPage();
    }

    if (currentUrl.includes("/quiz-result/")) {
        return handleQuizResult();
    }

    setEduQuickStatus("No active quizzes.");
    setEduQuickTitle("How it works");
    setEduQuickContent(loadTemplate(howItWorksTemplate, { VERSION: version }));
}
