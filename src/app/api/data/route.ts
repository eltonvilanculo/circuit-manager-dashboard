import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { indexRooms } from "@/data/db/queries/room.query";
import { indexEquipments } from "@/data/db/queries/equipment.query";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const rooms = await indexRooms();
  const equipments = await indexEquipments();
  return NextResponse.json({
    rooms,
    equipments,
  });
}
