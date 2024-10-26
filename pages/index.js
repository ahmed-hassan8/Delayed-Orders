import { useState } from 'react';

export default function Home() {
    const [file, setFile] = useState(null);
    const [downloadLink, setDownloadLink] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAnalyze = async () => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/analyze', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            const { downloadUrl } = await res.json();
            setDownloadLink(downloadUrl);
        } else {
            alert("Failed to process file");
        }
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