import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

export const config = {
    api: {
        bodyParser: false,
    },
};

type ResponseData = {
    success?: boolean;
    error?: string;
    imageUrl?: string;
};

const parseForm = (
    req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    return new Promise((resolve, reject) => {
        // Utilisation d'un dossier temporaire pour le upload initial
        const tempDir = path.join(process.cwd(), 'tmp');

        const form = formidable({
            uploadDir: tempDir,
            keepExtensions: true,
            filename: (_name, ext) => `temp-${Date.now()}${ext}`,
        });

        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });
};

const convertToWebP = async (inputPath: string, outputPath: string): Promise<void> => {
    await sharp(inputPath)
        .webp({ quality: 80 }) // Vous pouvez ajuster la qualité selon vos besoins
        .toFile(outputPath);
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Méthode non autorisée'
        });
    }

    try {
        // Créer les dossiers nécessaires
        const tempDir = path.join(process.cwd(), 'tmp');
        const webpDir = path.join(process.cwd(), 'public', 'uploads', 'webp');

        for (const dir of [tempDir, webpDir]) {
            try {
                await fs.access(dir);
            } catch {
                await fs.mkdir(dir, { recursive: true });
            }
        }

        // Parser le formulaire
        const { files } = await parseForm(req);
        const uploadedFile = Array.isArray(files.image) ? files.image[0] : files.image;

        if (!uploadedFile) {
            return res.status(400).json({
                success: false,
                error: 'Aucun fichier n\'a été fourni'
            });
        }

        // Vérifier le type de fichier
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(uploadedFile.mimetype || '')) {
            return res.status(400).json({
                success: false,
                error: 'Type de fichier non valide. Seuls JPG, PNG et WebP sont acceptés'
            });
        }

        // Générer le nom du fichier WebP
        const webpFilename = `image-${Date.now()}.webp`;
        const webpPath = path.join(webpDir, webpFilename);

        // Convertir l'image en WebP
        await convertToWebP(uploadedFile.filepath, webpPath);

        // Supprimer le fichier temporaire
        await fs.unlink(uploadedFile.filepath);

        // Construire l'URL de l'image
        const imageUrl = `/uploads/webp/${webpFilename}`;

        // Retourner la réponse
        return res.status(201).json({
            success: true,
            imageUrl: imageUrl
        });

    } catch (error) {
        console.error('Erreur lors de l\'upload:', error);
        return res.status(500).json({
            success: false,
            error: 'Erreur lors du traitement de l\'image'
        });
    }
}
