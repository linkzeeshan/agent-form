import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, crCode, telephone, iqama } = req.body;

    // Define the path to the CSV file in the src directory
    const filePath = path.join(process.cwd(), 'src', 'main.csv');

    // Create the CSV line
    const csvLine = `${firstName},${lastName},${email},${crCode},${telephone},${iqama}\n`;

    try {
      // Check if the file exists. If not, create it with headers.
      if (!fs.existsSync(filePath)) {
        const headers = 'firstName,lastName,email,crCode,telephone,iqama\n';
        fs.writeFileSync(filePath, headers);
      }

      // Append the data to the file
      fs.appendFileSync(filePath, csvLine);

      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error writing to CSV:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
