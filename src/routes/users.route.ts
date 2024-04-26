import express, { Request, Response } from "express";

import { index } from "../controllers/users.controller";

const router = express.Router();

// Get all user route
router.get("/users", async (req: Request, res: Response) => {
  const data = await index();
  res.json({ data });
});

export default router;
