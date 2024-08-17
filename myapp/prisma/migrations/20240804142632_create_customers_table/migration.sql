-- CreateTable
CREATE TABLE "Customers" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "nid" TEXT NOT NULL,
    "current_address" TEXT NOT NULL,
    "membership_card_id" INTEGER NOT NULL,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customers_membership_card_id_key" ON "Customers"("membership_card_id");

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_membership_card_id_fkey" FOREIGN KEY ("membership_card_id") REFERENCES "MembershipCards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
