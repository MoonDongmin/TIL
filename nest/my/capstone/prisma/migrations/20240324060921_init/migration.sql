-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "countty" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL,
    "imageId" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Record_id_key" ON "Record"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Image_imageId_key" ON "Image"("imageId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_id_fkey" FOREIGN KEY ("id") REFERENCES "Record"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
