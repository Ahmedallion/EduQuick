import { getQuizRequest } from "../watchers/apiWatcher.js";
import { waitForElement } from "../watchers/elementWatcher.js";
import { createNewController } from "../pageCancellation.js";

import handleCollectState from "./collect.js";
import handlePreStartState from "./preStart.js";
import handleActiveState from "./active.js";
import { setEduQuickStatus } from "../../ui/bottombar";
import { triggerQuizReload } from "../reload.js";

export async function handleQuizPage() {
    const abortSignal = createNewController();

    // If present, we're on the quiz page. If not, we're on the pre-start page.
    const quizPageElement = document.getElementById("quiz-top");

    let submitBtn = null;
    let startBtn = null;

    if (quizPageElement) {
        submitBtn = [...document.querySelectorAll("button")].find(
            (button) => button.textContent.trim() === "Submit",
        );
        if (submitBtn) submitBtn.disabled = true;
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

    const quizId = Number(location.href.match(/quiz\/(\d+)/)?.[1]);

    // Educake randomises quiz order per request
    const quizRequest = await getQuizRequest(quizId);

    const storedQuiz = JSON.parse(sessionStorage.getItem("eduquickQuiz"));

    if (!quizRequest || !storedQuiz) {
        if (quizRequest && !storedQuiz && !quizPageElement) {
            return handleCollectState({
                quizId,
                quizRequest,
                signal: abortSignal,
            });
        }

        return triggerQuizReload();
    }

    const originMatches = quizRequest.origin === storedQuiz.quizOrigin;
    const orderMatches =
        quizRequest.questions.join(",") === storedQuiz.questionOrder.join(",");

    if (!originMatches) {
        if (quizPageElement) {
            return triggerQuizReload();
        } else {
            return handleCollectState({
                quizId,
                quizRequest,
                signal: abortSignal,
            });
        }
    }

    if (!orderMatches) {
        setEduQuickStatus("Reordering questions...");

        const unansweredCount =
            quizRequest.questionCount - quizRequest.answerCount;

        const updatedQuiz = {
            ...storedQuiz,
            quizId,
            questionOrder: quizRequest.questions,
            unansweredCount,
        };

        sessionStorage.setItem("eduquickQuiz", JSON.stringify(updatedQuiz));
    }

    // Quiz fully matches
    if (quizPageElement) {
        return handleActiveState({ storedQuiz, submitBtn });
    } else {
        return handlePreStartState(startBtn);
    }
}
