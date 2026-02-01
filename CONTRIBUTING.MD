# Contributing to EduQuick

Thanks for considering contributing to EduQuick!

This is my first major public JavaScript project, so the codebase may be messy in places - improvements are welcome.

---

## 🧰 Getting Started

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes
4. Open a pull request

---

## 🧪 Running Locally (Development)

You can run EduQuick locally if you want to inspect, modify, or develop it.

### Prerequisites

- Node.js
- npm

### Steps

#### 1. Clone the repository, install dependencies, and start the dev server:

```bash
git clone https://github.com/Ahmedallion/EduQuick
cd EduQuick
npm install
npm run dev
```

> By default, the dev server uses **port 5173**.
> You **must change it** in [`package.json`](package.json) if you want a different port, and also update the port in the local bookmarklet so it points to the same source.

#### 2. Install the Bookmarklet

- Import [`install/eduquick-dev.html`](install/eduquick-dev.html) **or**
- Create a bookmark with the JavaScript from [`install/eduquick-dev.js`](install/eduquick-dev.js)

#### 3. Usage

Run it on Educake as usual.

---

## ✅ Guidelines

- Keep changes focused and minimal
- Follow the existing code style where possible
- Avoid unnecessary refactors unless they clearly improve things
- Comment tricky logic if needed

---

## 🐛 Bugs

If you’re fixing a bug:

- Explain what caused it
- Explain how your fix works
- Mention any edge cases you considered

---

## 🚫 Please Don’t

- Add malicious or destructive behaviour
- Break core functionality without explanation
- Submit huge PRs without discussing them first

---

## 📄 Notes

By contributing, you agree that your contributions may be used in this project without additional attribution.

Thanks for helping improve EduQuick!
