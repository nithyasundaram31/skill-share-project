# Skill Share Resource Platform

The Skill Share Resource Platform is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed to help users share, discover, and bookmark educational resources like articles, videos, and PDFs.

The platform provides two roles:

Admin → Manage terms, resources, and categories.

User → Explore resources and bookmark favorites.

## Features
### Admin Features

Resource Management → Add, update, delete resources.

Category & Term Management → Organize resources into structured topics.

Analytics → View usage stats (likes, bookmarks).

### User Features

Resource Browsing → Explore shared resources (PDFs, videos, links).

Bookmarking → Save favorite resources for later.

Likes & Interactions → Engage with resources through likes.

Personal Dashboard → View and organize bookmarked resources.

### Tech Stack
## Frontend

React.js → For building the user interface.

Redux Toolkit → For state management.

React Router → For navigation.

Tailwind CSS → For modern, responsive UI.

Axios → For API requests.

## Backend

Node.js + Express.js → Server & REST API.

MongoDB + Mongoose → Database.

JWT Authentication → Secure routes and user roles.

bcrypt.js → For password hashing.

## Prerequisites

Install Node.js

Install MongoDB locally or use MongoDB Atlas (cloud-based)

## Backend Setup

1. **Clone the Repository**:
  

1. Clone the repository to your local machine:

```bash
git clone https://github.com/nithyasundaram31/backend
cd backend
```

**Install Dependencies:**

```bash
npm install
```

**Environment Variables**

To configure the application, you need to set up environment variables. Create a .env file in the root of your backend directory with the following:


```bash
MONGO_URI=mongodb://localhost:5173/online-assessmet-platform
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRE=1h
```

**MONGO_URI:** 
Your MongoDB connection string.

**JWT_SECRET:** 
A secret key for JWT token generation.

**JWT_EXPIRE:** 
The duration for which the JWT is valid (e.g., 1 hour, 7d).

**Start the Backend Server**
To start the development server, run the following command:

```bash
npm run dev
``` 

## Frontend Setup

1. **Clone the Repository**:
   ```bash
git clone https://github.com/nithyasundaram31/frontend
cd frontend


2. **Install Dependencies**
```bash
npm install
```

3. **Environment Variables:** Create a .env file in the root of your frontend directory and configure:
```bash
VITE_API_URL=https://skill-share-project-3.onrender.com
```

4. **Start the Application:**
``` bash
npm run dev
```


Runs at: http://localhost:5173

### Views
## Admin

Manage resources (add, edit, delete)

Organize categories & terms

View analytics (likes, bookmarks)

## User

Browse & search resources

Bookmark and like content

Access personal dashboard

**Admin Credentials (for testing)**
Email: admin@gmail.com  
Password: admin123