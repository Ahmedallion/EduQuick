import { setEduQuickStatus } from "./ui/bottombar";
import { setEduQuickTitle, setEduQuickContent } from "./ui/sidebar";
import { version } from "../package.json";

//Probabally gonna change this up later
export function startEduQuickWatcher() {
    let lastUrl = location.href;

    const observer = new MutationObserver(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            handlePageChange();
        }
    });
    observer.observe(document, { childList: true, subtree: true });

    document.addEventListener("click", (event) => {
        if (event.target.closest("button")) {
            handlePageChange();
        }
    });

    handlePageChange();
}

async function handlePageChange() {
    const url = location.href;

    setEduQuickStatus("Loading...");
    setEduQuickTitle("Please wait");
    setEduQuickContent(`<p>Content is loading based on the page...</p>`);

    if (url.includes("/quiz/")) {
        const quizId = url.match(/quiz\/(\d+)/)?.[1];
        const storedQuizAnswers = JSON.parse(
            sessionStorage.getItem("quizAnswers")
        );

        if (quizId !== storedQuizAnswers?.quizId) {
            setEduQuickStatus("Fetching questions...");
            setEduQuickTitle("Gathering quiz data");
            setEduQuickContent(`EduQuick is doing all the hard work for you.`);

            const authToken = sessionStorage.getItem("token");

            const xsrfToken =
                document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] &&
                decodeURIComponent(
                    document.cookie.match(/XSRF-TOKEN=([^;]+)/)[1]
                );

            const quizResponse = await fetch(
                `https://my.educake.co.uk/api/student/quiz/${quizId}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json;version=2",
                        Authorization: `Bearer ${authToken}`,
                        "X-XSRF-TOKEN": xsrfToken,
                    },
                }
            );

            const quizData = await quizResponse.json();
            const questionCount = quizData.attempt[quizId].questionCount;
            const questionList = quizData.attempt[quizId].questionMap;

            const quizAnswers = {
                quizId,
                answers: {},
            };

            for (const q of Object.values(questionList)) {
                quizAnswers.answers[q.id] = {
                    question: q.question,
                    answer: null,
                };
            }

            const fetchAnswer = async (questionId, retries = 3) => {
                for (let attempt = 1; attempt <= retries; attempt++) {
                    const response = await fetch(
                        `https://my.educake.co.uk/api/course/question/${questionId}/mark`,
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json;version=2",
                                Authorization: `Bearer ${authToken}`,
                                "X-XSRF-TOKEN": xsrfToken,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ givenAnswer: "1" }), // Dummy answer
                        }
                    );

                    if (response.ok) {
                        const data = await response.json();
                        const correctAnswers = data.answer?.correctAnswers;
                        if (correctAnswers?.length > 0)
                            return correctAnswers[0];
                    }

                    console.warn(
                        `Attempt ${attempt} failed for Question ID: ${questionId}`
                    );
                }

                return null;
            };

            let i = 0;
            for (const questionId in quizAnswers.answers) {
                i++;
                setEduQuickStatus(
                    `Fetching answer ${i} of ${questionCount}...`
                );
                const answer = await fetchAnswer(questionId);

                if (!answer) {
                    setEduQuickStatus(
                        `Failed to fetch answer for question ${i}.`
                    );
                }

                quizAnswers.answers[questionId].answer = answer;
            }

            sessionStorage.setItem("quizAnswers", JSON.stringify(quizAnswers));
            console.log("Quiz answers stored in sessionStorage:", quizAnswers);

            setEduQuickStatus(
                `Fetched ${
                    Object.keys(quizAnswers.answers).length
                } answers of ${questionCount}.`
            );
            setEduQuickTitle("EduQuick is ready!");
            setEduQuickContent("Begin quiz attempt to auto-complete.");
        } else {
            setEduQuickStatus("Quiz in progress.");
            setEduQuickTitle("Quiz answer overview");
            setEduQuickContent(storedQuizAnswers.answers);
        }
    } else if (url.includes("/quiz-result/")) {
        const quizId = url.match(/quiz-result\/(\d+)/)?.[1];

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
        console.log("Quiz result data:", quizData);
    } else {
        setEduQuickStatus("No active quizzes.");
        setEduQuickTitle("How it works");
        setEduQuickContent(`
            <div class="bg-page-bg text-black rounded-sm p-3 mb-2 w-full text-sm">
                <p>After submitting an answer on Educake, the answer is marked.</p>
            </div>

            <div class="bg-page-bg text-black rounded-sm p-3 mb-2 w-full text-sm">
                <div class="flex items-start mb-2">
                    <i class="icon-tick bg-green text-white rounded-sm float-left mr-2 text-md p-1"></i>
                    <div>
                        <strong>Q1:</strong> Energy can never be stored. True or False?
                    </div>
                </div>

                <div class="bg-white rounded-sm p-2 w-full text-sm">
                    <div class="mb-1">
                        <span class="font-bold">Your answer:</span>
                        <div class="pre-line mt-1">"FALSE"</div>
                    </div>
                    <div>
                        <span class="font-bold">Accepted answer:</span>
                        <div class="pre-line mt-1">"FALSE"</div>
                    </div>
                </div>
            </div>

            <div class="bg-page-bg text-black rounded-sm p-3 mb-2 w-full text-sm">
                <p>Before a quiz, EduQuick sends dummy answers to fetch the correct ones, so you can <span class="underline">achieve 100% on your first try</span>.</p>
                <br>
                <p>If you don't feel like typing, EduQuick can <span class="underline">auto-answer in seconds</span>.</p>
                <br>
                <p><strong>Note:</strong> Dummy answers don't affect your score or quiz attempts.</p>
            </div>

            <div class="bg-page-bg text-black rounded-sm p-3 mb-2 w-full text-sm">
                <p><strong>Tip:</strong> Clicking the EduQuick bookmarklet again will hide it.</p>
            </div>

            <div class="bg-page-bg text-black rounded-sm p-3 mb-2 w-full text-sm">
                <p><strong>Version:</strong> ${version}</p>
            </div>
        `);
    }
}
