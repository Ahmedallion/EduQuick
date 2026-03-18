export function isAutoAnswerEnabled() {
    return window.location.hash === "#auto-answer";
}

export function runAutoAnswer({
    userAnswer,
    correctAnswer,
    textInput,
    mcqLabels,
    submitBtn,
} = {}) {
    if (userAnswer !== correctAnswer) {
        if (textInput) {
            textInput.value = correctAnswer;
            textInput.dispatchEvent(new Event("input", { bubbles: true }));
            return;
        }

        if (mcqLabels) {
            const matchingOption = Array.from(mcqLabels).find(
                (choice) =>
                    choice.getAttribute("aria-label").trim() === correctAnswer,
            );
            matchingOption.click();
            return;
        }
    }

    if (submitBtn) {
        submitBtn.click();
        return;
    }

    const nextQuestionButton = [...document.querySelectorAll("button")].find(
        (button) => button.textContent.trim() === "Next question",
    );
    if (nextQuestionButton) {
        nextQuestionButton.click();
    }
}
