import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const nombre = formData.get("name") as string;
  const correo = formData.get("email") as string;
  const mensaje = formData.get("msg") as string;

  const result = await prisma.contacto.create({
    data: {
      nombre,
      correo,
      mensaje
    }
  });

  if (!result)
    return NextResponse.json({
      message: "Error",
      status: 500
    });

  return NextResponse.json({
    message: "OK",
    status: 200,
    data: result
  });
}

export async function GET() {
  const result = await prisma.contacto.findMany();

  return NextResponse.json({ message: "OK", status: 200, data: result });
}
