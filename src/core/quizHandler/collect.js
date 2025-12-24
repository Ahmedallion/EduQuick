import { setEduQuickStatus } from "../../ui/bottombar.js";
import { setEduQuickTitle, setEduQuickContent } from "../../ui/sidebar.js";
import loadTemplate from "../../templates/load.js";
import collectingTemplate from "../../templates/collecting-answers.html?raw";
import handlePageChange from "../pageHandler.js";

export default async function handleCollectState({ quizId, signal }) {
    setEduQuickStatus("Fetching questions...");
    setEduQuickTitle("Collecting Answers");
    setEduQuickContent(
        await loadTemplate(collectingTemplate, {
            NUMBER: "?",
            QUESTION: "Loading question...",
            IMAGE_URL: "",
            ANSWER: "",
        })
    );
    document.querySelector('[data-role="none"]').classList.remove("hidden");

    const authToken = sessionStorage.getItem("token");
    const xsrfToken = decodeURIComponent(
        document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || ""
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
        }
    );

    const quizData = await quizResponse.json();
    const questionMap = quizData.attempt[quizId].questionMap;
    const questionCount = quizData.attempt[quizId].questionCount;

    const quiz = { quizId, answers: {} };

    for (const q of Object.values(questionMap)) {
        quiz.answers[q.id] = {
            question: q.question,
            image: q.image || "",
            answer: null,
        };
    }

    const fetchAnswer = async (id, retries = 3) => {
        for (let i = 1; i <= retries; i++) {
            const r = await fetch(
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
                }
            );

            if (r.ok) {
                const d = await r.json();
                return d.answer.correctAnswers?.[0] ?? null;
            }
        }
        return null;
    };

    let i = 0;
    for (const id in quiz.answers) {
        i++;
        setEduQuickStatus(`Fetching answer ${i} of ${questionCount}...`);
        quiz.answers[id].answer = await fetchAnswer(id);

        setEduQuickContent(
            await loadTemplate(collectingTemplate, {
                NUMBER: i,
                QUESTION: quiz.answers[id].question,
                IMAGE_URL: quiz.answers[id].image,
                ANSWER: quiz.answers[id].answer,
            })
        );
        document.querySelector('[data-role="tick"]').classList.remove("hidden");
    }

    sessionStorage.setItem("EduQuickQuizData", JSON.stringify(quiz));
    handlePageChange();
}
