// import {
//   S3Client,
//   PutObjectCommand,
//   DeleteObjectCommand
// } from "@aws-sdk/client-s3"

// export const s3 = new S3Client({
//   region: process.env.AWS_REGION!,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
//   }
// })

// export async function uploadFileToS3(
//   file: Buffer,
//   fileName: string,
//   contentType: string
// ) {
//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET!,
//     Key: fileName,
//     Body: file,
//     ContentType: contentType
//   }

//   const command = new PutObjectCommand(params)
//   await s3.send(command)

//   return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
// }

// export async function deleteFileFromS3(fileName: string) {
//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET!,
//     Key: fileName
//   }

//   const command = new DeleteObjectCommand(params)
//   await s3.send(command)
// }

// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
// import { randomUUID } from "crypto"
// console.log("AWS_REGION:", process.env.AWS_REGION)
// const s3 = new S3Client({
//   region: process.env.AWS_REGION!,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
//   }
// })

// export async function uploadFileToS3(file: File): Promise<string> {
//   const arrayBuffer = await file.arrayBuffer()
//   const buffer = Buffer.from(arrayBuffer)

//   const fileName = `${randomUUID()}-${file.name.replace(/\s+/g, "_")}`
//   const bucket = process.env.AWS_BUCKET_NAME!

//   const uploadParams = {
//     Bucket: bucket,
//     Key: fileName,
//     Body: buffer,
//     ContentType: file.type
//   }
//   await s3.send(new PutObjectCommand(uploadParams))

//   // ✅ Retourne l’URL publique de l’image
//   return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
// }

// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
// import { randomUUID } from "crypto"

// const s3 = new S3Client({
//   region: process.env.AWS_REGION || "us-east-1",
//   endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`, // 👈 ajout important
//   forcePathStyle: false,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
//   }
// })

// export async function uploadFileToS3(file: File): Promise<string> {
//   const arrayBuffer = await file.arrayBuffer()
//   const buffer = Buffer.from(arrayBuffer)
//   const fileName = `${randomUUID()}-${file.name.replace(/\s+/g, "_")}`
//   const bucket = process.env.AWS_BUCKET_NAME!

//   const uploadParams = {
//     Bucket: bucket,
//     Key: fileName,
//     Body: buffer,
//     ContentType: file.type
//   }

//   await s3.send(new PutObjectCommand(uploadParams))

//   // ✅ Retourne l’URL publique
//   return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
// }

// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
// import { randomUUID } from "crypto"
// import sharp from "sharp"

// const s3 = new S3Client({
//   region: process.env.AWS_REGION!.trim(),
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
//   }
// })

// export async function uploadFileToS3(file: File): Promise<string> {
//   // 1️⃣ Convertir le fichier en buffer
//   const arrayBuffer = await file.arrayBuffer()
//   const buffer = Buffer.from(arrayBuffer)

//   // 2️⃣ Conversion en WebP avec sharp
//   const webpBuffer = await sharp(buffer)
//     .webp({ quality: 80 }) // qualité entre 0 et 100
//     .toBuffer()

//   // 3️⃣ Nom unique pour le fichier .webp
//   const fileName = `${randomUUID()}-${file.name
//     .replace(/\.[^/.]+$/, "") // retirer extension originale
//     .replace(/\s+/g, "_")}.webp`

//   const bucket = process.env.AWS_BUCKET_NAME!

//   // 4️⃣ Préparer les paramètres d’upload
//   const uploadParams = {
//     Bucket: bucket,
//     Key: fileName,
//     Body: webpBuffer,
//     ContentType: "image/webp"
//   }

//   // 5️⃣ Envoyer à S3
//   await s3.send(new PutObjectCommand(uploadParams))

//   // 6️⃣ Retourner l’URL publique
//   return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
// }

// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
// import { randomUUID } from "crypto"
// import sharp from "sharp"

// const s3 = new S3Client({
//   region: process.env.AWS_REGION!.trim(),
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
//   }
// })

// export async function uploadFileToS3(file: File): Promise<string> {
//   const arrayBuffer = await file.arrayBuffer()
//   const buffer = Buffer.from(arrayBuffer)

//   // ✅ 1. Redimensionner à 800x800 sans déformer
//   // - fit: "contain" => garde toute l’image avec des bandes vides si nécessaire
//   // - fit: "cover"   => remplit entièrement (peut couper légèrement)
//   const resizedBuffer = await sharp(buffer)
//     .resize({
//       width: 800,
//       height: 800,
//       fit: "contain", // ou "cover" selon ton choix
//       background: { r: 255, g: 255, b: 255, alpha: 0 } // fond transparent
//     })
//     .webp({ quality: 80 })
//     .toBuffer()

//   const fileName = `${randomUUID()}-${file.name
//     .replace(/\.[^/.]+$/, "")
//     .replace(/\s+/g, "_")}.webp`

//   const bucket = process.env.AWS_BUCKET_NAME!

//   const uploadParams = {
//     Bucket: bucket,
//     Key: fileName,
//     Body: resizedBuffer,
//     ContentType: "image/webp"
//   }

//   await s3.send(new PutObjectCommand(uploadParams))

//   return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
// }

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand
} from "@aws-sdk/client-s3"
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
    .resize({
      width: 800,
      height: 800,
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .webp({ quality: 80 })
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

  return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`
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
