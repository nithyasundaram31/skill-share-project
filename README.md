📚 Skill Share Resource Platform

The Skill Share Resource Platform is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed to help users share, discover, and bookmark educational resources like articles, videos, and PDFs.

The platform provides two roles:

Admin → Manage Terms, resources, categories.

User → Explore resources, bookmark favorites .

*** Features***
 ***Admin Features:***

Resource Management: Add, update, delete resources.

Category & Term Management: Organize resources into structured topics.

Analytics: View usage stats (likes, bookmarks).

 ***User Features:***

Resource Browsing: Explore shared resources (PDFs, videos, links).

Bookmarking: Save favorite resources for later.

Likes & Interactions: Engage with resources through likes.

Personal Dashboard: View and organize bookmarked resources.

**Tech Stack**

**Frontend:**

React.js → For building the user interface.

Redux Toolkit → For state management.

React Router → For navigation.

Tailwind CSS → For modern, responsive UI.

Axios → For API requests.

**Backend:**

Node.js + Express.js → Server & REST API.

MongoDB + Mongoose → Database.

JWT Authentication → Secure routes and user roles.

bcrypt.js → For password hashing.

📋 Prerequisites

Install Node.js

Install MongoDB locally or use MongoDB Atlas (cloud-based)

**Setup**
🔹 Backend Setup

Clone the repository:

git clone https://github.com/your-username/project-backend
cd backend


Install dependencies:

npm install


Create a .env file in the backend root:

MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret
JWT_EXPIRE=7d


Start the backend:

npm start


→ Runs at: http://localhost:5000/api

*** Frontend Setup***

Clone the repository:

git clone https://github.com/nithyasundaram31/frontend
cd frontend


Install dependencies:

npm install


Create a .env file in the frontend root:

VITE_API_URL=https://skill-share-project-3.onrender.com


Start the frontend:

npm run dev


→ Runs at: http://localhost:5173

*** Views***

*** Admin***

Manage resources (add, edit, delete)

Organize categories & terms


View analytics (likes, bookmarks, shares)

*** User**

Browse & search resources

Bookmark and like content

Access personal dashboard

🔐 Admin Credentials (for testing)
Email: admin@gmail.com  
Password: admin123  