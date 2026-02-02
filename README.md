<h1 style="display:flex;align-items:center;gap:10px;">
  <img src="docs/images/eduquick-icon.png" alt="EduQuick Icon" style="height:42px;">
  EduQuick
</h1>

[![jsDelivr](https://data.jsdelivr.com/v1/package/gh/Ahmedallion/EduQuick/badge?style=rounded)](https://www.jsdelivr.com/package/gh/Ahmedallion/EduQuick) ![Stars](https://img.shields.io/github/stars/Ahmedallion/EduQuick?style=flat&logo=github) ![Last Commit](https://img.shields.io/github/last-commit/Ahmedallion/EduQuick) [![Docs](https://img.shields.io/badge/GitHub%20Pages-Docs-black?logo=github)](https://ahmedallion.github.io/EduQuick) [![Creatpr's Website](https://img.shields.io/badge/Website-ahmedallion.dev-blue?logo=google-chrome&logoColor=white)](https://ahmedallion.dev/)

**Collect answers and auto-complete Educake quizzes in seconds.**

EduQuick is a simple tool for **[Educake](https://www.educake.co.uk)** that helps you get quizzes done faster.  
It collects answers before you start, and can optionally auto-complete quizzes so you save time on repetitive work.

---

## ✨ Features

- 📋 **Answer Overview**
    - Collects all quiz answers before you begin
    - Displays them in a clean, easy-to-read panel

- 🤖 **Auto Answer (Optional)**
    - Automatically selects or inputs correct answers
    - Waits for submit buttons where required
    - Ideal for deadlines, repetitive work, or “just get it done” homework

- 🔄 **Auto Updates**
    - Always pulls the latest script from this GitHub repository
    - Warns you if your installed bookmarklet itself needs updating

- 🧠 **Non-intrusive**
    - Runs only when you click it
    - No permanent browser changes

---

## 🚀 Installation

### 💻 Desktop (Recommended)

1. Download [`install/eduquick.html`](install/eduquick.html)
2. Open your bookmarks manager
3. Make sure your bookmarks bar is visible (or set to always show)
4. Import the HTML file
5. You’ll see a new **EduQuick** folder

### 📱 Mobile or Alternative Method (Desktop)

1. Open [`install/eduquick.js`](install/eduquick.js)
2. Copy all the code
3. Either:
    - Create a bookmark called **EduQuick** and paste the code in the URL field, **or**
    - Paste the code into the browser's address bar while Educake is open

> For a more detailed explanation, check [`docs/installation`](https://ahmedallion.github.io/EduQuick/installation)

---

## ▶️ How to Use

1. Log in to **Educake**
2. Open a quiz
3. Click the **EduQuick** bookmark **or paste the code into the active tab**
4. EduQuick loads instantly

> ⚠️ You **must** already be logged into Educake - otherwise EduQuick will not load.

---

## 🤖 Auto Answer Mode

- Can be enabled from the EduQuick UI
- Automatically:
    - Selects multiple-choice answers
    - Fills text inputs
    - Waits for and clicks submit buttons

Nothing runs unless you turn it on.

---

## ⚠️ Limitations & Known Issues

- **Mobile devices are not fully supported**  
  EduQuick is designed for desktop browsers. Mobile support may be added in the future, but there are no guarantees.

- **UI may look odd on some browsers or screen sizes**  
  The UI and CSS are currently optimised for my own setup. Support for more browsers and resolutions will improve over time.

- **Educake account customisation settings are not fully supported**  
  Certain Educake UI or account customisation options may interfere with EduQuick. Better handling is planned.

- **Educake updates can temporarily break things**  
  Educake UI or backend changes may cause features to stop working until EduQuick is updated.

If something looks broken and isn’t listed here, feel free to open an issue.

---

## 🧑‍🎓 Who Is This For?

Let’s be real:

- Students who already understand the content
- Students who are tired of repetitive Educake homework
- Students who want their time back

If you’re here, you probably know why.

---

## 🔄 Updates

- EduQuick **auto-fetches the latest version** from GitHub
- If your **installed bookmarklet is outdated**, EduQuick will notify you
- Reinstalling takes less than a minute

---

## 🙌 Special Thanks

Huge thanks to these projects, which I discovered later on and which helped influence parts of EduQuick:

- **[Educake-Helper](https://github.com/Danny0408/Educake-Helper)**
  For reverse engineering the Educake API

- **[educake-hacks](https://github.com/smellyelephant/educake-hacks)**
  For inspiration and help with parts of the auto-answer logic

---

## 📸 Demo & Screenshots

Images will be added soon:

- UI elements
  ![UI](docs/images/ui.png)

- Collecting overview
  ![Collecting Overview](docs/images/collecting-overview.png)

- Auto-answer flow
  ![Auto Answer](docs/images/auto-answer.png)

---

## ⚠️ Disclaimer

- You are responsible for how you use EduQuick
- This project is **not affiliated with Educake**
- If something breaks, that’s on you - but I’ll try to help 😉

---

📘 Full documentation available at: https://ahmedallion.github.io/EduQuick

---

<!-- Keywords for SEO -->

education, answers, school, test, homework, bookmarklet, bookmark farming, quiz hacks, classwork, auto-answer, educake

<!--
Made with ❤️ and a strong dislike for unnecessarily tedious homework.
-->
