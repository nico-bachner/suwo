-- CreateTable
CREATE TABLE "PracticePart" (
    "id" TEXT NOT NULL,
    "instrument_name" TEXT NOT NULL,
    "library_id" TEXT NOT NULL,
    "variant" TEXT,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PracticePart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PracticePart_instrument_name_library_id_variant_key" ON "PracticePart"("instrument_name", "library_id", "variant");

-- AddForeignKey
ALTER TABLE "PracticePart" ADD CONSTRAINT "PracticePart_instrument_name_fkey" FOREIGN KEY ("instrument_name") REFERENCES "Instrument"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PracticePart" ADD CONSTRAINT "PracticePart_library_id_fkey" FOREIGN KEY ("library_id") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;
