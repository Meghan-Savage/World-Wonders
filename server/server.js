import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log("App listening on port: " + process.env.PORT);
});
