export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const data = req.body;

            // Sample logic to filter delayed orders (adjust as needed)
            const delayedOrders = data.filter((order) => order.Status === 'Delayed');

            // Convert to CSV format (simple manual conversion here; libraries can help for complex cases)
            const csvContent = delayedOrders
                .map((order) => Object.values(order).join(","))
                .join("\n");

            // Respond with the CSV as a downloadable file link
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="report.csv"');
            res.status(200).send(csvContent);
        } catch (error) {
            res.status(500).json({ error: 'Data processing failed' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
