import { waitForElement } from "../watcher.js";
import { createNewController } from "../pageCancellation.js";
import handleCollectState from "./collect.js";
import handlePreStartState from "./preStart.js";
import handleActiveState from "./active.js";

export default async function handleQuizPage() {
    const signal = createNewController();

    const quizPage = document.getElementById("quiz-top");

    let submitBtn = null;
    let startBtn = null;
    let activeQuiz = false;

    if (quizPage) {
        submitBtn = [...document.querySelectorAll("button")].find(
            (button) => button.textContent.trim() === "Submit",
        );
        submitBtn && (submitBtn.disabled = true);
        activeQuiz = true;
    } else {
        startBtn = await waitForElement(() =>
            [...document.querySelectorAll("button")].find(
                (button) =>
                    button.textContent.trim() === "Begin quiz" ||
                    button.textContent.trim() === "Continue quiz",
            ),
        );
        startBtn.disabled = true;
    }

    const quizId = location.href.match(/quiz\/(\d+)/)?.[1];
    const storedQuiz = JSON.parse(sessionStorage.getItem("eduquickQuiz"));

    if (quizId !== storedQuiz?.quizId) {
        if (quizPage) {
            history.replaceState({}, "", location.pathname + "/reload");
            window.dispatchEvent(new Event("popstate"));
            return;
        } else {
            return handleCollectState({ quizId, signal });
        }
    }

    if (!activeQuiz) {
        return handlePreStartState({ startBtn, storedQuiz });
    }

    return handleActiveState({ storedQuiz, submitBtn });
}
