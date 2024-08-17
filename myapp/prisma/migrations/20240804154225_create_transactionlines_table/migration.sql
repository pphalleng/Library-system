-- CreateTable
CREATE TABLE "TransactionLines" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "unit_price" INTEGER NOT NULL,
    "qty_unit" INTEGER NOT NULL,
    "total_price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "TransactionLines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TransactionLines" ADD CONSTRAINT "TransactionLines_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionLines" ADD CONSTRAINT "TransactionLines_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
