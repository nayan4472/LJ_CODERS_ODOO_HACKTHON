<div align="center">
  <img src="https://raw.githubusercontent.com/nayan4472/LJ_CODERS_ODOO_HACKTHON/main/frontend/public/vite.svg" width="100" height="100">
  <h1>🚛 FleetFlow: Real-Time Fleet Management</h1>
  <p><b>Precision Tracking | Smart Analytics | Seamless Logistics</b></p>
  
  <p>
    <img src="https://img.shields.io/github/stars/nayan4472/LJ_CODERS_ODOO_HACKTHON?style=for-the-badge&logo=github" alt="Stars">
    <img src="https://img.shields.io/github/forks/nayan4472/LJ_CODERS_ODOO_HACKTHON?style=for-the-badge&logo=github" alt="Forks">
    <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge" alt="Status">
  </p>
</div>

---

## 🌟 Overview
**FleetFlow** is a modern, microservices-driven platform designed for the **Odoo Hackathon**. It provides logistics managers with a high-performance "Command Center" to monitor vehicle health, track routes in real-time, and optimize fleet efficiency using data-driven analytics.

---

## 🚀 Key Features

- 📍 **Real-Time GPS Tracking**: Live Mapbox integration with low-latency updates via Socket.io.
- 🔐 **Secure Authentication**: Enterprise-grade JWT-based auth with OTP verification.
- 📊 **Smart Analytics**: Automated performance reports and fuel efficiency tracking.
- 🛠️ **Fleet Maintenance**: proactive diagnostics and vehicle registry management.
- 📦 **Microservices Architecture**: Highly scalable backend services built with Express.js.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: `React + Vite`
- **Styling**: `Tailwind CSS`
- **Maps**: `Mapbox GL`
- **Icons**: `Lucide React`

### Backend (Microservices)
- **Runtime**: `Node.js`
- **Framework**: `Express.js`
- **Realtime**: `Socket.io`
- **Database**: `MongoDB`

---

## 🛠️ Getting Started

Follow these steps to launch the entire ecosystem:

### 1️⃣ Setup API Gateway
```bash
cd api-gateway
npm install
npm start
```

#database  : MONGO_URI=mongodb+srv://yashkharva506:Sufalam%402233@cluster0.j6nogwi.mongodb.net/fleetflow?retryWrites=true&w=majority&appName=Cluster0


### 2️⃣ Launch Microservices
Open a separate terminal for each:
```bash
# Services: auth, fleet, trip, realtime, analytics
cd backend-services/[service-name]
npm install
npm start
```

### 3️⃣ Start the Dashboard
```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Structure

```bash
├── 🌐 api-gateway/         # Central routing hub
├── ⚙️  backend-services/    # Independent microservices
│   ├── 🔑 auth-service
│   ├── 🚛 fleet-service
│   ├── 🛣️ trip-service
│   ├── 📡 realtime-service
│   └── 📈 analytics-service
└── 🎨 frontend/             # High-performance UI
```

---

## 📜 Licenses & Attribution
Built for the **LJ CODERS ODOO HACKATHON**.  
Developed with ❤️ by the FleetFlow Team.

---

<div align="center">
  <b>LJ CODERS • ODOO HACKATHON 2026</b>
</div>