// Load environment variables
require('dotenv').config();

// Import modules
const express = require('express');
const fs = require('fs');
const cors = require('cors');

// Initialize app
const app = express();

// Middleware
app.use(express.json()); // modern JSON parser
app.use(cors());

// Default route
app.get('/', (req, res) => {
  res.send('MCP Server is running successfully!');
});

// Browser-based testing interface
app.get('/search', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>MCP Keyword Search</title>
        <style>
          body { font-family: Arial; margin: 40px; background: #f9f9f9; }
          h2 { color: #333; }
          input { width: 300px; padding: 8px; margin-top: 5px; border: 1px solid #ccc; border-radius: 5px; }
          button { margin-top: 10px; padding: 8px 20px; border: none; background: #007bff; color: white; border-radius: 5px; cursor: pointer; }
          button:hover { background: #0056b3; }
          pre { background: #fff; border: 1px solid #ddd; padding: 10px; border-radius: 5px; white-space: pre-wrap; word-wrap: break-word; }
        </style>
      </head>
      <body>
        <h2>MCP Keyword Search Tool</h2>
        <form id="searchForm">
          <label>Keyword:</label><br>
          <input type="text" id="keyword" placeholder="Enter keyword..."><br><br>
          <label>File Path:</label><br>
          <input type="text" id="filepath" placeholder="Enter full file path..."><br><br>
          <button type="button" onclick="searchFile()">Search</button>
        </form>

        <h3>Result:</h3>
        <pre id="result">No search performed yet.</pre>

        <script>
          async function searchFile() {
            const keyword = document.getElementById('keyword').value;
            const filepath = document.getElementById('filepath').value;

            document.getElementById('result').textContent = 'Searching...';

            try {
              const response = await fetch('/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ keyword, filepath })
              });

              const data = await response.json();
              document.getElementById('result').textContent = JSON.stringify(data, null, 2);
            } catch (err) {
              document.getElementById('result').textContent = 'Error: ' + err.message;
            }
          }
        </script>
      </body>
    </html>
  `);
});

// POST route: Search for a keyword in a text file
app.post('/search', (req, res) => {
  const { keyword, filepath } = req.body;

  // Validate inputs
  if (!keyword || !filepath) {
    return res.status(400).json({
      error: 'Please provide both "keyword" and "filepath".'
    });
  }

  try {
    // Read file content
    const content = fs.readFileSync(filepath, 'utf8');
    const lines = content.split(/\r?\n/);

    // Search for keyword (case-insensitive)
    const matches = lines.filter(line =>
      line.toLowerCase().includes(keyword.toLowerCase())
    );

    // Send JSON response
    res.json({
      keyword,
      occurrences: matches.length,
      matches
    });
  } catch (error) {
    res.status(500).json({
      error: `Error reading file: ${error.message}`
    });
  }
});

// Define server port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`MCP Server running on port ${PORT}`);
});
