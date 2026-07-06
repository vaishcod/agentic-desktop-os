# Antigravity AI OS

A production-quality autonomous AI desktop assistant platform designed for clarity and visual excellence. This project serves as a next-generation operating system layer, combining desktop automation, multi-agent AI, and a premium glassmorphic UI.

## 🚀 Key Features

- **Autonomous Agent Orchestration**: Powered by the **Commander Agent** using LangGraph logic.
- **Computer Vision**: Understands your UI and extracts text using the **Vision Agent**.
- **Desktop Automation**: Controls apps, windows, and screenshots via the **Desktop Agent**.
- **Contextual Memory**: Dual-layer memory system using **Redis** (Short-term) and **Qdrant** (Long-term/Vector).
- **Automation Builder**: Drag-and-drop workflow editor built with **React Flow**.
- **Plugin Ecosystem**: Extensible architecture for custom tools and capabilities.

## 🛠️ Tech Stack

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** (Glassmorphism design system)
- **Framer Motion** (Premium animations)
- **Zustand** (Global state)
- **React Flow** (Workflow builder)

### Backend
- **FastAPI** (Python 3.12)
- **LangChain** & **LangGraph**
- **PostgreSQL** (Relational data)
- **Redis** (Task queue & session memory)
- **Qdrant** (Vector database for embeddings)

## 📦 Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- Python 3.12+
- Ollama (running locally with `llama3`)

### Setup & Run
1. **Start Infrastructure**:
   ```bash
   docker-compose up -d
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python app/main.py
   ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🛡️ Security Model
- **Permission-Based**: Every tool requires explicit user permission.
- **Explainability**: Every AI action is logged with a "Reason" and "Confidence" score.
- **Undo Engine**: Support for rolling back supported operations.

---
*Created as a high-end student portfolio project showcasing modern AI integration and UI/UX design.*
