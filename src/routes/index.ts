import express from "express";
import path from "path";

const router = express.Router();

const views = path.join(__dirname, "/../views");

router.get("/", (req, res) => {
  res.sendFile(views + "/index.html");
});

router.get("/register", (req, res) => {
  res.sendFile(views + "/register.html");
});

export default router;
