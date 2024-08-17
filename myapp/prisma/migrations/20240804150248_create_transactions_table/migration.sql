-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "created_on" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER NOT NULL,
    "last_updated_on" TIMESTAMP(3) NOT NULL,
    "last_updated_by" INTEGER NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Librarians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_last_updated_by_fkey" FOREIGN KEY ("last_updated_by") REFERENCES "Librarians"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
