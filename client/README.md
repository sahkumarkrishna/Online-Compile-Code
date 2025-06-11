# 🚀 CompileCode

**Power Up Your Coding Experience.**  
An interactive and seamless coding platform that supports multiple languages and tools — built with the power of the **MERN stack**.

---

## 🌟 Overview

**CompileCode** is a web-based development environment designed for learners, developers, and teams to code, test, and preview projects across popular programming languages without needing to install compilers locally.

### 🛠️ Key Features

- 🎥 Language-specific demo videos (Python, JavaScript, C, C++, Java)
- 🖥️ Live code preview and real-time execution
- 🤖 AI-based autocomplete & syntax help
- ☁️ Cloud-synced workspace
- 👥 Team collaboration and version control
- 🌐 Cross-language switching in one click

---

## 🧱 Tech Stack (MERN)

| Layer        | Tech                 |
|--------------|----------------------|
| **Frontend** | React.js, Tailwind CSS, Shadcn UI |
| **Backend**  | Node.js, Express.js  |
| **Database** | MongoDB Atlas        |
| **Auth**     | JWT Authentication   |
| **DevOps**   | Render / Vercel + GitHub Actions |
| **Storage**  | Cloudinary (for assets) |

---



yaml
Copy
Edit

---

## 🔐 Environment Variables

### 📦 Backend (`/backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/compilecode
JWT_SECRET=your_jwt_secret_key

🌐 Frontend (/frontend/.env)
env
Copy
Edit
VITE_API_URL=

⚠️ Important: Never share .env files publicly. Always include them in .gitignore.

🧪 Getting Started Locally
🔧 Backend
bash
Copy
Edit
cd backend
npm install
npm run dev
🖥️ Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
💡 Inspiration
CompileCode is inspired by platforms like Replit, CodePen, and LeetCode, offering a simpler, lightweight yet powerful environment with educational features for learning and growth.

🧑‍💻 Contributors
Krishna Kumar – Full Stack Developer

Open for contributions – create a PR or submit an issue!

📜 License
This project is licensed under the MIT License. See LICENSE for details.

🚀 Power Up Your Coding Experience with CompileCode — designed for developers, by developers.

yaml
Copy
Edit

---

Let me know if you'd like:
- A version with badges (e.g., build, license, etc.)
- Deployment instructions for Vercel / Render
- Logo or screenshot embeds  
- GitHub repo boilerplate setup (`init`, `commit`, etc.)