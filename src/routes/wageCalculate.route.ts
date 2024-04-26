import express, { Request, Response } from "express";
import { update } from "../controllers/wallets.controller";
import { getUserById } from "../models/user";

const router = express.Router();

router.post(
  "/users/:userId/wage-calculation",
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    // Check required parameter
    if (!userId) {
      throw new Error("Invalid parameter");
    }

    const user = await getUserById(userId);
    // Check existing user in the database
    if (!user) {
      throw new Error("User Not Found!!");
    }

    // Call controller function for calculate and update data into database
    const resp = await update(user, req);
    res.json({ data: { ...resp } });
  },
);

export default router;
