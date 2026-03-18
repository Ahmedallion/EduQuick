import { setEduQuickStatus } from "../../ui/bottombar.js";
import { setEduQuickTitle, setEduQuickContent } from "../../ui/sidebar.js";
import loadTemplate from "../../templates/load.js";
import collectingTemplate from "../../templates/collecting-answers.html?raw";
import handlePageChange from "../pageHandler.js";

export default async function handleCollectState({
    quizId,
    quizRequest,
    signal,
} = {}) {
    setEduQuickStatus("Fetching quiz...");
    setEduQuickTitle("Collecting Answers");
    setEduQuickContent(
        loadTemplate(collectingTemplate, {
            NUMBER: "?",
            QUESTION: "Loading question...",
            IMAGE_URL: "",
            ANSWER: "",
        }),
    );
    const noneEl = document.querySelector('[data-role="none"]');
    if (noneEl) noneEl.classList.remove("hidden");

    const unansweredCount = quizRequest.questionCount - quizRequest.answerCount;

    const questionOrder = quizRequest.questions;
    const questionMap = quizRequest.questionMap;

    const quiz = {
        quizId,
        quizOrigin: quizRequest.origin,
        unansweredCount,
        questionOrder,
        questions: {},
    };

    for (let index = 0; index < questionOrder.length; index++) {
        const questionId = questionOrder[index];
        const questionData = questionMap[questionId];

        quiz.questions[questionId] = {
            id: questionData.id,
            question: questionData.question,
            image: questionData.image || "",
            type: questionData.type,
            answer: null,
        };
    }

    const authToken = sessionStorage.getItem("token");
    const xsrfToken = decodeURIComponent(
        document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || "",
    );

    const fetchAnswer = async (questionId, retries = 3) => {
        for (let attemptNumber = 0; attemptNumber < retries; attemptNumber++) {
            const response = await fetch(
                `https://my.educake.co.uk/api/course/variant/${questionId}/mark`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json;version=2",
                        Authorization: `Bearer ${authToken}`,
                        "X-XSRF-TOKEN": xsrfToken,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ givenAnswer: "1" }),
                    signal,
                },
            );

            if (response.ok) {
                const responseData = await response.json();
                return responseData.answer.correctAnswers?.[0] ?? null;
            }
        }
        return null;
    };

    for (let index = 0; index < quiz.questionOrder.length; index++) {
        const questionId = quiz.questionOrder[index];
        const questionNumber = index + 1;
        const questionData = quiz.questions[questionId];

        setEduQuickStatus(`Fetching question ${questionNumber}...`);

        questionData.answer = await fetchAnswer(questionData.id);

        setEduQuickContent(
            loadTemplate(collectingTemplate, {
                NUMBER: questionNumber,
                QUESTION: questionData.question,
                IMAGE_URL: questionData.image,
                ANSWER: questionData.answer || "",
            }),
        );

        const tickEl = document.querySelector('[data-role="tick"]');
        const crossEl = document.querySelector('[data-role="cross"]');

        if (questionData.answer) {
            if (tickEl) tickEl.classList.remove("hidden");
        } else {
            setEduQuickStatus(`Failed to fetch question ${questionNumber}.`);
            if (crossEl) crossEl.classList.remove("hidden");
        }
    }

    sessionStorage.setItem("eduquickQuiz", JSON.stringify(quiz));

    // Trigger page update to load preStart page
    handlePageChange();
}
