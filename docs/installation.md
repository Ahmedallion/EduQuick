# Installing EduQuick

This guide will help you set up **EduQuick** on your device.

Select your device below:

---

## 💻 Desktop

Click a browser to jump to its instructions:

<p align="center">
  <a href="#chrome"><img src="images/chrome-logo.png" alt="Chrome" width="48" height="48"><br>Chrome / Chromium</a> <br>
  <a href="#edge"><img src="images/edge-logo.png" alt="Edge" width="48" height="48"><br>Edge</a> <br>
  <a href="#chrome"><img src="images/brave-logo.png" alt="Brave" width="48" height="48"><br>Brave</a> <br>
  <a href="#chrome"><img src="images/opera-logo.png" alt="Opera" width="48" height="48"><br>Opera</a> <br>
  <a href="#chrome"><img src="images/vivaldi-logo.png" alt="Vivaldi" width="48" height="48"><br>Vivaldi</a> <br>
  <a href="#alternative"><img src="images/alternative-logo.png" alt="Alternative Browser" width="48" height="48"><br>Not Listed</a>
</p>

> **Note:** Brave, Opera, and Vivaldi are Chromium-based; follow the **Chrome instructions**.

---

## 📱 Mobile

Click a device to jump to instructions:

<p align="center">
  <a href="#ios"><img src="images/ios-logo.png" alt="iOS Safari" width="48" height="48"><br>iOS Safari</a> <br>
  <a href="#android"><img src="images/android-logo.png" alt="Android" width="48" height="48"><br>Android</a>
</p>

---

## 💻 Desktop Instructions

### Chrome / Chromium-based Browsers <a name="chrome"></a>

1. **Download** [`eduquick.html`](../install/eduquick.html)  
   ![Step 1](images/chrome-step1.png)
2. Open bookmarks manager: `chrome://bookmarks`  
   ![Step 2](images/chrome-step2.png)
3. Ensure **Show bookmarks bar** is enabled  
   ![Step 3](images/chrome-step3.png)
4. Click the three dots → **Import**  
   ![Step 4](images/chrome-step4.png)
5. Wait for page to load
6. In dropdown, select **Bookmarks HTML file**  
   ![Step 6](images/chrome-step6.png)
7. Tick **Bookmarks / Favorites** box  
   ![Step 7](images/chrome-step7.png)
8. Click **Choose file**, select `eduquick.html`, **Open**  
   ![Step 8](images/chrome-step8.png)
9. EduQuick bookmarks appear in your bookmarks bar
10. Organize via bookmarks manager if needed

---

### Edge <a name="edge"></a>

1. **Download** [`eduquick.html`](../install/eduquick.html)
2. Open bookmarks manager: `edge://favorites`
3. Enable **Show favorites bar → Always**
4. Click three dots → **Import favorites**
5. Wait for page to load
6. Select **Favorites or bookmarks HTML file**
7. Tick **Favorites / Bookmarks**
8. Click **Choose file**, select `eduquick.html`, **Open**
9. EduQuick bookmarks appear in the favorites bar
10. Organize as needed

---

### Not Listed / Other Browsers <a name="alternative"></a>

- For browsers not listed above, or if the HTML import doesn’t work, use the **JS bookmarklet method** (same as mobile):
    1. Open [`eduquick.js`](../install/eduquick.js) and copy all code
    2. Create a bookmark called **EduQuick** and paste the JS as the URL
    3. Log in to **Educake**
    4. Click the bookmark to run

---

## 📱 Mobile Instructions

### iOS Safari <a name="ios"></a>

1. Open [`eduquick.js`](../install/eduquick.js)
2. Copy all the code
3. Bookmark the EduQuick GitHub page via three dots → **Add to Bookmarks**
4. Open bookmarks → find the new bookmark → **Edit**
5. Change name to **EduQuick**, clear URL field, paste JS, **Save**
6. Log in to **Educake**
7. Tilt device **horizontally** and zoom out fully
8. Open bookmarks → select **EduQuick** → script runs

---

### Android <a name="android"></a>

1. Bookmark the EduQuick repository and name it **EduQuick**
2. Every time you want to run it:
    - Copy the JS from [`eduquick.js`](../install/eduquick.js)
    - Log in to **Educake**
    - Tilt horizontally and zoom out
    - In active Educake tab, clear URL and paste the JS
    - Ensure it starts with `javascript:`
    - Press **Go / Enter** → EduQuick runs

---

## ✅ Tips

- Chromium-based browsers not listed follow **Chrome instructions**
- Always log in to **Educake** before running EduQuick
- For mobile, **horizontal orientation + zooming out** ensures UI fits
