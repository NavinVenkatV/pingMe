-- CreateTable
CREATE TABLE "Website" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "lastStatus" INTEGER NOT NULL,
    "lastCheckedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
