# Note MERN Application

A professional, full-stack note-taking application built with the MERN stack (MongoDB, Express, React, Node.js). This project features a modern responsive UI, persistent storage, and integrated rate limiting for API security.

## Features

- **Full CRUD Operations**: Create, read, update, and delete notes.
- **Modern UI/UX**: Built with React 19, Tailwind CSS 4, and DaisyUI 5 for a sleek, dark-themed interface.
- **Real-time Feedback**: Integrated toasts for user actions using `react-hot-toast`.
- **API Rate Limiting**: Security layer using Upstash Redis to prevent API abuse (5 requests per 10 seconds).
- **Responsive Design**: Fully functional across desktop, tablet, and mobile devices.
- **Dynamic Routing**: Seamless navigation with React Router 7.

## Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4, DaisyUI 5
- **Icons**: Lucide React
- **Routing**: React Router 7
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: MongoDB (via Mongoose)
- **Rate Limiting**: Upstash Redis (@upstash/ratelimit)
- **Environment Management**: Dotenv

## Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB account and connection string
- Upstash account (for Redis rate limiting)

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd note_mern
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

## Configuration

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

## Running the Application

### Start the Backend
```bash
cd backend
npm run dev
```
The server will start on `http://localhost:5001`.

### Start the Frontend
```bash
cd frontend
npm run dev
```
The application will be available at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Fetch all notes |
| GET | `/api/notes/:id` | Fetch a single note by ID |
| POST | `/api/notes` | Create a new note |
| PUT | `/api/notes/:id` | Update an existing note |
| DELETE | `/api/notes/:id` | Delete a note |

## Rate Limiting

This application implements a sliding window rate limiter via Upstash Redis.
- **Limit**: 5 requests
- **Window**: 10 seconds
- **Behavior**: If the limit is exceeded, the server returns a `429 Too Many Requests` status, and the frontend displays a rate-limited UI.

## License

Distributed under the ISC License.
