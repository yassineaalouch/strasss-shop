import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { randomUUID } from "crypto"
import sharp from "sharp"

const s3 = new S3Client({
  region: process.env.AWS_REGION!.trim(),
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})

/**
 * Upload a single file to S3 after resizing and converting to WebP
 */
export async function uploadFileToS3(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // 🔹 Resize and convert to WebP (maintaining proportions)
  const resizedBuffer = await sharp(buffer)
    .webp({ quality: 
      100 })
    .toBuffer()

  const fileName = `${randomUUID()}-${file.name
    .replace(/\.[^/.]+$/, "")
    .replace(/\s+/g, "_")}.webp`

  const bucket = process.env.AWS_BUCKET_NAME!

  const uploadParams = {
    Bucket: bucket,
    Key: fileName,
    Body: resizedBuffer,
    ContentType: "image/webp"
  }

  await s3.send(new PutObjectCommand(uploadParams))

  // Encoder le nom du fichier correctement (espaces -> %20, pas +)
  const encodedFileName = encodeURIComponent(fileName)
  return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${encodedFileName}`
}

/**
 * Upload multiple files to S3
 */
export async function uploadMultipleFilesToS3(
  files: File[]
): Promise<string[]> {
  const urls: string[] = []

  for (const file of files) {
    const url = await uploadFileToS3(file)
    urls.push(url)
  }

  return urls
}
export async function deleteFileFromS3(fileName: string) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName
  }

  const command = new DeleteObjectCommand(params)
  await s3.send(command)
}

/**
 * Generate a presigned URL for direct client-side upload to S3
 * @param fileName - The name of the file to upload
 * @param contentType - The MIME type of the file (default: image/webp)
 * @param expiresIn - URL expiration time in seconds (default: 300 = 5 minutes)
 * @returns Presigned URL and the final file URL
 */
export async function generatePresignedUrl(
  fileName: string,
  contentType: string = "image/webp",
  expiresIn: number = 300
): Promise<{ presignedUrl: string; fileUrl: string }> {
  const bucket = process.env.AWS_BUCKET_NAME!
  const region = process.env.AWS_REGION!.trim()

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: fileName,
    ContentType: contentType
  })

  const presignedUrl = await getSignedUrl(s3, command, { expiresIn })

  // Generate the final file URL
  const encodedFileName = encodeURIComponent(fileName)
  const fileUrl = `https://${bucket}.s3.${region}.amazonaws.com/${encodedFileName}`

  return { presignedUrl, fileUrl }
}

/**
 * Generate presigned URLs for multiple files
 */
export async function generatePresignedUrls(
  fileNames: string[],
  contentType: string = "image/webp",
  expiresIn: number = 300
): Promise<Array<{ presignedUrl: string; fileUrl: string }>> {
  const promises = fileNames.map((fileName) =>
    generatePresignedUrl(fileName, contentType, expiresIn)
  )
  return Promise.all(promises)
}
