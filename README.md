# Clipzy

A modern, full-stack video sharing platform inspired by YouTube Shorts. Built with React, Vite, Tailwind CSS, Express, MongoDB, and Cloudinary. Features authentication, video upload, comments, and a responsive, theme-aware UI.

---

## Features

- 🔐 **Authentication**: Sign up, login, and JWT-protected routes
- 🎬 **Video Upload**: Upload short videos (stored on Cloudinary)
- 🏠 **Shorts Feed**: Infinite scroll, like, and comment on videos
- 💬 **Comments**: Real-time comment system per video
- 🌗 **Dark/Light Theme**: Toggleable, consistent UI with Tailwind CSS
- 👤 **Profile Page**: View your uploads and info
- ⚡ **Modern Stack**: React + Vite frontend, Express + MongoDB backend

---

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS (with dark mode)
- React Router DOM
- Axios

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- Cloudinary (video storage)
- Multer & Multer-Storage-Cloudinary (file uploads)
- JWT (authentication)
- CORS, dotenv

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Cloudinary account (for video storage)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/clipzy.git
cd clipzy
```

### 2. Setup Backend
```bash
cd backend
npm install
# Create .env (see below)
npm run dev
```

#### Backend .env Example
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

#### Frontend .env Example
```
VITE_API_URL=http://localhost:5000/api
```

---

## Folder Structure

```
clipzy/
  backend/      # Express API, MongoDB, Cloudinary
  frontend/     # React app, Tailwind CSS, Vite
```

---

## Scripts

### Backend
- `npm run dev` — Start backend with nodemon
- `npm start` — Start backend (production)

### Frontend
- `npm run dev` — Start Vite dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

---

## Deployment
- Configure environment variables for production
- Use services like Vercel/Netlify (frontend) and Render/Heroku (backend)
- Set up CORS and secure secrets

---

## License

MIT

---

## Credits

- Built by [Your Name](https://github.com/yourusername)
- Inspired by YouTube Shorts
- Uses open source libraries: React, Tailwind CSS, Express, MongoDB, Cloudinary

---

## Screenshots



---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---



