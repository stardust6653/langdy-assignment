import { NextRequest, NextResponse } from "next/server";
import videoData from "@/data/videos.json";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ data: videoData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching channel data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
