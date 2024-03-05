export async function GET(req: Request) {
  try {
    if (
      req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return new Response("Unauthorized", { status: 401 });
    }

    const generateIGDBToken = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_ID}&client_secret=${process.env.IGDB_SECRET}&grant_type=client_credentials`,
      { method: "POST" }
    );
    const token = await generateIGDBToken.json();

    const updateEdgeConfig = await fetch(
      "https://api.vercel.com/v1/edge-config/ecfg_z03yulkb694mibkxmd4tg7t3grzw/items",
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              operation: "update",
              key: "igdb_token",
              value: token.access_token,
            },
          ],
        }),
      }
    );

    const result = await updateEdgeConfig.json();
    return Response.json(result);
  } catch (error) {
    console.error(error);
    return new Response("Error", { status: 400 });
  }
}
