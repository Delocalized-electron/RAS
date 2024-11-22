import mongoose from "mongoose";

import express from "express";

const app = express();
const port = 3000;

app.get("/", (res, req) => {
  res.send("Hello world");
});

let mongoDB = await mongoose.connect("mongodb://localhost:27017/");

app.listen(port, () => {
  console.log(`Backend server runnning on port ${port}`);
});
