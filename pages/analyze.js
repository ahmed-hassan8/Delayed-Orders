import formidable from 'formidable';
import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) {
                res.status(500).json({ error: 'File parsing failed' });
                return;
            }

            const csvFilePath = files.file.filepath;
            const outputPath = path.join(process.cwd(), 'public', 'downloads', 'report.csv');

            exec(`python3 scripts/analyze.py ${csvFilePath} ${outputPath}`, (error) => {
                if (error) {
                    res.status(500).json({ error: 'Data processing failed' });
                    return;
                }

                const downloadUrl = `/downloads/report.csv`;
                res.status(200).json({ downloadUrl });
            });
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
