import { PollyClient, VoiceId } from "@aws-sdk/client-polly";

export const client = new PollyClient({
  region: "us-west-2",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID || "",
    secretAccessKey: process.env.SECRET_ACCESS_KEY || "",
  },
});

export const voiceId: VoiceId = "Joanna";
