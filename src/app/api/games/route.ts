import { get } from "@vercel/edge-config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();

    if (!body) return NextResponse.json([]);

    const options = {
      method: "POST",
      headers: {
        "Client-ID": process.env.IGDB_ID ?? "",
        Authorization: `Bearer ${await get("igdb_token")}`,
      },
      body: body,
    };

    const res = await fetch("https://api.igdb.com/v4/games", options);

    if (!res.ok) {
      throw new Error("Failed to reach IGDB API");
    }

    const games = await res.json();

    return NextResponse.json(games);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 400 });
  }
}
