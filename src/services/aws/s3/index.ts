import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

export async function uploadToS3AndReturnUrl(
  buffer: Buffer,
  fileName: string
): Promise<string> {
  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID!,
      secretAccessKey: process.env.SECRET_ACCESS_KEY!,
    },
  });

  const ramdomFileName = Math.random().toString(36).substring(2, 15) + fileName;

  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: ramdomFileName,
    Body: buffer,
    ContentType: "image/jpg",
  });
  await client.send(uploadCommand);

  // get object
  const getSignedUrlCommand = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: ramdomFileName,
  });
  const signedUrl = await client.send(getSignedUrlCommand);

  return signedUrl.Body?.toString() || "";
}
