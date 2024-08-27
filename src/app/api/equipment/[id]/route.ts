import { NextResponse } from "next/server";

import { db } from "@/data/db";
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log("Request received for room ID:", params.id);

  const id = params.id;

  try {
    const data = await db.room.findUnique({
      select: {
        id: true,
        name: true,
        roomEquipments: {
          select: {
            equipment: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
      where: {
        id: Number(id),
      },
    });

    console.log("Data fetched:", data);
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching room data:", error);
    return NextResponse.json(
      { error: "Failed to fetch room data" },
      { status: 500 }
    );
  }
}
