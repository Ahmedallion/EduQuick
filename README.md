# EduQuick

EduQuick is a bookmarklet-based script for **[Educake](https://www.educake.co.uk)** that helps you get quizzes done faster by collecting answers _before_ you even start - with an optional auto-answer mode to secure 100% results with minimal effort.

> Built to save time. Designed to remove tedium. Use wisely.

---

## ⚡ What is EduQuick?

EduQuick is a **JavaScript bookmarklet** that injects itself into Educake quizzes.  
It runs entirely client-side and focuses on removing the most annoying parts of Educake homework.

Educake is an online homework and revision platform for UK students (KS2, KS3, GCSE) that provides specification-matched quizzes.

**EduQuick is NOT affiliated with Educake in any way.**

---

## ✨ Features

-   📋 **Answer Overview**

    -   Collects all quiz answers before you begin
    -   Displays them in a clean, easy-to-read panel

-   🤖 **Auto Answer (Optional)**

    -   Automatically selects or inputs correct answers
    -   Waits for submit buttons where required
    -   Ideal for deadlines, repetitive work, or “just get it done” homework

-   🔄 **Auto Updates**

    -   Always pulls the latest script from this GitHub repository
    -   Warns you if your installed bookmarklet itself needs updating

-   🧠 **Non-intrusive**
    -   Runs only when you click it
    -   No permanent browser changes

---

## ⚠️ Limitations & Known Issues

-   **Mobile devices are not supported**  
    EduQuick is designed for desktop browsers. Mobile support may be added in the future, but there are no guarantees.

-   **UI may look odd on some browsers or screen sizes**  
    The UI and CSS are currently optimised for my own setup. Support for more browsers and resolutions will improve over time.

-   **Educake account customisation settings are not fully supported**  
    Certain Educake UI or account customisation options may interfere with EduQuick. Better handling is planned.

-   **Educake updates can temporarily break things**  
    Educake UI or backend changes may cause features to stop working until EduQuick is updated.

If something looks broken and isn’t listed here, feel free to open an issue.

---

## 🧑‍🎓 Who Is This For?

Let’s be real:

-   Students who already understand the content
-   Students who are tired of repetitive Educake homework
-   Students who want their time back

If you’re here, you probably know why.

---

## 🚀 Installation (Bookmarklet)

### Option 1: Import HTML (Recommended)

1. Download  
   [`install/eduquick.html`](install/eduquick.html)
2. Open your bookmarks manager
    - Chrome / Edge: `chrome://bookmarks`
3. Drag & drop or import the HTML file
4. You’ll now have a bookmark folder called **EduQuick**

---

### Option 2: Manual Bookmarklet

1. Open  
   [`install/eduquick.js`](install/eduquick.js)
2. Copy **all** of its contents
3. Create a new bookmark:
    - **Name:** `EduQuick`
    - **URL:** paste the copied JavaScript
4. Save

---

## ▶️ How to Use

1. Log in to **Educake**
2. Open a quiz
3. Click the **EduQuick** bookmark
4. EduQuick loads instantly

> ⚠️ You **must** already be logged into Educake - otherwise EduQuick will not load.

---

## 🤖 Auto Answer Mode

-   Can be enabled from the EduQuick UI
-   Automatically:
    -   Selects multiple-choice answers
    -   Fills text inputs
    -   Waits for and clicks submit buttons

Nothing runs unless you turn it on.

---

## 🔄 Updates

-   EduQuick **auto-fetches the latest version** from GitHub
-   If your **installed bookmarklet is outdated**, EduQuick will notify you
-   Reinstalling takes less than a minute

---

## 🧪 Running Locally (Development)

You can run EduQuick locally if you want to inspect, modify, or develop it.

### Prerequisites

-   Node.js
-   npm

### Steps

```bash
git clone https://github.com/Ahmedallion/EduQuick
cd EduQuick
npm install
npm run dev
```

1. Copy the bookmarklet from
   [`install/eduquick-dev.js`](install/eduquick-dev.js)
2. Create a bookmark using that script
3. Run it on Educake as usual

---

## 🕒 Older Versions

If you need an older version:

-   Go to **Releases**
-   Download the version you want
-   Use its corresponding install file

---

## 🤝 Contributing

Contributions are welcome.

-   See [`CONTRIBUTING.md`](CONTRIBUTING.md) for guidelines  
    (this file may evolve over time)

### Bugs & Issues

This is my **first major public JavaScript project**, and I’m still learning - so yes, the code _will_ be messy in places.

If you run into a bug or issue, please open a GitHub issue and include as much detail as possible.  
You’ll be guided by an issue template, but especially helpful details include:

-   Browser name and version
-   Page / quiz type
-   What you expected to happen
-   What actually happened
-   Console errors (if any)

It genuinely helps and saves a lot of back-and-forth.

---

## 🙌 Special Thanks

Huge thanks to these projects, which I discovered later on and which helped influence parts of EduQuick:

-   **[Educake-Helper](https://github.com/Danny0408/Educake-Helper)**
    For reverse engineering the Educake API

-   **[educake-hacks](https://github.com/smellyelephant/educake-hacks)**
    For inspiration and help with parts of the auto-answer logic

---

## 📸 Demo & Screenshots

Images will be added soon:

-   Answer overview
    ![Answer Overview](docs/images/answer-overview.png)

-   Auto-answer flow
    ![Auto Answer](docs/images/auto-answer.png)

-   UI elements
    ![UI](docs/images/ui.png)

---

## ⚠️ Disclaimer

-   You are responsible for how you use EduQuick
-   This project is **not affiliated with Educake**
-   If something breaks, that’s on you - but I’ll try to help 😉

---

<!--
Made with ❤️ and a strong dislike for unnecessarily tedious homework.
-->
