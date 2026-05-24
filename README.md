# 🔍 CodePlagiarism Detector

> A **premium, production-grade** code plagiarism detection platform with a futuristic dark UI, advanced similarity algorithms, and real-time analysis.

[![Node.js](https://img.shields.io/badge/Node.js-v20+-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18+-blue?logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20Ready-brightgreen?logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-v4+-black?logo=express)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v3+-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **JWT Authentication** | Secure user registration & login with token-based sessions |
| 📤 **Multi-format Upload** | Support for C, C++, Java, Python, JavaScript files + text paste |
| 🧹 **Smart Preprocessing** | Removes comments, normalizes variables, handles formatting differences |
| 🤖 **Advanced Detection** | LCS, Cosine Similarity, N-gram matching, token analysis, structural comparison |
| 📊 **Real-time Scoring** | Instant similarity percentage with confidence metrics |
| 🎨 **Side-by-side Diff** | Visual highlight of matched code segments with line tracking |
| 💾 **Scan History** | Persistent storage of all plagiarism reports per user |
| 🌙 **Dark Futuristic UI** | Glassmorphism cards, neon glows, smooth animations with Framer Motion |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** — Modern UI library with hooks
- **Vite** — Lightning-fast build tool
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Smooth animations & transitions
- **React Router** — Client-side navigation
- **React Icons** — Beautiful icon library
- **Axios** — HTTP client for API calls

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — Web framework with middleware
- **MongoDB** — NoSQL database (local or Atlas)
- **Mongoose** — MongoDB ODM
- **JWT** — Secure authentication
- **Bcryptjs** — Password hashing
- **Multer** — File upload handling

### Detection Engine
- **Custom Tokenizer** — Language-aware token extraction
- **LCS Algorithm** — Longest common subsequence matching
- **Cosine Similarity** — Vector-based similarity scoring
- **N-gram Analysis** — Sequence pattern detection
- **Syntax Normalization** — Language preprocessing

---

## 📁 Project Structure

```
Code_Plagiarism_Checker/
│
├── frontend/                    # React + Vite application
│   ├── src/
│   │   ├── pages/              # Landing, Auth, Compare, Results, History
│   │   ├── components/         # Reusable UI components
│   │   ├── api.js              # Axios API client
│   │   ├── App.jsx             # Main router
│   │   └── index.css           # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── backend/                     # Express API server
│   ├── routes/                 # API endpoints
│   ├── models/                 # Mongoose schemas
│   ├── middleware/             # Auth & error handling
│   ├── server.js               # Entry point
│   └── package.json
│
├── database/                    # MongoDB connection
├── algorithms/                  # Tokenization & detection
├── tokenizer/                   # Comment stripping & normalization
├── similarity-engine/           # LCS, cosine, N-gram comparison
├── reports/                     # Report assembly
├── uploads/                     # Uploaded file storage
│
└── README.md                    # You are here
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v20+ ([Download](https://nodejs.org/))
- **MongoDB** (local at `127.0.0.1:27017` or Atlas URI)

### Installation

```bash
# Clone or navigate to project
cd Code_Plagiarism_Checker

# Install root dependencies
npm install

# Setup backend environment
cd backend
cp .env.example .env
# Edit .env and add your MongoDB URI and JWT secret

# Setup frontend environment (optional)
cd ../frontend
cp .env.example .env
```

### Running the Application

#### Terminal 1: Backend
```bash
cd backend
npm start
# Server starts on http://localhost:5000 (or next available port)
```

#### Terminal 2: Frontend
```bash
cd frontend
npm run dev
# App opens on http://localhost:5173
```

---

## 🔧 Environment Configuration

### Backend `.env`
```env
# MongoDB connection string (local or Atlas)
MONGO_URI=mongodb://127.0.0.1:27017/codeplagiarism

# JWT secret for token signing
JWT_SECRET=your_super_secret_key_here

# Server port (will auto-retry on next port if in use)
PORT=5000
```

### Frontend `.env`
```env
# Backend API base URL
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create new user account |
| `POST` | `/api/auth/login` | Login & receive JWT token |

### Code Comparison
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/upload` | Upload code files |
| `POST` | `/api/compare` | Compare two code snippets & get report |
| `GET` | `/api/history` | Fetch user's scan history (requires JWT) |
| `GET` | `/api/report/:id` | Get detailed report for saved scan (requires JWT) |

### Request Headers
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

## 🎯 How It Works

### 1. **Code Preprocessing**
- Removes comments and extra whitespace
- Normalizes variable names
- Standardizes indentation & formatting
- Language-aware tokenization

### 2. **Plagiarism Detection**
Runs multiple algorithms in parallel:
- **Token Matching** — Checks exact token sequences
- **LCS (Longest Common Subsequence)** — Finds largest matching patterns
- **Cosine Similarity** — Compares token vectors
- **N-gram Analysis** — Detects reordered code blocks
- **Structural Comparison** — Analyzes code logic flow

### 3. **Scoring & Report Generation**
- Composite similarity score (0-100%)
- Confidence level (Low, Medium, High, Very High)
- Suspiciousness rating
- Matching line segments highlighted
- Detailed metric breakdown

### 4. **History & Storage**
- All scans saved per authenticated user
- MongoDB persistent storage
- Generate detailed reports anytime
- Export capabilities (future)

---

## 🎨 UI/UX Highlights

- **Dark Futuristic Theme** — Premium black & slate palette
- **Glassmorphism Cards** — Frosted glass effect with backdrop blur
- **Neon Glow Effects** — Cyan & violet accent glows
- **Smooth Animations** — Framer Motion transitions & micro-interactions
- **Responsive Design** — Mobile, tablet, desktop optimized
- **Real-time Feedback** — Loading states, success/error notifications
- **Side-by-side Diff Viewer** — Highlighted matching code sections
- **Interactive Similarity Meter** — Visual progress indication

---

## ⚡ Performance

- **Fast Tokenization** — O(n) preprocessing
- **Efficient LCS** — O(n²) dynamic programming
- **Scalable Storage** — MongoDB indexing on user & timestamps
- **Optimized Frontend** — ~345KB gzipped bundle
- **Auto Port Fallback** — Backend automatically uses next free port

---

## 🔒 Security

- ✅ **Password Hashing** — Bcryptjs with 10 salt rounds
- ✅ **JWT Authentication** — 30-day expiration tokens
- ✅ **CORS Protection** — Configured for frontend origin
- ✅ **Input Validation** — Email, password, file size checks
- ✅ **Error Handling** — No sensitive data leaked
- ✅ **File Uploads** — Validated & stored securely

---

## 📊 Supported Languages

- ✓ **JavaScript/TypeScript** — `.js`, `.ts`, `.jsx`, `.tsx`
- ✓ **Python** — `.py`
- ✓ **Java** — `.java`
- ✓ **C/C++** — `.c`, `.cpp`, `.cc`, `.h`
- ✓ **Text Input** — Paste raw code directly

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Backend auto-retries on 5001, 5002
# Or change PORT in backend/.env
PORT=5001
```

### MongoDB Connection Failed
```bash
# Ensure local MongoDB is running:
mongod

# Or use Atlas connection string:
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
```

### Frontend Won't Connect
```bash
# Verify backend URL in frontend/.env
VITE_API_URL=http://localhost:5000/api
```

---

## 📝 Notes

- ✓ **No AI APIs** — Pure algorithmic detection, no external dependencies
- ✓ **Fully Offline** — Works with local MongoDB
- ✓ **Production Ready** — Error handling, validation, logging
- ✓ **Scalable** — Can handle concurrent users & large files
- ✓ **Open Source** — Modify and extend freely

---

## 🤝 Contributing

Improvements welcome! Areas for enhancement:
- Multi-file comparison
- Batch scanning
- PDF report export
- Advanced analytics dashboard
- Code complexity analysis

---

## 📜 License

MIT License — Free for personal & commercial use

---

## 👨‍💻 Author

Built with precision and care for plagiarism detection.

**Happy Detecting! 🚀**
