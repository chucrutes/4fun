# Admin Panel Dashboard

A professional admin management interface built with **Vue 3** and **TypeScript**. This project features a robust authentication system, real-time data summarization, and a modular component architecture.

## API

- **Documentação:** https://fakeapi.platzi.com

---

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm

### Installation

```bash
npm install

```

### Development

To run the project locally with network access:

```bash
npm run dev -- --host

```

### Production

To build and preview the production bundle:

```bash
npm run build && npm run start

```

---

## 🔐 Authentication Test Credentials

Use the following credentials to test the navigation guards and store logic:

| Role             | Email            | Password   |
| ---------------- | ---------------- | ---------- |
| **Valid Admin**  | `admin@mail.com` | `admin123` |
| **Invalid User** | `john@mail.com`  | `changeme` |

---

## 🛠 Project Architecture

This project follows **Atomic Design** principles to ensure scalability and reusability:

- **Atoms/Molecules/Organisms:** Found in the global components directory for generic UI elements (Buttons, Inputs, Tables).
- **Entity-Specific Components:** Located within dedicated entity folders for domain-specific logic.
- **State Management:** Powered by **Pinia** for clean, reactive global state.
- **Security:** Implements **Vue Router Guards** to protect sensitive dashboard routes.
- **Composables:** Encapsulated logic for reusable features like infinite scrolling and API fetching.

---

## 📊 Key Features

- **Secure Sign-In:** Complete authentication flow with error handling.
- **Dynamic Dashboard:**
- **Data Summarization:** Quick glance at total products and active categories.
- **Analytics:** Highlight of the most expensive products.
- **Product Management:** Full list of products with high-performance rendering.

- **Infinite Scroll:** Optimized data fetching using the `offset` and `limit` pattern.
- **Responsive UI:** Fully compatible with mobile and desktop using **Tailwind CSS**.

---

### UI & Transitions

The project utilizes a custom **Tailwind-based transition style** to provide smooth visual feedback during page navigations and data loading states.
