# Hacker News Hub 👨🏼‍💻

A high-performance, responsive web application designed to democratize access to technology news. Built with **Angular (Standalone Components)** and **RxJS**, this project leverages the official Hacker News API to deliver a seamless, retro-themed reading experience.

Second project developed by me for the **start2impact** Angular Course.

---

## 🚀 Live Demo

👉 [**Hacker News Hub**](https://hacker-news-hub.web.app/) 👈

---

## 🧐 Project Overview

The main challenge of this project was to handle the Hacker News API structure efficiently. The API endpoint returns an array of ~500 story IDs, but not the story details. Fetching 500 details sequentially would kill performance.

**The Solution:**
I implemented a **Client-Side Pagination Strategy**. The app fetches all IDs at startup but utilizes **RxJS `forkJoin`** to load story details in parallel batches of 10. This ensures a fast Time-to-Interactive (TTI) and a fluid user experience.

---

## ✨ Key Features

* **⚡ Smart Data Fetching**:
    * **Initialization**: Fetches 500 IDs immediately but renders only the first batch.
    * **Parallel Requests**: Uses `forkJoin` to fetch 10 stories simultaneously.
    * **Resilience**: Implements `timeout(3000)` and `catchError` operators. If a single API call hangs or fails, it is skipped so the UI never freezes.
* **🔄 Incremental Loading**: A "Load More" button allows users to fetch the next batch of stories on demand.
* **🎨 Retro UI Design**: Custom styling using the **VT323** pixel font to mimic a terminal aesthetic, complete with CSS animations and responsive layouts.
* **📱 Fully Responsive**: Optimized layout for Desktop, Tablet, and Mobile devices.
* **🛠 Robust Architecture**: Built using modern Angular Best Practices (Standalone Components, Dependency Injection, Strict Typing).

---

## 📂 Project Architecture

The codebase follows the **Separation of Concerns (SoC)** principle.

### File Structure

```text
├── angular.json
├── firebase.json
├── package.json
├── package-lock.json
├── tsconfig.app.json
├── tsconfig.json
├── public/
│   │
│   └── assets/
│       ├── favicon.ico
│       └── logo.png
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.scss
    └── app/
        ├── app.config.ts
        ├── app.component.html
        ├── app.component.scss
        ├── app.component.ts
        ├── models/
        │   └── news.model.ts
        └── services/
            └── hacker-news.service.ts
```

---

## Data Flow & Logic

1. **Service Layer** (`hacker-news.service.ts`):
   - Manages raw HTTP `GET` requests to Firebase API endpoints (`/newstories.json` and `/item/{id}.json`)
   - Uses Angular's `HttpClient` with modern `withFetch`

2. **Component Layer** (`app.component.ts`):
   - **State Management**: Tracks `isLoadingIds` (initial load) separately from `isLoadingStories` (pagination) to prevent UI flickering
   - **Concurrency**: Uses `forkJoin` to bundle requests
   - **Change Detection**: Manually triggers `ChangeDetectorRef` to ensure the UI updates immediately after asynchronous operations complete

---
   
## 🛠 Tech Stack

- **Framework**: Angular 21.1 (Standalone Components)
- **Reactive Programming**: RxJS (Observables, Operators)
- **Language**: TypeScript
- **Styling**: SCSS (Sass)
- **Deployment**: Firebase Hosting
- **Tools**: Angular CLI, VS Code

---

## 💻 Getting Started (Local Setup)

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v18+)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Clone the repository**:

```bash
   git clone https://github.com/sadsotti/hacker-news-hub.git
   cd hacker-news-hub
```

2. **Install dependencies**:

```bash
   npm install
```

3. **Run the development server**:

```bash
   ng serve
```

4. **Open the app**: Navigate to `http://localhost:4200/` in your browser

---

## ☁️ Deployment

The application is optimized for production and deployed on Firebase.

1. **Build the project**:

```bash
   ng build
```
   Output directory: `dist/hacker-news-hub/browser`

2. **Deploy to Firebase**:

```bash
   firebase deploy
```

---

## 🔗 Useful Links

* [start2impact](https://www.start2impact.it/)
* [My LinkedIn](https://linkedin.com/in/lorenzo-sottile)

---
