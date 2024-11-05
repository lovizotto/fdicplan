import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const leads = await prisma.lead.findMany();
    return new Response(JSON.stringify(leads), { status: 200 });
  } catch (error) {
    console.error(error);
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
        nextDate: new Date(nextDate),
        observations,
      },
    });
    return new Response(JSON.stringify(newLead), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to create lead', { status: 500 });
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
        nextDate: new Date(nextDate),
        observations,
      },
    });
    return new Response(JSON.stringify(updatedLead), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to update lead', { status: 500 });
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
  } catch (error) {
    console.error(error);
    return new Response('Failed to delete lead', { status: 500 });
  }
}
