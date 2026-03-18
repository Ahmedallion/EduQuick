import { setEduQuickStatus } from "../ui/bottombar";
import { setEduQuickTitle, setEduQuickContent } from "../ui/sidebar";
import loadTemplate from "../templates/load.js";
import quizResultTemplate from "../templates/quiz-result.html?raw";
import { createNewController } from "./pageCancellation.js";
import handlePageChange from "./pageHandler.js";

export default async function handleQuizResult() {
    const signal = createNewController();

    const quizId = Number(location.href.match(/quiz-result\/(\d+)/)?.[1]);

    const authToken = sessionStorage.getItem("token");
    const xsrfToken =
        document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] &&
        decodeURIComponent(document.cookie.match(/XSRF-TOKEN=([^;]+)/)[1]);

    const quizResponse = await fetch(
        `https://my.educake.co.uk/api/student/quiz/${quizId}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json;version=2",
                Authorization: `Bearer ${authToken}`,
                "X-XSRF-TOKEN": xsrfToken,
            },
            signal,
        },
    );

    const quizData = await quizResponse.json();
    const quizAttempt = quizData.attempt[quizId];

    if (quizAttempt.status !== "completed") {
        const newPath = location.pathname.replace("/quiz-result", "/quiz");
        history.replaceState({}, "", newPath);
        window.dispatchEvent(new Event("popstate"));
        return;
    }

    const storedQuiz = JSON.parse(sessionStorage.getItem("eduquickQuiz"));

    // If the stored quiz doesn't match the current quiz, show 'How it works' instead of results
    if (!storedQuiz || storedQuiz.quizId !== quizId) {
        const currentPath = location.pathname;
        history.replaceState({}, "", "/");
        await handlePageChange();
        history.replaceState({}, "", currentPath);
        return;
    }

    const quizScore = Math.round(
        (quizAttempt.correctCount / quizAttempt.questionCount) * 100,
    );
    const wrongCount = quizAttempt.questionCount - quizAttempt.correctCount;
    const assistedCount = storedQuiz.unansweredCount - wrongCount;
    const manualCount = quizAttempt.questionCount - storedQuiz.unansweredCount;

    setEduQuickStatus(`Quiz completed with ${quizScore}%.`);
    setEduQuickTitle("Quiz Results");
    setEduQuickContent(
        loadTemplate(quizResultTemplate, {
            SCORE_PERCENT: quizScore,
            ASSISTED_COUNT: assistedCount,
            WRONG_COUNT: wrongCount,
            MANUAL_COUNT: manualCount,
        }),
    );
}
