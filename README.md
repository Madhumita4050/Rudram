# RudranPay - Full Stack Fintech Platform

A modern digital payment and fintech assisted services web application built with **React (Vite) + Tailwind CSS** on frontend and **Node.js (Express) + MySQL (Sequelize)** on backend.

## 📂 Project Architecture
```
Rudram/
├── client/         # Frontend React Application (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── data/
│   └── package.json
│
└── server/         # Backend REST API (Node.js + Express + MySQL)
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── server.js
    └── package.json
```

## 🚀 Getting Started

### 1. Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 2. Backend Setup
```bash
cd server
npm install
# Set up .env with database credentials
npm start
```

## 🌐 Production Deployment Guide

### Frontend Deployment (Vercel / Netlify / Cloudflare Pages)
1. **Environment Variables**:
   - Frontend ko deploy karte waqt hosting dashboard (jaise Vercel ya Netlify) ke **Environment Variables** settings me `VITE_API_URL` set karna zaroori hai.
   - Example: `VITE_API_URL = https://<YOUR_DEPLOYED_BACKEND_URL>/api`
   - Local production builds ke liye aap [client/.env.production](file:///d:/Rudram/client/.env.production) me bhi ye value set kar sakte hain.

2. **Crucial Note on Vite Environment Variables**:
   - Vite environment variables **build-time par JavaScript bundle ke andar bake (embed)** hote hain, runtime par nahi.
   - Agar aap hosting dashboard me `VITE_API_URL` ko add ya update karte hain, to **naya deployment trigger (Redeploy)** karna zaroori hai taaki updated URL naye build bundle me include ho sake.

### Backend Deployment (Render / VPS / Railway / cPanel)
- Server deploy karte waqt CORS allowlist me apni live domain (`https://rudranpay.com` / `https://www.rudranpay.com`) aur database environment variables (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) configure karein.

