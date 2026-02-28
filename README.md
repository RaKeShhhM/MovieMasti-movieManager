# 🎬 MovieMasti - Cinematic Odyssey

MovieMasti is a premium, full-stack MERN movie management and streaming discovery platform. Designed with a high-end, dark-mode "Netflix-style" aesthetic, it offers a seamless experience for both cinema enthusiasts and site administrators.

🎥 Live Demo (Video Walkthrough)
<p align="center"> <a href="https://youtu.be/PxQGj0LDFmM"> <img src="https://img.youtube.com/vi/PxQGj0LDFmM/maxresdefault.jpg" width="700" alt="MovieMasti Demo Video"/> </a> </p> <p align="center"> 👉 <b>Click the thumbnail above to watch the full website demo</b> </p>
## 🚀 Core Features

📖 Project Setup Guide (Add this to your README)
🛠️ Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v18 or higher)

MongoDB (Local or Atlas Cluster)

NPM (comes with Node)

1. Clone and Install
First, grab the code and install the dependencies for both the root (backend) and the frontend folder.

Bash
git clone <your-repo-link>
cd my-movies
npm install
cd frontend && npm install
cd ..
2. Environment Variables (.env)
Create a .env file in the root directory and add the following:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
3. Folder Structure
Your project is organized by feature and responsibility:

/backend: Express server, Mongoose models, and JWT middleware.

/frontend: React (Vite) with Redux Toolkit state management.

/frontend/src/features: Contains authSlice and moviesSlice for RTK logic.

/frontend/src/api: Contains apiSlice for RTK Query endpoints.

⚡ Running the Application
You don't need to open two terminals. Because of the concurrently package in your package.json, you can launch the entire ecosystem with one command:

Bash
npm run fullstack
Backend: Runs on http://localhost:5000 (Nodemon)

Frontend: Runs on http://localhost:5173 (Vite)

🛡️ Key Features to Highlight
State Management Flow
Your app uses RTK Query to handle the server state. Instead of manual loading spinners and error variables, the apiSlice provides them automatically.

Security Layer
Authentication: Users sign up/login via bcryptjs hashing.

Authorization: The backend checks the JWT inside the cookie.

Protected Routes: React Router prevents non-admins from accessing the /admin dashboard.






