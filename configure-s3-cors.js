/**
 * Script pour configurer CORS sur le bucket S3
 * 
 * Exécuter avec: node configure-s3-cors.js
 * 
 * Assurez-vous d'avoir les variables d'environnement configurées:
 * - AWS_ACCESS_KEY_ID
 * - AWS_SECRET_ACCESS_KEY
 * - AWS_REGION
 * - AWS_BUCKET_NAME
 */

const { S3Client, PutBucketCorsCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

// Fonction pour charger les variables d'environnement depuis .env
function loadEnvFile() {
  const envPath = path.join(__dirname, ".env");
  
  if (!fs.existsSync(envPath)) {
    console.log("⚠️  Fichier .env non trouvé. Utilisation des variables d'environnement système.");
    return;
  }

  try {
    // Essayer d'abord avec dotenv si disponible
    require("dotenv").config();
    console.log("✅ Variables d'environnement chargées via dotenv");
  } catch (e) {
    // Si dotenv n'est pas disponible, parser manuellement le fichier .env
    console.log("📝 Lecture manuelle du fichier .env...");
    const envContent = fs.readFileSync(envPath, "utf8");
    const lines = envContent.split("\n");

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      // Ignorer les lignes vides et les commentaires
      if (trimmedLine && !trimmedLine.startsWith("#")) {
        const equalIndex = trimmedLine.indexOf("=");
        if (equalIndex > 0) {
          const key = trimmedLine.substring(0, equalIndex).trim();
          let value = trimmedLine.substring(equalIndex + 1).trim();
          
          // Enlever les guillemets si présents
          if ((value.startsWith('"') && value.endsWith('"')) || 
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          
          // Ne pas écraser les variables d'environnement système si elles existent déjà
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      }
    });
    console.log("✅ Variables d'environnement chargées depuis .env");
  }
}

// Charger les variables d'environnement
loadEnvFile();

const s3 = new S3Client({
  region: process.env.AWS_REGION?.trim(),
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function configureCORS() {
  try {
    // Vérifier que toutes les variables nécessaires sont présentes
    const requiredVars = ["AWS_ACCESS_KEY_ID", "AWS_SECRET_ACCESS_KEY", "AWS_REGION", "AWS_BUCKET_NAME"];
    const missingVars = requiredVars.filter((varName) => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error("❌ Variables d'environnement manquantes:", missingVars.join(", "));
      console.error("Veuillez vérifier votre fichier .env");
      process.exit(1);
    }

    console.log("🔧 Configuration CORS pour le bucket:", process.env.AWS_BUCKET_NAME);
    console.log("📍 Région:", process.env.AWS_REGION);

    const corsConfigPath = path.join(__dirname, "s3-cors-config.json");
    const corsConfig = JSON.parse(fs.readFileSync(corsConfigPath, "utf8"));

    const command = new PutBucketCorsCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      CORSConfiguration: corsConfig
    });

    await s3.send(command);
    console.log("✅ Configuration CORS appliquée avec succès sur le bucket:", process.env.AWS_BUCKET_NAME);
    console.log("🌐 Origines autorisées:", corsConfig.CORSRules[0].AllowedOrigins.join(", "));
  } catch (error) {
    console.error("❌ Erreur lors de la configuration CORS:", error.message);
    if (error.name === "AccessDenied") {
      console.error("💡 Vérifiez que vos credentials AWS ont les permissions nécessaires (s3:PutBucketCors)");
    }
    process.exit(1);
  }
}

configureCORS();
