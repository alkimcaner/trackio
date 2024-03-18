import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const url = `https://api.themoviedb.org/3/tv/${params.id}`;

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

    const show = await res.json();

    return NextResponse.json(show);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 400 });
  }
}
