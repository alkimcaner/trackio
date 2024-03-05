import { get } from "@vercel/edge-config";

export async function POST(req: Request) {
  try {
    const body = await req.text();

    if (!body) return Response.json([]);

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

    return Response.json(games);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 400 });
  }
}
