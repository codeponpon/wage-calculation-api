import { Request } from "express";
import wageCalculation from "../services/wageCalculation";
import { IWageCalculation } from "../types";
import { Users } from "@prisma/client";

export const update = async (user: Users, req: Request) => {
  const { workingType, workingDays }: IWageCalculation = req.body;
  // Call serivce to do calculation
  const wallet = await wageCalculation({
    workingType,
    workingDays,
    user,
  });

  return { userId: user.id, balance: wallet.balance };
};
