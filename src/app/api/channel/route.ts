import { NextRequest, NextResponse } from "next/server";
import channelData from "@/data/channel.json"; // 1. 만들어 둔 Mock 데이터 가져오기

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ data: channelData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching channel data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
