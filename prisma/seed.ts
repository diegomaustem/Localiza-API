import prisma from "../src/lib/prisma";

async function main() {
  console.log("|--- RUNNING SEEDS ---|");

  await prisma.status_users.upsert({
    where: { status: "Ativo" },
    update: {},
    create: { status: "Ativo", description: "Usuário ativo no sistema." },
  });
  await prisma.status_users.upsert({
    where: { status: "Inativo" },
    update: {},
    create: {
      status: "Inativo",
      description: "Usuário inativo no sistema.",
    },
  });
  await prisma.status_users.upsert({
    where: { status: "Bloqueado" },
    update: {},
    create: {
      status: "Bloqueado",
      description: "Usuário bloqueado no sistema.",
    },
  });
  console.log("StatusUsers : OK");

  await prisma.privileges.upsert({
    where: { name: "Admin" },
    update: {},
    create: { name: "Admin" },
  });
  await prisma.privileges.upsert({
    where: { name: "Gerente" },
    update: {},
    create: { name: "Gerente" },
  });
  await prisma.privileges.upsert({
    where: { name: "Funcionario" },
    update: {},
    create: { name: "Funcionario" },
  });
  console.log("Privileges : OK");

  const states = [
    { name: "Acre", abbreviation: "AC" },
    { name: "Alagoas", abbreviation: "AL" },
    { name: "Amapá", abbreviation: "AP" },
    { name: "Amazonas", abbreviation: "AM" },
    { name: "Bahia", abbreviation: "BA" },
    { name: "Ceará", abbreviation: "CE" },
    { name: "Distrito Federal", abbreviation: "DF" },
    { name: "Espírito Santo", abbreviation: "ES" },
    { name: "Goiás", abbreviation: "GO" },
    { name: "Maranhão", abbreviation: "MA" },
    { name: "Mato Grosso", abbreviation: "MT" },
    { name: "Mato Grosso do Sul", abbreviation: "MS" },
    { name: "Minas Gerais", abbreviation: "MG" },
    { name: "Pará", abbreviation: "PA" },
    { name: "Paraíba", abbreviation: "PB" },
    { name: "Paraná", abbreviation: "PR" },
    { name: "Pernambuco", abbreviation: "PE" },
    { name: "Piauí", abbreviation: "PI" },
    { name: "Rio de Janeiro", abbreviation: "RJ" },
    { name: "Rio Grande do Norte", abbreviation: "RN" },
    { name: "Rio Grande do Sul", abbreviation: "RS" },
    { name: "Rondônia", abbreviation: "RO" },
    { name: "Roraima", abbreviation: "RR" },
    { name: "Santa Catarina", abbreviation: "SC" },
    { name: "São Paulo", abbreviation: "SP" },
    { name: "Sergipe", abbreviation: "SE" },
    { name: "Tocantins", abbreviation: "TO" },
  ];

  await Promise.all(
    states.map((state) =>
      prisma.states.upsert({
        where: { abbreviation: state.abbreviation },
        update: { name: state.name },
        create: { name: state.name, abbreviation: state.abbreviation },
      })
    )
  );
  console.log("States : OK");

  await prisma.status_customers.upsert({
    where: { status: "Ativo" },
    update: {},
    create: { status: "Ativo", description: "Cliente ativo no sistema." },
  });
  await prisma.status_customers.upsert({
    where: { status: "Inativo" },
    update: {},
    create: {
      status: "Inativo",
      description: "Cliente inativo no sistema.",
    },
  });
  await prisma.status_customers.upsert({
    where: { status: "Bloqueado" },
    update: {},
    create: {
      status: "Bloqueado",
      description: "Cliente bloqueado no sistema.",
    },
  });
  console.log("StatusCustomers : OK");

  await prisma.honors.upsert({
    where: { name: "Ouro" },
    update: {},
    create: { name: "Ouro", level: 1000 },
  });
  await prisma.honors.upsert({
    where: { name: "Prata" },
    update: {},
    create: {
      name: "Prata",
      level: 500,
    },
  });
  await prisma.honors.upsert({
    where: { name: "Bronze" },
    update: {},
    create: {
      name: "Bronze",
      level: 100,
    },
  });
  console.log("Honors : OK");

  await prisma.groups.upsert({
    where: { name: "A" },
    update: {},
    create: { name: "A", description: "Econômico básico (manual, 1.0)" },
  });
  await prisma.groups.upsert({
    where: { name: "B" },
    update: {},
    create: { name: "B", description: "Hatch compacto (manual, 1.0 ou 1.3)" },
  });
  await prisma.groups.upsert({
    where: { name: "C" },
    update: {},
    create: {
      name: "C",
      description: "Hatch médio (automático, 1.0 turbo)",
    },
  });
  await prisma.groups.upsert({
    where: { name: "D" },
    update: {},
    create: {
      name: "D",
      description: "SUV compacto",
    },
  });
  console.log("Groups : OK");

  await prisma.categories.upsert({
    where: { name: "Hatchback" },
    update: {},
    create: {
      name: "Hatchback",
      value: 228,
    },
  });
  await prisma.categories.upsert({
    where: { name: "Sedan" },
    update: {},
    create: {
      name: "Sedan",
      value: 328,
    },
  });
  await prisma.categories.upsert({
    where: { name: "SUV" },
    update: {},
    create: {
      name: "SUV",
      value: 328,
    },
  });
  console.log("Categories : OK");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
