export function isAutoAnswerEnabled() {
    return window.location.hash === "#auto-answer";
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
            textInput.value = correctAnswer;
            textInput.dispatchEvent(new Event("input", { bubbles: true }));
            return;
        }

        if (mcqLabels) {
            const match = Array.from(mcqLabels).find(
                (choice) =>
                    choice.getAttribute("aria-label").trim() === correctAnswer,
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
        (button) => button.textContent.trim() === "Next question",
    );
    nextBtn?.click();
}
