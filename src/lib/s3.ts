import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand
} from "@aws-sdk/client-s3"

export const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})

export async function uploadFileToS3(
  file: Buffer,
  fileName: string,
  contentType: string
) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: fileName,
    Body: file,
    ContentType: contentType
  }

  const command = new PutObjectCommand(params)
  await s3.send(command)

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
}

export async function deleteFileFromS3(fileName: string) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: fileName
  }

  const command = new DeleteObjectCommand(params)
  await s3.send(command)
}
