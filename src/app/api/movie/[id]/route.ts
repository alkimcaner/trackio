import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const url = `https://api.themoviedb.org/3/movie/${params.id}?language=en&append_to_response=images,videos`;

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

    const movie = await res.json();

    return NextResponse.json(movie);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 400 });
  }
}
