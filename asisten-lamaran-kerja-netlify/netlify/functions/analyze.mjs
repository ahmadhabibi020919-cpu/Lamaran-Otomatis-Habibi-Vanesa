export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const key = Netlify.env.get("ANTHROPIC_API_KEY");
  if (!key) return Response.json({ error: "ANTHROPIC_API_KEY belum diatur" }, { status: 500 });
  const { prompt } = await req.json().catch(() => ({}));
  if (!prompt || prompt.length > 30000) return Response.json({ error: "prompt tidak valid" }, { status: 400 });
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: Netlify.env.get("ANTHROPIC_MODEL") || "claude-sonnet-5-5",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!r.ok) return Response.json({ error: "gagal menghubungi AI" }, { status: 502 });
  const d = await r.json();
  return Response.json({ text: d.content.filter((b) => b.type === "text").map((b) => b.text).join("") });
};
