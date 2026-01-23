import { NextRequest, NextResponse } from "next/server"
import { S3Client, PutBucketCorsCommand } from "@aws-sdk/client-s3"

/**
 * API Route pour configurer CORS sur le bucket S3
 * 
 * Cette route peut être appelée depuis le serveur de production
 * et utilisera automatiquement les variables d'environnement de production
 * 
 * GET /api/configure-cors - Configure CORS sur le bucket S3 actuel
 * 
 * Sécurité: Vous pouvez ajouter une vérification d'authentification ici
 */
export async function GET(req: NextRequest) {
  let bucketName = ""
  
  try {
    // Vérifier que les credentials sont présents
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      return NextResponse.json(
        { 
          error: "Variables d'environnement AWS manquantes",
          message: "AWS_ACCESS_KEY_ID et AWS_SECRET_ACCESS_KEY sont requis"
        },
        { status: 400 }
      )
    }

    // Détecter le bucket selon l'environnement
    bucketName = process.env.AWS_BUCKET_NAME || ""
    
    // Si pas de bucket défini, détecter selon l'URL ou l'environnement
    if (!bucketName) {
      const url = process.env.NEXT_PUBLIC_BASE_URL || req.headers.get("host") || ""
      const isProduction = 
        url.includes("strass-shop.com") || 
        url.includes("vercel.app") ||
        process.env.NODE_ENV === "production" ||
        process.env.VERCEL_ENV === "production"
      
      if (isProduction) {
        bucketName = "taha-strass-shop" // Bucket de production
      } else {
        bucketName = "strass-shop" // Bucket de développement
      }
    }

    const region = process.env.AWS_REGION?.trim() || "us-east-1"

    // Configuration CORS
    const corsConfig = {
      CORSRules: [
        {
          AllowedOrigins: [
            "http://localhost:3000",
            "https://strass-shop.com",
            "https://www.strass-shop.com"
          ],
          AllowedMethods: ["GET", "PUT", "POST", "HEAD"],
          AllowedHeaders: ["*"],
          ExposeHeaders: [
            "ETag",
            "x-amz-server-side-encryption",
            "x-amz-request-id",
            "x-amz-id-2"
          ],
          MaxAgeSeconds: 3000
        }
      ]
    }

    // Créer le client S3
    const s3 = new S3Client({
      region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    })

    // Configurer CORS
    const command = new PutBucketCorsCommand({
      Bucket: bucketName,
      CORSConfiguration: corsConfig
    })

    await s3.send(command)

    return NextResponse.json({
      success: true,
      message: `Configuration CORS appliquée avec succès sur le bucket: ${bucketName}`,
      bucket: bucketName,
      region: region,
      allowedOrigins: corsConfig.CORSRules[0].AllowedOrigins,
      environment: process.env.NODE_ENV || "unknown"
    })
  } catch (error: any) {
    console.error("Erreur lors de la configuration CORS:", error)
    
    let errorMessage = "Erreur lors de la configuration CORS"
    if (error.name === "AccessDenied") {
      errorMessage = "Permissions insuffisantes. Vérifiez que les credentials AWS ont la permission s3:PutBucketCors"
    } else if (error.name === "NoSuchBucket") {
      errorMessage = `Le bucket ${bucketName || process.env.AWS_BUCKET_NAME || "non défini"} n'existe pas ou n'est pas accessible`
    } else {
      errorMessage = error.message || errorMessage
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: error.name,
        bucket: bucketName || process.env.AWS_BUCKET_NAME || "non défini"
      },
      { status: 500 }
    )
  }
}
