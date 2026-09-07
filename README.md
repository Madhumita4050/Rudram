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

## 🔐 Default Admin Credentials & Panels

### 🛡️ Admin Panel (`/admin`)
- **URL**: `http://localhost:5173/admin`
- **Default Email**: `admin@rudram.com`
- **Default Password**: `Admin@12345`
- **Features**:
  - **Overview Dashboard**: Live statistics of total revenue, citizen registrations, users, service transactions, and support tickets.
  - **Citizen Registrations**: View, filter by role (Founder Member, Field Officer, Personal Assistance) & status, preview uploaded documents/photo, approve/reject applications, print/export.
  - **User & RBAC Management**: Manage users, promote to Admin or demote to User, block/unblock accounts, adjust wallet balance (credit/debit).
  - **Service Transactions**: Monitor all utility and recharge orders, change real-time processing status (`Pending`, `In Progress`, `Completed`, `Failed`).
  - **Service Catalog**: Create, edit, and delete services, configure pricing and Lucide icons.
  - **Customer Inquiries & Grievances**: Review messages and grievance tickets, resolve issues with admin remarks.

### 👤 User Panel (`/dashboard`)
- **URL**: `http://localhost:5173/dashboard`
- **Features**:
  - **Wallet Card**: Real-time wallet balance and quick passbook access.
  - **Application Tracker**: Live tracking of submitted partner/officer registration applications.
  - **Instant Digital Services**: 1-click launch to top services (Recharge, Electricity, Banking, Flights).
  - **Passbook Stream**: Recent transactions and service status history.


