import { waitForElement } from "../watchers/elementWatcher.js";
import { setEduQuickStatus } from "../../ui/bottombar.js";
import { setEduQuickTitle, setEduQuickContent } from "../../ui/sidebar.js";
import loadTemplate from "../../templates/load.js";
import overviewTemplate from "../../templates/answer-overview.html?raw";
import { isAutoAnswerEnabled, runAutoAnswer } from "./autoAnswer.js";
import createModal from "../../ui/modal.js";

export default async function handleActiveState({
    storedQuiz,
    submitBtn,
} = {}) {
    const questionSpan = await waitForElement(() =>
        [...document.querySelectorAll("span")].find(
            (span) => span.textContent.trim() === "Question",
        ),
    );
    const questionNumber = Number(
        questionSpan.nextSibling.textContent.split("of")[0].trim(),
    );

    const questionId = storedQuiz.questionOrder[questionNumber - 1];
    const questionData = storedQuiz.questions[questionId];

    const answerContainer = await waitForElement(() =>
        document.querySelector(".answer"),
    );

    const textInput = answerContainer.querySelector("input.answer-text");
    const mcqLabels = answerContainer.querySelectorAll("label[role='option']");

    let userAnswer = "";

    if (
        questionData.type === "text" ||
        questionData.type === "unlimited" ||
        questionData.type === "number"
    ) {
        userAnswer = textInput.value.trim();
    } else if (questionData.type === "multiple") {
        const selectedOption = [...mcqLabels].find(
            (choice) => choice.getAttribute("aria-pressed") === "true",
        );

        if (selectedOption) {
            userAnswer = selectedOption.getAttribute("aria-label").trim();
        }
    }

    setEduQuickTitle("Answer overview");
    setEduQuickContent(
        loadTemplate(overviewTemplate, {
            NUMBER: questionNumber,
            QUESTION: questionData.question,
            IMAGE_URL: questionData.image,
            USER_ANSWER: userAnswer,
            ANSWER: questionData.answer,
        }),
    );

    const noneEl = document.querySelector('[data-role="none"]');
    const tickEl = document.querySelector('[data-role="tick"]');
    const crossEl = document.querySelector('[data-role="cross"]');

    if (userAnswer === "") {
        if (noneEl) noneEl.classList.remove("hidden");
    } else if (userAnswer.toLowerCase() === questionData.answer.toLowerCase()) {
        if (tickEl) tickEl.classList.remove("hidden");

        if (submitBtn) {
            submitBtn.disabled = false;
        }
    } else {
        if (crossEl) crossEl.classList.remove("hidden");
    }

    const autoAnswerButton = document.getElementById("auto-answer-btn");
    autoAnswerButton.onclick = () => {
        if (isAutoAnswerEnabled()) {
            window.location.hash = "";
        } else {
            createModal({
                title: "Enable Auto-Answer",
                content: `
                    <p class="prose">
                        Are you sure you want to enable auto-answer?
                    </p>
                    <p class="prose">
                        Teachers can view the amount of time it takes you to complete a question. 
                        Use auto-answer responsibly - it depends on your teacher's monitoring.
                    </p>
                `,
                buttons: [
                    {
                        text: "Cancel",
                        onClick: (close) => close(),
                    },
                    {
                        text: "Enable",
                        class: "purple",
                        onClick: (close) => {
                            window.location.hash = "#auto-answer";
                            close();
                        },
                    },
                ],
            });
        }
    };

    if (!isAutoAnswerEnabled()) {
        setEduQuickStatus("Quiz in progress.");
        return;
    }

    setEduQuickStatus("Auto-answering...");

    runAutoAnswer({
        userAnswer,
        correctAnswer: questionData.answer,
        textInput,
        mcqLabels,
        submitBtn,
    });
}
