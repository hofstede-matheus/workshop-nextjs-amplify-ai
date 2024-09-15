import { synthesizeText } from "../../../../services/aws/polly/synthesize";

export async function POST(req: Request): Promise<Response> {
  const { text } = await req.json();
  const synthesizedText = await synthesizeText(text);

  return new Response(synthesizedText, {
    headers: { "Content-Type": "audio/mpeg" },
  });
}
