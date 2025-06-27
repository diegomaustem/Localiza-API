-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "cpf" BIGINT NOT NULL,
    "rg" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "numeroCarteira" BIGINT NOT NULL,
    "tipoCarteira" TEXT NOT NULL,
    "criacaoData" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizacaoData" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_rg_key" ON "users"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_numeroCarteira_key" ON "users"("numeroCarteira");
