import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const options = {
    method: "POST",
    headers: {
      "Client-ID": process.env.IGDB_ID ?? "",
      Authorization: `Bearer ${process.env.IGDB_TOKEN}`,
    },
    body: "fields *; sort total_rating desc; where total_rating_count > 100;",
  };

  const data = await fetch("https://api.igdb.com/v4/games", options).then(
    (response) => response.json()
  );

  return NextResponse.json(data);
}
