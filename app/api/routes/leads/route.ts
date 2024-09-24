import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const leads = await prisma.lead.findMany();
    return new Response(JSON.stringify(leads), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch leads', { status: 500 });
  }
}

export async function POST(req) {
  const { name, email, phone, contact, lastHistory, status } = await req.json();
  try {
    const newLead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        contact,
        lastHistory,
        status,
      },
    });
    return new Response(JSON.stringify(newLead), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to create lead', { status: 500 });
  }
}

export async function PUT(req) {
  const { id, name, email, phone, contact, lastHistory, status } =
    await req.json();

  if (!id) {
    return new Response('ID is required', { status: 400 });
  }

  try {
    const updatedLead = await prisma.lead.update({
      where: { id },
      data: { name, email, phone, contact, lastHistory, status },
    });
    return new Response(JSON.stringify(updatedLead), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to update lead', { status: 500 });
  }
}

export async function DELETE(req) {
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
