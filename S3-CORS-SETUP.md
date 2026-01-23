# Configuration CORS pour S3

## Problème

Lors de l'upload direct vers S3 depuis le navigateur, vous pouvez rencontrer cette erreur :
```
Access to fetch at 'https://strass-shop.s3.us-east-1.amazonaws.com/...' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

Cela signifie que le bucket S3 n'est pas configuré pour autoriser les requêtes depuis votre domaine.

## Solution : Configurer CORS sur S3

### Option 1 : Utiliser le script Node.js (Recommandé)

1. Assurez-vous que votre fichier `.env` contient les variables nécessaires :
   ```
   AWS_ACCESS_KEY_ID=...
   AWS_SECRET_ACCESS_KEY=...
   AWS_REGION=us-east-1
   AWS_BUCKET_NAME=strass-shop
   ```

2. Exécutez le script :
   ```bash
   node configure-s3-cors.js
   ```

### Option 2 : Configuration manuelle via AWS Console

1. Allez sur [AWS S3 Console](https://s3.console.aws.amazon.com/)
2. Sélectionnez votre bucket `strass-shop`
3. Allez dans l'onglet **Permissions**
4. Faites défiler jusqu'à **Cross-origin resource sharing (CORS)**
5. Cliquez sur **Edit**
6. Collez la configuration suivante :

```json
[
    {
        "AllowedOrigins": [
            "http://localhost:3000",
            "https://strass-shop.com",
            "https://www.strass-shop.com"
        ],
        "AllowedMethods": [
            "GET",
            "PUT",
            "POST",
            "HEAD"
        ],
        "AllowedHeaders": [
            "*"
        ],
        "ExposeHeaders": [
            "ETag",
            "x-amz-server-side-encryption",
            "x-amz-request-id",
            "x-amz-id-2"
        ],
        "MaxAgeSeconds": 3000
    }
]
```

7. Cliquez sur **Save changes**

### Option 3 : Utiliser AWS CLI

Si vous avez AWS CLI installé :

```bash
aws s3api put-bucket-cors \
  --bucket strass-shop \
  --cors-configuration file://s3-cors-config.json
```

## Vérification

Après avoir configuré CORS, testez l'upload d'images. L'erreur CORS devrait disparaître.

## Notes importantes

- Les origines autorisées incluent `localhost:3000` pour le développement et `strass-shop.com` pour la production
- Si vous ajoutez de nouveaux domaines, mettez à jour la configuration CORS
- Les changements CORS peuvent prendre quelques minutes pour se propager
