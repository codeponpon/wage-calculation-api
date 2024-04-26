import { getUserById } from "../models/user";
import { updateWalletById } from "../models/wallet";
import { IWageCalculation } from "../types";

export const wageCalculation = async ({
  workingType,
  workingDays,
  user,
}: IWageCalculation) => {
  if (!user?.userInformation) {
    throw new Error("User information not found");
  }

  if (!user?.wallet) {
    throw new Error("User's wallet not found");
  }

  let wage;
  // Calculate the wage for daily type
  if (workingType == "daily") {
    const rate = Number(process.env.DAILY_RATE);
    wage = rate * workingDays;
  }
  // Calculate the wage for monthly type
  else {
    const salary = Number(user.userInformation.salary);
    wage = (salary / 30) * workingDays;
  }

  // Update user's wallet balance according to the calculation above
  await updateWalletById({ id: user.wallet.id, balance: wage });
  return { balance: wage };
};

export default wageCalculation;
