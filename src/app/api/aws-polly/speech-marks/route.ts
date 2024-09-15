import { NextResponse } from "next/server";
import { getSpeechMarksFromText } from "../../../../services/aws/polly/speech-marks";

export async function POST(req: Request): Promise<Response> {
  const { text } = await req.json();
  const speechMarks = await getSpeechMarksFromText(text);

  return NextResponse.json({
    speechMarks,
  });
}
