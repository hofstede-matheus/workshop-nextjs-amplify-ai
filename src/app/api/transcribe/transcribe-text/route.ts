import { client } from "../client";
import { Command } from "@aws-sdk/client-transcribe";

export async function POST(req: Request): Promise<Response> {
  // receive mp3 file from request
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name;
  const filetype = file.type;
  console.log("Received file:", filename, filetype);

  // upload file to S3
  const uploadParams = {
    Bucket: process.env.BUCKET_NAME!,
    Key: filename,
    Body: buffer,
    ContentType: filetype,
  };

  const uploadCommand = new PutObjectCommand(uploadParams);
  await client.send(uploadCommand);
}
