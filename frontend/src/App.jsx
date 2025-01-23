import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axios.post("https://pdf-dataextraction-1.onrender.com/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setData(response.data.data);
    } catch (error) {
      alert("Failed to process the PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>PDF Data Extractor</h1>
      </header>
      <main className="main horizontal-layout">
        <section className="upload-section">
          <h2>Upload Your PDF</h2>
          <p>Effortlessly extract meaningful data from your PDF files using our AI-powered solution.</p>
          <label className="upload-btn">
            Upload PDF
            <input type="file" onChange={handleUpload} />
          </label>
          {loading && <p className="loading-text">Processing your file...</p>}
          <div className="why-hire-me">
            <h2>Why You Should Hire Me?</h2>
            <p>I bring a solid foundation in full-stack development and machine learning, combining technical expertise with a passion for problem-solving. My proactive learning approach and hands-on project experience make me a strong fit to contribute effectively and adapt quickly to the role. I thrive in dynamic environments, consistently seeking innovative solutions to complex challenges. My ability to work collaboratively and communicate technical concepts clearly allows me to make meaningful contributions to team success. With a continuous desire to learn and grow, I am eager to apply my skills to real-world projects and drive impactful results.</p>
          </div>
        </section>
        <section className="result-section">
          <h2>Extracted Data</h2>
          <form className="form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={data.name}
                placeholder="Extracted Name"
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="text"
                value={data.phone}
                placeholder="Extracted Phone Number"
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <textarea
                value={data.address}
                placeholder="Extracted Address"
                readOnly
              />
            </div>
            <div className="form-group">
              <label>Role:</label>
              <input
                type="text"
                value={data.role}
                placeholder="Extracted Role"
                readOnly
              />
            </div>
          </form>
        </section>
      </main>
      <footer className="footer">
        <p>Project by Vaibhavi Mudgal(21BCE11313), Final year student at VIT Bhopal</p>
        <a href="/resume.pdf" className="resume-btn" target="_blank" rel="noopener noreferrer">
          View My Resume
        </a>
      </footer>
    </div>
  );
}

export default App;
