import { NextRequest, NextResponse } from "next/server";
import videoData from "@/data/videos.json";
import { VideoData } from "@/types/videos";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "16", 10);

    const sortType = searchParams.get("sort") || "recent";

    const sortedData: VideoData[] = [...videoData];

    if (sortType === "recent") {
      sortedData.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } else if (sortType === "popular") {
      sortedData.sort(
        (a, b) =>
          parseInt(b.viewCount.replace(/,/g, "")) -
          parseInt(a.viewCount.replace(/,/g, ""))
      );
    } else if (sortType === "oldest") {
      sortedData.sort(
        (a, b) =>
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = sortedData.slice(startIndex, endIndex);

    const totalItems = sortedData.length;
    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = endIndex < totalItems;

    const metadata = {
      totalItems,
      totalPages,
      hasNextPage,
    };

    return NextResponse.json(
      { data: paginatedData, meta: metadata },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching channel data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
