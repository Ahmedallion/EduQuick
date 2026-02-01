import { setEduQuickStatus } from "../ui/bottombar";
import { setEduQuickTitle, setEduQuickContent } from "../ui/sidebar";
import loadTemplate from "../templates/load.js";
import quizResultTemplate from "../templates/quiz-result.html?raw";
import { createNewController } from "./pageCancellation.js";
import handlePageChange from "./pageHandler.js";

export default async function handleQuizResult() {
    const signal = createNewController();

    const quizId = location.href.match(/quiz-result\/(\d+)/)?.[1];

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

    if (quizData.attempt[quizId].status !== "completed") {
        const newPath = location.pathname.replace("/quiz-result", "/quiz");
        history.replaceState({}, "", newPath);
        window.dispatchEvent(new Event("popstate"));
        return;
    }

    const quizScore = Math.round(
        (quizData.attempt[quizId].correctCount /
            quizData.attempt[quizId].questionCount) *
            100,
    );

    const wrongCount =
        quizData.attempt[quizId].questionCount -
        quizData.attempt[quizId].correctCount;

    const storedQuiz = JSON.parse(sessionStorage.getItem("eduquickQuiz"));

    if (quizId !== storedQuiz?.quizId) {
        const path = location.pathname;
        history.replaceState({}, "", "/");
        await handlePageChange();
        history.replaceState({}, "", path);
        return;
    }

    const assistedCount = storedQuiz.collectedCount - wrongCount;
    const manualCount = storedQuiz.totalQuestions - storedQuiz.collectedCount;

    setEduQuickStatus(`Quiz completed with ${quizScore}%.`);
    setEduQuickTitle("Quiz Results");
    setEduQuickContent(
        await loadTemplate(quizResultTemplate, {
            SCORE_PERCENT: quizScore,
            ASSISTED_COUNT: assistedCount,
            WRONG_COUNT: wrongCount,
            MANUAL_COUNT: manualCount,
        }),
    );
}
