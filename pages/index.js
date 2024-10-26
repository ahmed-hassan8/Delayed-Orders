import { useState } from 'react';
import Papa from 'papaparse';

export default function Home() {
    const [file, setFile] = useState(null);
    const [downloadLink, setDownloadLink] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAnalyze = async () => {
        if (!file) return alert("Please upload a CSV file");

        // Parse CSV file
        Papa.parse(file, {
            header: true,
            complete: async (result) => {
                const csvData = result.data;

                // Send CSV data to serverless function
                const res = await fetch('/api/analyze', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(csvData),
                });

                if (res.ok) {
                    const { downloadUrl } = await res.json();
                    setDownloadLink(downloadUrl);
                } else {
                    alert("Failed to process file");
                }
            },
        });
    };

    return (
        <div>
            <h1>Data Analysis Tool</h1>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleAnalyze}>Analyze</button>
            {downloadLink && (
                <div>
                    <a href={downloadLink} download="report.csv">Download Report</a>
                </div>
            )}
        </div>
    );
}
