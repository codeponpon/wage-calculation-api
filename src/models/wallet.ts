import prisma from "../../libs/prisma";
import { IWallet } from "../types";

// Update wallet's balance
export const updateWalletById = async ({ id, balance }: IWallet) => {
  const resp = await prisma.wallet.update({
    where: { id },
    data: { balance },
  });
  return resp;
};
