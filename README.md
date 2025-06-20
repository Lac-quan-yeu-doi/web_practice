# Web Practice

A practice web application built with: **MongoDB**, **Express.js**, **React**, and **Node.js**. This project is organized with a clear separation of frontend and backend code, ideal for full-stack development.

---

## 📁 Project Structure

```
web_practice/
├── backend/             # Node.js + Express backend
│   ├── config/          # Database configuration
│   ├── controller/      # Route controllers
│   ├── models/          # Mongoose models
│   ├── route/           # API route definitions
│   └── server.js        # Express server entry point
├── frontend/            # React frontend (Vite-based)
│   ├── public/          # Static assets
│   └── src/             # React components and pages
├── index.html           # Root HTML for Vite (optional in some setups)
├── eslint.config.js     # ESLint configuration
├── package-lock.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Lac-quan-yeu-doi/web_practice.git
cd web_practice
```

### 2. Install dependencies

Install backend and frontend dependencies:

```bash
cd web_practice
npm run setup
```

### 3. Set up environment variables

Create a `.env` file in the `backend/` directory:

```env
# Whatever port you like
PORT=5000 
MONGO_URI=your_mongodb_connection_string
```

> Replace `your_mongodb_connection_string` with your actual MongoDB Atlas URI or local Mongo URI.

### 4. Run the project

#### Development mode (with hot reload):

```bash
cd web_practice

# Run backend
npm run dev

# In another terminal, run frontend
npm run dev --prefix frontend
```

#### Production mode (build & start):

```bash
cd web_practice

# Build frontend and install dependencies
npm run build

# Start server with frontend assets served
npm run start
```

---

## 🛠 Tech

- **MongoDB** – NoSQL database
- **Express.js** – Web framework for Node.js
- **React** – Frontend UI framework
- **Node.js** – Server runtime
- **Vite** – Fast frontend bundler
- **Mongoose** – MongoDB ODM
- **Nodemon** – Live server reload during development

---

## 🙌 Author

Made by [@Lac-quan-yeu-doi](https://github.com/Lac-quan-yeu-doi)

---

## 📄 License

This project is licensed under the MIT License.
