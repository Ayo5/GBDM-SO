import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';

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
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');

        const form = formidable({
            uploadDir,
            keepExtensions: true,
            filename: (_name, ext) => `image-${Date.now()}${ext}`,
        });

        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    // Vérifier la méthode HTTP
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            error: 'Méthode non autorisée'
        });
    }

    try {
        // S'assurer que le dossier d'upload existe
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        // Parser le formulaire
        const { files } = await parseForm(req);
        console.log('Parsed files:', files);
        const uploadedFile = Array.isArray(files.image) ? files.image[0] : files.image;

        if (!uploadedFile) {
            return res.status(400).json({
                success: false,
                error: 'Aucun fichier n\'a été fourni'
            });
        }

        // Vérifier le type de fichier
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(uploadedFile.mimetype || '')) {
            return res.status(400).json({
                success: false,
                error: 'Type de fichier non valide. Seuls JPG et PNG sont acceptés'
            });
        }

        // Construire l'URL de l'image
        const filename = path.basename(uploadedFile.filepath);
        const imageUrl = `/uploads/${filename}`;

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