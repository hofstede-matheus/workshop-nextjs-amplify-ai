import { SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { client, voiceId } from "../client";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  const { text } = await req.json();
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

  return NextResponse.json({
    speechMarks: parsedResult,
  });
}
