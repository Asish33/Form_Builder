-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "content" JSONB NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);
