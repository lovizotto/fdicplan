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
        nextDate: nextDate ? new Date(new Date(nextDate).toISOString()) : null,
        observations,
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
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extrai o ID da URL

  console.log('URL:', req.url);
  console.log('Extracted ID:', id);

  if (!id) {
    return new Response('ID is required', { status: 400 });
  }

  try {
    await prisma.lead.delete({
      where: { id: parseInt(id) }, // Certifique-se de converter para número se necessário
    });
    return new Response(null, { status: 204 }); // No Content
  } catch (error: any) {
    console.error('Erro ao deletar lead:', error.message);
    return new Response(`Failed to delete lead: ${error.message}`, {
      status: 500,
    });
  }
}
