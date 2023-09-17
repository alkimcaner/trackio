import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Client-ID": process.env.IGDB_ID ?? "",
        Authorization: `Bearer ${process.env.IGDB_TOKEN}`,
      },
      body: request.body,
      duplex: "half",
    };

    const data = await fetch("https://api.igdb.com/v4/games", options).then(
      (response) => response.json()
    );
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something unexpected happened." });
  }
}
