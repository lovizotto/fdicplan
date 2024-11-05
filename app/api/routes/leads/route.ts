import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const leads = await prisma.lead.findMany();
    return new Response(JSON.stringify(leads), { status: 200 });
  } catch (error: any) {
    console.error('Erro ao buscar leads:', error.message);
    return new Response('Failed to fetch leads', { status: 500 });
  }
}

export async function POST(req: Request) {
  const {
    cityName,
    companyName,
    phone,
    eventName,
    contactPerson,
    email,
    nextDate,
    observations,
  } = await req.json();

  try {
    const newLead = await prisma.lead.create({
      data: {
        cityName,
        companyName,
        phone,
        eventName,
        contactPerson,
        email,
        nextDate: nextDate ? new Date(new Date(nextDate).toISOString()) : null, // Ajuste aqui
        observations,
        // O campo createdAt será preenchido automaticamente pelo Prisma
      },
    });
    return new Response(JSON.stringify(newLead), { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar lead:', error.message);
    return new Response(`Failed to create lead: ${error.message}`, {
      status: 500,
    });
  }
}

export async function PUT(req: Request) {
  const {
    id,
    cityName,
    companyName,
    phone,
    eventName,
    contactPerson,
    email,
    nextDate,
    observations,
  } = await req.json();

  if (!id) {
    return new Response('ID is required', { status: 400 });
  }

  try {
    const updatedLead = await prisma.lead.update({
      where: { id },
      data: {
        cityName,
        companyName,
        phone,
        eventName,
        contactPerson,
        email,
        nextDate: nextDate ? new Date(new Date(nextDate).toISOString()) : null, // Ajuste aqui
        observations,
        // O campo createdAt não é alterado durante a atualização
      },
    });
    return new Response(JSON.stringify(updatedLead), { status: 200 });
  } catch (error: any) {
    console.error('Erro ao atualizar lead:', error.message);
    return new Response(`Failed to update lead: ${error.message}`, {
      status: 500,
    });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return new Response('ID is required', { status: 400 });
  }

  try {
    await prisma.lead.delete({
      where: { id },
    });
    return new Response(null, { status: 204 });
  } catch (error: any) {
    console.error('Erro ao deletar lead:', error.message);
    return new Response(`Failed to delete lead: ${error.message}`, {
      status: 500,
    });
  }
}
