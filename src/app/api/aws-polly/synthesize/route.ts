import { SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { client, voiceId } from "../client";

export async function POST(req: Request): Promise<Response> {
  const { text } = await req.json();
  const { AudioStream } = await client.send(
    new SynthesizeSpeechCommand({
      OutputFormat: "mp3",
      Text: text,
      TextType: "text",
      VoiceId: voiceId,
    })
  );

  const webStream = AudioStream?.transformToWebStream();

  return new Response(webStream, { headers: { "Content-Type": "audio/mpeg" } });
}
