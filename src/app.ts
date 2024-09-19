import prisma from './prisma';

// Função para criar um novo cliente
async function createClient() {
  const client = await prisma.client.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      contact: 'Friend',
      lastHistory: 'Last contact: 2024-09-01',
      status: 'Active',
    },
  });
  console.log('Created client:', client);
}

// Função para listar todos os clientes
async function listClients() {
  const clients = await prisma.client.findMany();
  console.log('Clients:', clients);
}

// Função principal
async function main() {
  await createClient();
  await listClients();
}

// Executar a função principal
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
