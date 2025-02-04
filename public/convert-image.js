import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.join(process.cwd(), './uploads');
const outputDir = path.join(process.cwd(), '/uploads/webp');
const supportedFormats = ['.jpg', '.jpeg'];

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(inputDir, async (err, files) => {
    if (err) {
        console.error('Erreur de lecture du dossier d\'entrée', err);
        return;
    }

    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (supportedFormats.includes(ext)) {
            const inputFile = path.join(inputDir, file);
            const outputFile = path.join(outputDir, `${path.parse(file).name}.webp`);

            try {
                await sharp(inputFile)
                    .webp({ quality: 80 }) // Qualité ajustable
                    .toFile(outputFile);
                console.log(`Converti : ${file} → ${outputFile}`);
            } catch (error) {
                console.error(`Erreur de conversion pour ${file}:`, error);
            }
        }
    }
});
