-- AlterTable
ALTER TABLE "user_courses" ADD COLUMN     "time" TEXT;

-- CreateTable
CREATE TABLE "user_course_payment" (
    "user_course_payment_id" TEXT NOT NULL,
    "user_course_id" TEXT NOT NULL,
    "iyzico_payment_id" TEXT NOT NULL,
    "paid_price" DECIMAL(65,30) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "iyzico_commission_fee" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "user_course_payment_pkey" PRIMARY KEY ("user_course_payment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_course_payment_user_course_id_key" ON "user_course_payment"("user_course_id");

-- AddForeignKey
ALTER TABLE "user_course_payment" ADD CONSTRAINT "user_course_payment_user_course_id_fkey" FOREIGN KEY ("user_course_id") REFERENCES "user_courses"("user_course_id") ON DELETE RESTRICT ON UPDATE CASCADE;
