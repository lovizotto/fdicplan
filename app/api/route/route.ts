import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const client = await prisma.client.create({ data });
    return NextResponse.json(client);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function GET() {
  try {
    const clients = await prisma.client.findMany();
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PUT(req: Request) {
  const { id, ...data } = await req.json();
  try {
    const client = await prisma.client.update({
      where: { id },
      data,
    });
    return NextResponse.json(client);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    await prisma.client.delete({ where: { id } });
    return NextResponse.json({ message: 'Cliente deletado com sucesso.' });
  } catch (error) {
    return NextResponse.error();
  }
}
