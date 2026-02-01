---
title: FAQ
parent: Troubleshooting
nav_order: 2
---

# Frequently Asked Questions

Find answers to common questions about EduQuick’s compatibility and functionality.

---

## Compatibility

### Does EduQuick work on mobile?

Yes, but the experience varies by platform:

- **iOS (Safari):** Full support. Follow the specialised [iOS Installation](../installation/mobile-ios) guide to set up your bookmarklet.
- **Android:** Limited support. Because Android browsers often block bookmarklets, you must manually paste the script into your address bar each time you use it.

{: .warning }

> **Note:** Due to these browser limitations, Android support is considered experimental and is generally discouraged for a smooth experience.

### Which browsers are supported?

EduQuick is optimized for the following:

- **Desktop:** Chrome, Microsoft Edge, Brave, Opera, and Vivaldi.
- **Mobile:** iOS Safari.
- **Other:** Any browser that supports bookmarklets or manual JavaScript execution may work, but is not officially tested.

---

## Safety & Privacy

### Is EduQuick safe to use?

Yes. EduQuick operates entirely within your local browser session.

- It **never** sees or stores your Educake password or login credentials.
- It only interacts with the quiz data visible on your screen to identify correct answers.
- No data is sent to external servers; everything stays on your device.

### Can teachers see that I am using it?

EduQuick itself is invisible to the Educake servers. However, teachers can see your "Time Taken" for each quiz. If you use the **Auto-Answer** feature to finish a 50-question quiz in 5 seconds, it will be obvious that a tool was used. We recommend pacing yourself naturally.

---

## Troubleshooting

### What should I do if the bookmarklet doesn't run?

If nothing happens when you click your bookmark:

1. **Check Login:** Ensure you are actively logged into your Educake account.
2. **Re-install:** The "launcher" bookmark may be outdated. Try deleting it and following the [Installation Guide](../installation) again.
3. **Check the URL:** Right-click your bookmark, select "Edit," and ensure the URL starts with `javascript:`. If that prefix is missing, the browser will treat it as a search term instead of a command.

<br>

{: .note }

> Still having trouble? Visit the [Get Help](../get-help) page to report a specific bug on GitHub.
