import express from "express";
import { register, login } from "../controllers/authcontroller";

const router = express.Router();

router.post("/register", async (req, res) => {
  await register(req, res);
});

router.post("/login", async (req, res) => {
  await login(req, res);
});

export default router;
