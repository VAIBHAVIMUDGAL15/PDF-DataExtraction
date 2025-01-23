import pdfplumber
import re
from flask import Flask, request, jsonify
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Function to extract details from PDF text
def extract_details(text):
    # Print text for debugging
    print("Extracted Text:\n", text)

    # Regex for Phone Number (supports various formats)
    phone_regex = r"\+?1?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}"
    phone_match = re.search(phone_regex, text)
    phone = phone_match.group() if phone_match else None
    print("Extracted Phone:", phone)  # Debugging

    # Regex for Name (accounts for "Name :" with spaces or colons)
    name_regex = r"Name\s*:\s*([A-Za-z ]+)"
    name_match = re.search(name_regex, text)
    name = name_match.group(1).strip() if name_match else None
    print("Extracted Name:", name)  # Debugging

    # Regex for Address (accounts for "Address :" and line breaks)
    address_regex = r"Address\s*:\s*(.+)"
    address_match = re.search(address_regex, text)
    address = address_match.group(1).strip() if address_match else None
    print("Extracted Address:", address)  # Debugging

    # Regex for Role (accounts for "Role :" and possible line breaks)
    role_regex = r"Role\s*:\s*(.+)"
    role_match = re.search(role_regex, text)
    role = role_match.group(1).strip() if role_match else None
    print("Extracted Role:", role)  # Debugging

    return {"name": name, "phone": phone, "address": address, "role": role}

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
    return text

# Route to process PDF
@app.route("/process-pdf", methods=["POST"])
def process_pdf():
    try:
        if "pdf" not in request.files:
            return jsonify({"success": False, "message": "No PDF file uploaded"}), 400

        # Get the file from the request
        pdf_file = request.files["pdf"]
        pdf_path = f"temp_{pdf_file.filename}"
        pdf_file.save(pdf_path)

        # Extract text from PDF
        text = extract_text_from_pdf(pdf_path)

        # Extract details from text
        details = extract_details(text)

        # Cleanup the temporary file
        os.remove(pdf_path)

        return jsonify({"success": True, "data": details}), 200

    except Exception as e:
        print(e)
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
