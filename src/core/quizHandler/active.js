import { waitForElement } from "../watcher.js";
import { setEduQuickStatus } from "../../ui/bottombar.js";
import { setEduQuickTitle, setEduQuickContent } from "../../ui/sidebar.js";
import loadTemplate from "../../templates/load.js";
import overviewTemplate from "../../templates/answer-overview.html?raw";
import { isAutoAnswerEnabled, runAutoAnswer } from "./autoAnswer.js";
import createModal from "../../ui/modal.js";

export default async function handleActiveState({ stored, submitBtn }) {
    const questionNumber = Number(
        (
            await waitForElement(() =>
                [...document.querySelectorAll("span")].find(
                    (s) => s.textContent.trim() === "Question"
                )
            )
        ).nextSibling.textContent
            .split("of")[0]
            .trim()
    );

    const questionText = await waitForElement(
        () => document.querySelector(".question-text")?.textContent
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
            (choice) => choice.getAttribute("aria-pressed") === "true"
        );
        userAnswer = selected?.getAttribute("aria-label").trim() || "";
    }

    const normalise = (question) => {
        const el = document.createElement("div");
        el.innerHTML = question;

        return el.textContent.replace(/\s+/g, " ").trim();
    };

    const matchingQuestions = Object.values(stored.answers).filter(
        (q) => normalise(q.question) === normalise(questionText)
    );

    let questionObj;

    if (textInput) {
        const img = document.querySelector(".image-container img")?.src;

        questionObj = matchingQuestions.find((q) => q.image === img);
    } else if (mcqLabels && mcqLabels.length > 1) {
        const mcqAnswers = [...mcqLabels].map((choice) =>
            choice.getAttribute("aria-label").trim()
        );

        questionObj = matchingQuestions.find((q) =>
            mcqAnswers.includes(q.answer.trim())
        );
    }

    if (!questionObj && matchingQuestions.length === 1) {
        questionObj = matchingQuestions[0];
    }

    if (!questionObj) {
        setEduQuickStatus("Error [EQ-001]");

        const existingModal = document.getElementById("eduquick-modal");

        if (existingModal?.hidden === true) {
            return;
        }

        createModal({
            title: "Error [EQ-001]",
            content: `
                <p class="prose">EduQuick had an issue with reading and finding this question for you.</p>
                <p class="prose">This could be because of how Educake formats it or the question type may not be supported. It turns out Educake has a few more question types than I had ever realized.</p>
                <p class="prose">However, this is a <strong>known issue</strong>.</p>
                <p class="prose">If you want, you can <a href="https://github.com/Ahmedallion/EduQuick/docs/known-issues/EQ-001.md" target="_blank" rel="noopener noreferrer">create an issue</a> with these details.</p>
            `,
            buttons: [
                {
                    text: "Copy Details",
                    onClick: () => {
                        const details = {
                            questionText: questionText || "",
                            stored: stored || {},
                        };
                        navigator.clipboard.writeText(
                            JSON.stringify(details, null, 2)
                        );
                    },
                },
                {
                    text: "Ok",
                    class: "purple",
                    onClick: (close) => close(),
                },
            ],
            hideInsteadOfRemove: true,
        });

        return;
    }

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
        correctAnswer: questionObj.answer,
        textInput,
        mcqLabels,
        submitBtn,
    });
}
