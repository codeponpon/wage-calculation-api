import request from "supertest";
import { faker } from "@faker-js/faker";

import { prismaMock } from "../libs/prismaMock";
import app from "../src/app";
import { Prisma } from "@prisma/client";

describe("GET /api/status", () => {
  it("should return server status", async () => {
    const res = await request(app).get("/api/status");
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Healthy!!");
  });
});

describe("POST /api/users/:userId/wage-calculation", () => {
  const email = faker.internet.email();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const sex = ["male", "female"];
  const randome = Math.floor(Math.random() * sex.length);
  const today = new Date();
  const user = {
    id: "1d21954c-6ad6-47e6-a455-b64781b817ef",
    email,
    firstName,
    lastName,
    sex: sex[randome],
    positions: [
      {
        positionId: "2167e989-d4bf-4e98-bdfc-12be27f5fd76",
        userId: "1d21954c-6ad6-47e6-a455-b64781b817ef",
        position: {
          name: faker.person.jobTitle(),
          active: true,
        },
      },
    ],
    userInformation: {
      id: "6c707350-bd37-49ed-b61a-c36d2a479ac0",
      startedDate: today,
      signedOffDate: null,
      promotedDate: today,
      salary: "30000",
    },
    wallet: {
      id: "9daa4816-eb6e-46c6-aeae-c9d6d0164139",
      balance: new Prisma.Decimal(0),
    },
    userInformationId: "6c707350-bd37-49ed-b61a-c36d2a479ac0",
    walletId: "9daa4816-eb6e-46c6-aeae-c9d6d0164139",
  };

  it("should calculate employee wage for daily type", async () => {
    prismaMock.users.findUnique.mockResolvedValue(user);
    prismaMock.wallet.update.mockResolvedValue({
      id: user.wallet.id,
      balance: user.wallet.balance,
    });
    const res = await request(app)
      .post("/api/users/1d21954c-6ad6-47e6-a455-b64781b817ef/wage-calculation")
      .send({ workingType: "daily", workingDays: 20 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("balance");
    expect(res.body.data.balance).toBeGreaterThan(0);
  });

  it("should calculate employee wage for monthly type", async () => {
    prismaMock.users.findUnique.mockResolvedValue(user);
    prismaMock.wallet.update.mockResolvedValue({
      id: user.wallet.id,
      balance: user.wallet.balance,
    });
    const res = await request(app)
      .post("/api/users/1d21954c-6ad6-47e6-a455-b64781b817ef/wage-calculation")
      .send({ workingType: "monthly", workingDays: 30 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty("balance");
    expect(res.body.data.balance).toBeGreaterThan(0);
  });

  it("should return error for invalid type", async () => {
    prismaMock.users.findUnique.mockResolvedValue(user);
    prismaMock.wallet.update.mockResolvedValue({
      id: user.wallet.id,
      balance: user.wallet.balance,
    });
    const res = await request(app)
      .post("/api/users/1d21954c-6ad6-47e6-a455-b64781b817ef/wage-calculation")
      .send({ workingType: "invalid" }); // Invalid type
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty("message");
  });
});
