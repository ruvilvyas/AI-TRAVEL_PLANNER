import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Itinerary from "@/models/Itinerary";

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { destination, budget, startDate, endDate, interests } = await req.json();

    const itinerary = new Itinerary({
      destination,
      budget,
      startDate,
      endDate,
      interests,
    });

    await itinerary.save();

    return NextResponse.json(itinerary, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to save itinerary", error: (error as Error).message }, { status: 500 });
  }
}
