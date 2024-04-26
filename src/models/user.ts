import prisma from "../../libs/prisma";

// Get all user model with relational tables
export const getUsers = async () => {
  const data = await prisma.users.findMany({
    include: {
      positions: { include: { position: true } },
      userInformation: true,
      wallet: true,
    },
  });
  return data;
};

// Get user by id
export const getUserById = async (id: string) => {
  const data = await prisma.users.findUnique({
    where: { id },
    include: {
      positions: { include: { position: true } },
      userInformation: true,
      wallet: true,
    },
  });
  return data;
};
