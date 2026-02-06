import { setEduQuickStatus } from "../ui/bottombar";
import { setEduQuickTitle, setEduQuickContent } from "../ui/sidebar";
import handleQuizPage from "./quizHandler/index.js";
import handleQuizResult from "./resultHandler.js";
import loadTemplate from "../templates/load.js";
import howItWorksTemplate from "../templates/how-it-works.html?raw";
import { version } from "../../package.json";

export default async function handlePageChange() {
    const url = location.href;

    setEduQuickStatus("Loading…");
    setEduQuickTitle("Please wait");
    setEduQuickContent("<p>Content is loading based on the page...</p>");

    if (url.includes("/reload")) {
        const newPath = location.pathname.replace(/(\/true)?\/reload$/, "");
        history.replaceState({}, "", newPath);
        window.dispatchEvent(new Event("popstate"));
        return;
    }

    if (url.includes("/quiz/")) {
        return handleQuizPage();
    }

    if (url.includes("/quiz-result/")) {
        return handleQuizResult();
    }

    setEduQuickStatus("No active quizzes.");
    setEduQuickTitle("How it works");
    setEduQuickContent(loadTemplate(howItWorksTemplate, { VERSION: version }));
}
