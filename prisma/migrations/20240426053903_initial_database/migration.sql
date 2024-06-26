-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "sex" TEXT,
    "userInformationId" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    CONSTRAINT "Users_userInformationId_fkey" FOREIGN KEY ("userInformationId") REFERENCES "UserInformations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Users_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Positions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "PositionsOnUsers" (
    "positionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("positionId", "userId"),
    CONSTRAINT "PositionsOnUsers_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Positions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PositionsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserInformations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "startedDate" DATETIME NOT NULL,
    "signedOffDate" DATETIME,
    "promotedDate" DATETIME NOT NULL,
    "salary" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "balance" DECIMAL NOT NULL DEFAULT 0.00
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_walletId_key" ON "Users"("walletId");
