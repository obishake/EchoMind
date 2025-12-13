import express from "express";
import http from "http";
import cors from "cors";
import blogRoute from "./routes/blogRoute.js";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import commentRoute from "./routes/commentRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const server = http.createServer(app);

// Middelware
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
    })
);

const port = process.env.PORT || 5050;

app.get("/", (req, res) => {
    res.send("server is running....");
});

app.use("/api/blog", blogRoute);
app.use("/api/auth", userRouter);
app.use("/api/comment", commentRoute);

await connectDB();

app.listen(port, () => {
    console.log("server is starting at port " + port);
});
