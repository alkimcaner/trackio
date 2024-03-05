import { get } from "@vercel/edge-config";

export const getGames = async (payload: string) => {
  try {
    if (!payload) return [];

    const options = {
      method: "POST",
      headers: {
        "Client-ID": process.env.IGDB_ID ?? "",
        Authorization: `Bearer ${await get("igdb_token")}`,
      },
      body: payload,
    };

    const res = await fetch("https://api.igdb.com/v4/games", options);

    return res.json();
  } catch (error) {
    console.error(error);
    return;
  }
};
