import express, { json } from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";

const app = express();
/////////////////////////////
app.enable("trust proxy");
app.set("trust proxy", 1);

/////////////////////////////
const router = express.Router();
dotenv.config();

//mongodb connect
const connect = () =>
    mongoose
        .connect(process.env.MONGO)
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => {
            throw err;
        });

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

///////////////////////////////////////////////////////////////////
var corsOptions = {
    origin: [
        "https://mpxfacor-youtube-test-1.herokuapp.com/",
        "http://localhost:3000",
    ],
    credentials: true,
};
app.use(cors(corsOptions));

//routes
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";

    return res.status(status).json({
        success: false,
        status: status,
        message: message,
    });
});

/////////////////////////////////////////////////////////////////////////
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "./build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./build", "index.html"));
});

////////////////////////////////////////////////////////////////////////////

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    connect();
    console.log("Connected");
});
