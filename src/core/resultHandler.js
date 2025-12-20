import { setEduQuickStatus } from "../ui/bottombar";
import { setEduQuickTitle, setEduQuickContent } from "../ui/sidebar";
import loadTemplate from "../templates/load.js";
import { createNewController } from "./pageCancellation.js";

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
        }
    );

    const quizData = await quizResponse.json();

    const quizScore = Math.round(
        (quizData.attempt[quizId]?.correctCount /
            quizData.attempt[quizId].questionCount) *
            100
    );

    setEduQuickStatus(`Quiz completed with ${quizScore}%.`);

    if (quizScore === 100) {
        setEduQuickTitle("Congratulations!");
        setEduQuickContent(
            "<p>You have successfully completed the quiz with a perfect score.</p>"
        );
    } else {
        setEduQuickTitle("Quiz Results");
        setEduQuickContent(`
                <p>You completed the quiz with a score of ${quizScore}%.</p>
                <p>Review your answers and consider retaking the quiz to improve your score.</p>
            `);
    }
}
