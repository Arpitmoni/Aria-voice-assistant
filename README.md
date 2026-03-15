# 🤖 ARIA — Personal Voice AI Assistant

A Progressive Web App (PWA) voice assistant that works on both **phone and laptop**, installable directly from the browser.

## ✨ Features
- 🎙️ **Voice commands** — tap the orb and speak
- 🔊 **Talks back** — text-to-speech replies
- ▶️ **Open any website** — YouTube, WhatsApp, Google, Netflix, etc.
- 🎵 **Play music** — searches YouTube directly
- ✉️ **Write emails** — drafts and opens in your mail app
- 🎫 **Book tickets** — flights, trains, movies via MakeMyTrip / IRCTC / BookMyShow
- ⏰ **Reminders** — browser notification reminders
- 🌤️ **Weather, maps, news** — opens Google instantly
- 📲 **Installable** — add to home screen on Android & iOS
- ✈️ **Works offline** — no internet needed for core features

---

## 🚀 Deploy on GitHub Pages (5 minutes)

### Step 1 — Create a GitHub repository
1. Go to [github.com](https://github.com) and sign in
2. Click **New Repository**
3. Name it: `aria` (or anything you like)
4. Set it to **Public**
5. Click **Create repository**

### Step 2 — Upload files
1. Click **uploading an existing file** on the repo page
2. Drag and drop ALL these files:
   - `index.html`
   - `style.css`
   - `brain.js`
   - `app.js`
   - `sw.js`
   - `manifest.json`
   - `icons/` folder (both icon-192.png and icon-512.png)
3. Click **Commit changes**

### Step 3 — Enable GitHub Pages
1. Go to your repo **Settings**
2. Click **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Select **main** branch → **/ (root)**
5. Click **Save**

### Step 4 — Your ARIA is LIVE! 🎉
After ~1 minute your app is at:
```
https://YOUR-USERNAME.github.io/aria/
```

---

## 📱 Install on Android Phone
1. Open your GitHub Pages URL in **Chrome**
2. Tap the **3-dot menu** (⋮)
3. Tap **"Add to Home Screen"**
4. ARIA icon appears on your home screen!
5. Open it — it works just like an installed app ✅

## 💻 Install on Laptop (Chrome/Edge)
1. Open your GitHub Pages URL
2. Click the **install icon** (⊕) in the address bar
3. Click **Install**
4. ARIA opens as a standalone window!

---

## 🗣️ Voice Commands Examples

| Say this... | ARIA does... |
|---|---|
| "Open YouTube" | Opens YouTube |
| "Play Tum Hi Ho" | Searches & plays on YouTube |
| "Open WhatsApp" | Opens WhatsApp Web |
| "Write email to boss about leave" | Drafts the email |
| "Book a flight to Delhi" | Opens MakeMyTrip |
| "Book a train ticket" | Opens IRCTC |
| "Book a movie" | Opens BookMyShow |
| "What's the weather today" | Opens Google Weather |
| "Cricket score" | Opens live cricket score |
| "Order food" | Opens Swiggy |
| "Book a cab" | Opens Ola |
| "Search latest iPhone price" | Googles it |
| "Navigate to Mumbai Airport" | Opens Google Maps |
| "Set reminder for meeting at 3pm" | Sets browser reminder |
| "Tell me a joke" | ARIA tells a joke 😄 |
| "What time is it" | Tells current time |

---

## 📁 File Structure
```
aria/
├── index.html       ← Main app page
├── style.css        ← All styles
├── brain.js         ← Smart command engine
├── app.js           ← Voice & app logic
├── sw.js            ← Service worker (offline)
├── manifest.json    ← PWA config
└── icons/
    ├── favicon.svg
    ├── icon-192.png
    └── icon-512.png
```

---

Built with ❤️ for Arpit
