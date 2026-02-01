import { waitForElement } from "../watcher.js";
import { setEduQuickStatus } from "../../ui/bottombar.js";
import { setEduQuickTitle, setEduQuickContent } from "../../ui/sidebar.js";
import loadTemplate from "../../templates/load.js";
import overviewTemplate from "../../templates/answer-overview.html?raw";
import { isAutoAnswerEnabled, runAutoAnswer } from "./autoAnswer.js";
import createModal from "../../ui/modal.js";

export default async function handleActiveState({ storedQuiz, submitBtn }) {
    const questionNumber = Number(
        (
            await waitForElement(() =>
                [...document.querySelectorAll("span")].find(
                    (s) => s.textContent.trim() === "Question",
                ),
            )
        ).nextSibling.textContent
            .split("of")[0]
            .trim(),
    );

    const questionData = storedQuiz.questions[questionNumber];

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
        const selected = [...mcqLabels].find(
            (choice) => choice.getAttribute("aria-pressed") === "true",
        );

        userAnswer = selected?.getAttribute("aria-label").trim() || "";
    }

    setEduQuickTitle("Answer overview");
    setEduQuickContent(
        await loadTemplate(overviewTemplate, {
            NUMBER: questionNumber,
            QUESTION: questionData.question,
            IMAGE_URL: questionData.image,
            USER_ANSWER: userAnswer,
            ANSWER: questionData.answer,
        }),
    );

    if (userAnswer === "") {
        document.querySelector('[data-role="none"]').classList.remove("hidden");
    } else if (userAnswer === questionData.answer) {
        document.querySelector('[data-role="tick"]').classList.remove("hidden");

        if (submitBtn) submitBtn.disabled = false;
    } else {
        document
            .querySelector('[data-role="cross"]')
            .classList.remove("hidden");
    }

    const autoAnswerBtn = document.getElementById("auto-answer-btn");

    autoAnswerBtn.onclick = () => {
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
                        Teachers can view the amount of time it takes you to complete a question. Use auto-answer responsibly - it depends on your teacher's monitoring.
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
