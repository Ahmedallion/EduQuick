export function isAutoAnswerEnabled() {
    return new URLSearchParams(location.search).get("autoAnswer") === "true";
}

export function runAutoAnswer({
    userAnswer,
    correctAnswer,
    textInput,
    mcqLabels,
    submitBtn,
}) {
    if (userAnswer !== correctAnswer) {
        if (textInput) {
            if (textInput.placeholder.includes("number"))
                correctAnswer = Number(correctAnswer);
            textInput.value = correctAnswer;
            textInput.dispatchEvent(new Event("input", { bubbles: true }));
            return;
        }

        if (mcqLabels) {
            const match = Array.from(mcqLabels).find(
                (l) =>
                    l.querySelector(".pre-line").innerText.trim() ===
                    correctAnswer
            );
            match.click();
            return;
        }
    }

    if (submitBtn) {
        submitBtn.click();
        return;
    }

    const nextBtn = [...document.querySelectorAll("button")].find(
        (b) => b.innerText.trim() === "Next question"
    );
    nextBtn?.click();
}
