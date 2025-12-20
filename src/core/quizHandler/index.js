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
            (b) => b.innerText.trim() === "Submit"
        );
        submitBtn && (submitBtn.disabled = true);
        activeQuiz = true;
    } else {
        startBtn = await waitForElement(() =>
            [...document.querySelectorAll("button")].find(
                (b) =>
                    b.innerText.trim() === "Begin quiz" ||
                    b.innerText.trim() === "Continue quiz"
            )
        );
        startBtn.disabled = true;
    }

    const quizId = location.href.match(/quiz\/(\d+)/)?.[1];
    const stored = JSON.parse(sessionStorage.getItem("EduQuickQuizData"));

    if (quizId !== stored?.quizId) {
        return handleCollectState({ quizId, signal });
    }

    if (!activeQuiz) {
        return handlePreStartState({ startBtn, stored });
    }

    return handleActiveState({ stored, submitBtn });
}
