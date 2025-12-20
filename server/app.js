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

// Middelware
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cors());

app.get("/", (req, res) => {
    res.send("server is running....");
});

app.use("/blog", blogRoute);
app.use("/", userRouter);
app.use("/comment", commentRoute);

const port = process.env.PORT || 5050;

// Connect to database and start server
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log("server is starting at port " + port);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to database:", error);
        process.exit(1);
    });
