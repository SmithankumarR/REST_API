import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import router from "./router";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server running on http"//localhost:8080/');
});

const MONGO_URL =
  "mongodb+srv://Charlie:Charlie123@cluster0.tofynsb.mongodb.net/?retryWrites=true&w=majority";

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URL, {});
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
mongoose.connection.on("error", (error) =>
  console.error("MongoDB connection error:", error)
);

connectToDatabase();

app.use("/", router());
