# PDF Parsing and Data Extraction Application

## Overview
This project is designed to extract specific fields (such as Name, Phone Number, Address, and Role) from uploaded PDF files using Python libraries and Regular Expressions (Regex). The extracted data is integrated with a simple frontend form for autofill functionality. The backend service processes the PDF files and serves as the intermediary between the frontend and the data extraction logic.

---

## Technology Stack

### **AI Model:**
- **Language:** Python
- **Libraries:**
  - `pdfplumber`: For parsing PDF files and extracting raw text.
  - `re` (Regular Expressions): For pattern-based data extraction.
  - `flask`: For creating a lightweight API to integrate the PDF parsing logic.

### **Backend:**
- **Language:** JavaScript
- **Framework:** Node.js
- **Libraries:**
  - `express`: For API development.
  - `multer`: For handling file uploads.
  - `cors`: To handle cross-origin requests.
  - `axios`: For making HTTP requests to the AI service.

### **Frontend:**
- **Language:** JavaScript
- **Framework:** React.js
- **Libraries:**
  - `axios`: For integrating the backend API.

---

## Features
1. **PDF Parsing:**
   - Extract raw text from PDF files using Python libraries like `pdfplumber`.
2. **Regex Methods:**
   - Use regular expressions to extract specific fields (Name, Phone Number, Address, Role).
3. **Frontend Integration:**
   - A simple React.js frontend form with fields like Name, Phone Number, and Address.
   - PDF upload functionality that auto-fills the fields with extracted data.
4. **Backend Service:**
   - A lightweight API in Node.js for processing PDF files and managing data extraction.

---

## Installation Guide

### Prerequisites
Ensure you have the following installed:
- Python (>=3.8)
- Node.js (>=16.0)
- npm (Node Package Manager)
- pip (Python Package Manager)

### Steps

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```
#### 2. Setup the Python Service
```bash
cd ai-model
pip install pdfplumber flask mutler cors axios
python ai-model.py
```

#### 3. Setup the Backend
```bash
cd backend
npm install
node server.js
```

#### 4. Setup the Frontend
```bash
cd frontend
npm install
npm start
```

---

## Usage Instructions
1. Run the Python service to enable PDF parsing and data extraction.
2. Start the backend service using Node.js.
3. Open the frontend React.js application in your browser.
4. Upload a PDF file in the provided in the repository. The extracted data will auto-fill the form fields.

---
