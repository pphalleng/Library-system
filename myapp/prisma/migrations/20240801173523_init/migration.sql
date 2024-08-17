-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
