-- CreateTable
CREATE TABLE "vehicles" (
    "id" TEXT NOT NULL,
    "chassi" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "cor" TEXT NOT NULL,
    "documento_crlv" TEXT NOT NULL,
    "cilindrada" INTEGER NOT NULL,
    "criacaoData" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizacaoData" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_id_key" ON "vehicles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_chassi_key" ON "vehicles"("chassi");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_placa_key" ON "vehicles"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_documento_crlv_key" ON "vehicles"("documento_crlv");
