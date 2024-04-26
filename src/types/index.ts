export interface IPosition {
  id: string;
  name: string;
  active: boolean;
  userId: string;
  positionId: string;
}

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  sex?: string | null;
  positions: IPosition[];
  userInformation?: IUserInformation;
  wallet?: IWallet;
}

export interface IUserInformation {
  id: string;
  startedDate: Date;
  signoffDate?: Date;
  promotedDate: Date;
  salary: number;
  users: IUser[];
}

export interface IWageCalculation {
  user: Partial<IUser>;
  workingType: "daily" | "monthly";
  workingDays: number;
}

export interface IWallet {
  id: string;
  balance: number;
}
