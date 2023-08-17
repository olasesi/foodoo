import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./api/routes/auth.js";
import usersRoute from "./api/routes/users.js";

const app = express();
dotenv.config();

const dbName = "foodoo"; // Replace with your desired database name

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://olusesia:IFS8BrlwRyIOpMdz@foodoocluster.kmjbhky.mongodb.net/${dbName}`
    );
    console.log("connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

const followconnection = () => {
  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
  });
  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
  });
};

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);

// app.use("/", (req, res) => {
//   res.status(200).send("User has been registered successfully");
// });

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  connect();
  followconnection();
  console.log("connected to backend");
});
