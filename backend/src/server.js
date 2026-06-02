import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import {connectDB} from '../src/config/db.js';
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from 'dotenv';
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if(process.env.NODE_ENV !== "production"){
  app.use(cors());
}
app.use(express.json());
app.use(rateLimiter);

// custom middleware syntax
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req url is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

if(process.env.NODE_ENV === "production"){
  app.get(/(.*)/, (req, res)=> {
    res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on http://localhost:', PORT);
  });
});






