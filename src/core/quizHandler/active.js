import { waitForElement } from "../watcher.js";
import { setEduQuickStatus } from "../../ui/bottombar.js";
import { setEduQuickTitle, setEduQuickContent } from "../../ui/sidebar.js";
import loadTemplate from "../../templates/load.js";
import overviewTemplate from "../../templates/answer-overview.html?raw";
import { isAutoAnswerEnabled, runAutoAnswer } from "./autoAnswer.js";

export default async function handleActiveState({ stored, submitBtn }) {
    const questionNumber = await waitForElement(() =>
        document
            .querySelector("[current-question]")
            ?.getAttribute("current-question")
    );

    const questionText = await waitForElement(
        () => document.querySelector(".question-text .pre-line")?.innerHTML
    );

    const answerContainer = await waitForElement(() =>
        document.querySelector(".answer")
    );

    const textInput = answerContainer.querySelector("input.answer-text");
    const mcqLabels = answerContainer.querySelectorAll("label[role='option']");

    let userAnswer = "";
    if (textInput) {
        userAnswer = textInput.value.trim();
    } else {
        const selected = [...mcqLabels].find(
            (l) =>
                l.getAttribute("aria-pressed") === "true" &&
                l.classList.contains("selected")
        );
        userAnswer =
            selected?.querySelector(".pre-line").innerText.trim() || "";
    }

    const matchingQuestions = Object.values(stored.answers).filter(
        (q) => q.question.trim() === questionText.trim()
    );

    let questionObj;

    if (textInput) {
        const img = document.querySelector(".image-container img")?.src;

        questionObj = matchingQuestions.find((q) => q.image === img);
    } else if (mcqLabels && mcqLabels.length > 1) {
        const mcqAnswers = [...mcqLabels].map((label) =>
            label.querySelector(".pre-line")?.innerText.trim()
        );

        questionObj = matchingQuestions.find((q) =>
            mcqAnswers.includes(q.answer.trim())
        );
    }

    if (!questionObj && matchingQuestions.length === 1) {
        questionObj = matchingQuestions[0];
    }

    setEduQuickStatus("Quiz in progress.");
    setEduQuickTitle("Answer overview");
    setEduQuickContent(
        await loadTemplate(overviewTemplate, {
            NUMBER: questionNumber,
            QUESTION: questionObj.question,
            IMAGE_URL: questionObj.image,
            USER_ANSWER: userAnswer,
            ANSWER: questionObj.answer,
        })
    );

    document.querySelector('[data-role="none"]').classList.add("hidden");
    document.querySelector('[data-role="tick"]').classList.add("hidden");
    document.querySelector('[data-role="cross"]').classList.add("hidden");

    if (userAnswer === "") {
        document.querySelector('[data-role="none"]').classList.remove("hidden");
    } else if (userAnswer === questionObj.answer) {
        document.querySelector('[data-role="tick"]').classList.remove("hidden");

        if (submitBtn) submitBtn.disabled = false;
    } else {
        document
            .querySelector('[data-role="cross"]')
            .classList.remove("hidden");
    }

    if (isAutoAnswerEnabled()) {
        runAutoAnswer({
            userAnswer,
            correctAnswer: questionObj.answer,
            textInput,
            mcqLabels,
            submitBtn,
        });
    }
}
