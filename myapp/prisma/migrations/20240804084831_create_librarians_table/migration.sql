-- CreateTable
CREATE TABLE "Librarians" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "nid" TEXT NOT NULL,
    "current_address" TEXT NOT NULL,

    CONSTRAINT "Librarians_pkey" PRIMARY KEY ("id")
);
