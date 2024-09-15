import { SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { client, voiceId } from "../client";

export async function getSpeechMarksFromText(text: string): Promise<string[]> {
  const response = await client.send(
    new SynthesizeSpeechCommand({
      OutputFormat: "json",
      Text: text,
      TextType: "text",
      VoiceId: voiceId,
      SpeechMarkTypes: ["word"],
    })
  );

  const stringStream = await response.AudioStream?.transformToString();
  const parsedResult = stringStream
    ?.split("\n")
    ?.filter((line) => line !== "")
    .map((line) => JSON.parse(line)) as string[];

  return parsedResult;
}
