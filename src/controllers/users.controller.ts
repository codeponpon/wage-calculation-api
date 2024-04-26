import { getUsers } from "../models/user";

export const index = async () => {
  // Call getUsers function from model
  const users = await getUsers();
  return users;
};
