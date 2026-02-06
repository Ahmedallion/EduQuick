import { setEduQuickStatus } from "../../ui/bottombar.js";
import { setEduQuickTitle, setEduQuickContent } from "../../ui/sidebar.js";
import loadTemplate from "../../templates/load.js";
import collectingTemplate from "../../templates/collecting-answers.html?raw";
import handlePageChange from "../pageHandler.js";

export default async function handleCollectState({ quizId, signal }) {
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
    document.querySelector('[data-role="none"]').classList.remove("hidden");

    const authToken = sessionStorage.getItem("token");
    const xsrfToken = decodeURIComponent(
        document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || "",
    );

    const quizResponse = await fetch(
        `https://my.educake.co.uk/api/student/quiz/${quizId}`,
        {
            headers: {
                Accept: "application/json;version=2",
                Authorization: `Bearer ${authToken}`,
                "X-XSRF-TOKEN": xsrfToken,
            },
            signal,
        },
    );

    const quizData = await quizResponse.json();
    const attempt = quizData.attempt[quizId];

    const answered = attempt.answerCount;
    const correct = attempt.correctCount;

    const hadMistakesBefore = answered - correct > 0;

    const order = attempt.questions;
    const questionMap = attempt.questionMap;

    const quiz = {
        quizId,
        totalQuestions: attempt.questionCount,
        collectedCount: 0,
        hadMistakesBefore,
        questions: {},
    };

    let questionNumber = answered + 1;

    for (let i = answered; i < order.length; i++) {
        const questionId = order[i];
        const questionData = questionMap[questionId];

        quiz.questions[questionNumber] = {
            id: questionData.id,
            question: questionData.question,
            image: questionData.image || "",
            type: questionData.type,
            answer: null,
        };

        questionNumber++;
    }

    quiz.collectedCount = Object.keys(quiz.questions).length;

    const fetchAnswer = async (id, retries = 3) => {
        for (let attemptNumber = 0; attemptNumber < retries; attemptNumber++) {
            const response = await fetch(
                `https://my.educake.co.uk/api/course/question/${id}/mark`,
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

    for (const number in quiz.questions) {
        const questionData = quiz.questions[number];

        setEduQuickStatus(`Fetching question ${number}...`);

        questionData.answer = await fetchAnswer(questionData.id);
        setEduQuickContent(
            await loadTemplate(collectingTemplate, {
                NUMBER: number,
                QUESTION: questionData.question,
                IMAGE_URL: questionData.image,
                ANSWER: questionData.answer || "",
            }),
        );
        if (questionData.answer) {
            document
                .querySelector('[data-role="tick"]')
                .classList.remove("hidden");
        } else {
            setEduQuickStatus(`Failed to fetch question ${number}.`);
            document
                .querySelector('[data-role="cross"]')
                .classList.remove("hidden");
        }
    }

    sessionStorage.setItem("eduquickQuiz", JSON.stringify(quiz));
    handlePageChange();
}
