# 📊 Log File Analyzer

A full-stack app built with **Node.js (Express)** + **React** to analyze large log files.  
It extracts total requests, status code counts, and suspicious IP addresses — all displayed in a clean UI.

---

## 🚀 Features
- Upload `.log` files for analysis
- Process files using **Node.js streams** (memory efficient)
- Detect suspicious IPs (401 / 403 status codes)
- Show analytics on the frontend instead of messy logs

---

## 🛠️ Tech Stack
- Backend: Node.js, Express, Streams
- Frontend: React, Axios
- Others: CORS, File Uploads

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/log-file-analyzer.git
cd log-file-analyzer
```

```bash
Backend Setup
cd backend
npm install
npm run dev
```

```bash
Frontend Setup
cd frontend
npm install
npm run dev
```


Project Structure
log-file-analyzer/
│── backend/       # Express server (log processing)
│── frontend/      # React app (UI & file upload)
│── README.md

