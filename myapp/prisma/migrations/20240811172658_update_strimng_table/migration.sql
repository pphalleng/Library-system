-- AlterTable
ALTER TABLE "Books" ALTER COLUMN "published_year" SET DATA TYPE TEXT,
ALTER COLUMN "barcode" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Customers" ALTER COLUMN "age" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Librarians" ALTER COLUMN "age" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "TransactionLines" ALTER COLUMN "unit_price" SET DATA TYPE TEXT,
ALTER COLUMN "qty_unit" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Transactions" ALTER COLUMN "total_amount" SET DATA TYPE TEXT;
