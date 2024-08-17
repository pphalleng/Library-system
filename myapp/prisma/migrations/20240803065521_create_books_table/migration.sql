-- CreateTable
CREATE TABLE "Books" (
    "id" SERIAL NOT NULL,
    "cover_name" TEXT NOT NULL,
    "published_year" INTEGER NOT NULL,
    "category_type" TEXT NOT NULL,
    "barcode" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);
