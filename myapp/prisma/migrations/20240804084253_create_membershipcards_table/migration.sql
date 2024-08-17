-- CreateTable
CREATE TABLE "MembershipCards" (
    "id" SERIAL NOT NULL,
    "cardholder_name" TEXT NOT NULL,
    "issued_date" TIMESTAMP(3) NOT NULL,
    "expired_date" TIMESTAMP(3) NOT NULL,
    "type" TEXT,

    CONSTRAINT "MembershipCards_pkey" PRIMARY KEY ("id")
);
