import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query");

    const url = `https://api.themoviedb.org/3/search/tv?language=en&query=${query}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Failed to reach TMDB API");
    }

    const tv = await res.json();

    return NextResponse.json(tv);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 400 });
  }
}
