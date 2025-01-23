const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Set up multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload endpoint for handling PDF
app.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }
        const blob = new Blob([req.file.buffer], { type: 'application/pdf' });
        // Send the PDF file to the Python Flask API for processing
        const formData = new FormData();
        formData.append("pdf", blob, 'uploaded_pdf.pdf');

        // Call the Flask AI model (running on port 5001) for processing
        const response = await axios.post('https://pdf-dataextraction-kig7.onrender.com/process-pdf', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        // Return the extracted data (from AI model) to the frontend
        res.json(response.data);
    } catch (error) {
        console.error("Error processing the PDF:");
        res.status(500).send("Error processing the PDF.");
    }
});

// Start the Node.js backend server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
