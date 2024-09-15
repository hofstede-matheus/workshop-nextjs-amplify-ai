import { SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { client, voiceId } from "../client";

export async function synthesizeText(
  text: string
): Promise<ReadableStream | undefined> {
  const { AudioStream } = await client.send(
    new SynthesizeSpeechCommand({
      OutputFormat: "mp3",
      Text: text,
      TextType: "text",
      VoiceId: voiceId,
    })
  );

  return AudioStream?.transformToWebStream();
}
