
# 🚀 Personalized Content Dashboard

A smart, customizable dashboard that aggregates real-time news and movie trends. Built with **Next.js**, **TypeScript**, and **Redux**, featuring a fully draggable interface and comprehensive test coverage.

## ✨ Features

* **Aggregated Content Feed:** Real-time data fetching from NewsAPI and TMDB.
* **Smart Search:** Debounced search functionality to find specific news or movies instantly.
* **Customizable Layout:** **Drag-and-drop** interface to reorder content cards (powered by Framer Motion & React DnD).
* **Personalization:** Save favorites and manage content preferences.
* **Responsive Design:** Fully responsive UI with Dark/Light mode support using Tailwind CSS.
* **Robust Testing:**
* **Unit & Integration:** 100% logic coverage with Vitest & React Testing Library.
* **End-to-End (E2E):** Critical user flows automated with Playwright.



---

## 🛠️ Tech Stack

* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State Management:** Redux Toolkit (RTK) & RTK Query
* **Animations:** Framer Motion
* **Testing:** Vitest, React Testing Library, MSW (Mock Service Worker), Playwright

---

# 🚀 Vercel Deployment

Follow link: https://personalized-content-dashboard-mu.vercel.app/
## ⚠️ Known Limitations

**News API Restriction:**
Please note that the **NewsAPI** free tier ("Developer Plan") strictly limits API requests to `localhost` only.
* **On the Live Vercel Demo:** You may not see any News Content Cards
* **Locally:** The News feed functions perfectly. To see the full integration, please clone the repo and run it locally (`npm run dev`).

*The Movies feed (TMDB) works perfectly in both live and local environments.*

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Prerequisites

Ensure you have the following installed:

* Node.js (v18 or higher)
* npm or yarn

### 2. Clone the Repository

```bash
git clone https://github.com/Tej47/Personalized-Content-Dashboard.git
cd Personalized-Content-Dashboard

```

### 3. Install Dependencies

```bash
npm install

```

### 4. Setup Environment Variables

Create a `.env.local` file in the root directory and add your API keys:

```env
# Get these free keys from NewsAPI.org and TheMovieDB.org
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key_here
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

```

### 5. Run the Development Server

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser.

---

## 🧪 Running Tests

This project enforces high code quality through a strict testing pyramid.

### Unit & Integration Tests (Vitest)

Runs logic checks for Redux slices and component rendering (mocked with MSW).

```bash
npm run test

```

### End-to-End Tests (Playwright)

Simulates real user interactions (Login, Drag & Drop, Search) in a headless browser.
*First time setup:*

```bash
npx playwright install

```

*Run tests:*

```bash
npm run test:e2e

```

*View detailed report:*

```bash
npx playwright show-report

```

---

🧭 User Flow Walkthrough

This section explains how a user interacts with the application from entry to exit, highlighting key features and system behavior.

1️⃣ User Entry & Authentication

The user starts at the Login page.

The user enters an email address to sign in.

On successful login:

User profile data (name, email, avatar, bio) is stored in Redux state.

The user is redirected to the Home Feed.

Authentication state is persisted using Redux Persist, ensuring session continuity across reloads.

2️⃣ Home Feed Experience

The Home Feed displays a unified content stream composed of:

News articles

Movies / media content

Social-style posts

Content is:

Fetched dynamically

Merged into a single feed

Infinite scrolling loads additional content seamlessly as the user scrolls.

3️⃣ Search Interaction

The user can search for content using the search bar.

When a search query is active:

The feed switches to filtered results

Clearing the search query restores the default feed.

4️⃣ Content Personalization (Preferences)

From the Settings page, the user can select content categories such as:

Technology

Business

Sports

Entertainment

Health

Science

Selected preferences:

Instantly update the feed

Are stored locally via Redux Persist

Remain consistent across sessions and reloads

5️⃣ Favorites & Reordering

Users can mark content items as Favorites.

The Favorites page:

Displays only saved items

Allows drag-and-drop reordering for personalization

6️⃣ Profile Customization

In the Settings page, users can:

Update their public display name

Edit their bio

Changes reflect immediately across the UI.

7️⃣ Theme & UI Experience

The application supports Light and Dark modes.

Theme changes apply instantly across all pages.

Smooth animations and transitions enhance usability.

8️⃣ Sign Out & Session End

The user can sign out from the Settings page.

On sign out:

User data is cleared from Redux state

Persisted session data is removed

The user is redirected back to the Login page
