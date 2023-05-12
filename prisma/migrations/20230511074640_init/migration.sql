-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "short" TEXT NOT NULL,
    "long" TEXT NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_short_key" ON "urls"("short");

-- CreateIndex
CREATE UNIQUE INDEX "urls_long_key" ON "urls"("long");
