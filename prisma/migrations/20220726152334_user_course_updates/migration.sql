-- CreateTable
CREATE TABLE "user_address" (
    "user_course_address" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,

    CONSTRAINT "user_address_pkey" PRIMARY KEY ("user_course_address")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_address_user_id_key" ON "user_address"("user_id");

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
