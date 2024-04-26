import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const position = () => {
  return {
    name: faker.person.jobTitle(),
    active: true,
  };
};

const user = () => {
  const email = faker.internet.email();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const sex = ["male", "female"];
  const randome = Math.floor(Math.random() * sex.length);
  const today = new Date();
  const { name, active } = position();
  return {
    email,
    firstName,
    lastName,
    sex: sex[randome],
    positions: {
      create: [
        {
          position: {
            create: { name, active },
          },
        },
      ],
    },
    userInformation: {
      create: {
        startedDate: today,
        promotedDate: today,
        salary: 30000,
      },
    },
    wallet: {
      create: {
        balance: 0,
      },
    },
  };
};

const main = async () => {
  const {
    email,
    firstName,
    lastName,
    sex,
    positions,
    userInformation,
    wallet,
  } = user();
  const userRecord = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      firstName,
      lastName,
      sex,
      positions,
      userInformation,
      wallet,
    },
  });
  console.log(userRecord);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
