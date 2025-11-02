# MCP Server Development

## Overview
This project implements an **MCP (Message Communication Protocol) Server** using **Node.js** and **Express.js**.  
The server provides a tool that searches for a specified keyword within a given text file and returns all matching lines in JSON format.

---

##  Features
- Accepts a keyword and file path as input.
- Reads and searches text files dynamically.
- Performs **case-insensitive keyword search**.
- Returns all matching lines with the total count.
- Lightweight REST API built with Express.js.

---

## Technologies Used
- **Node.js**
- **Express.js**
- **CORS**
- **dotenv**
- **File System (fs)**

---

## 📁 Project Structure

MCP_Server/

├── server.js # Main server file

├── data.txt # Sample data file for keyword search

├── .env # Environment configuration file

├── package.json # Node.js dependencies

├── package-lock.json # Dependency lock file

├── mcvkeyword.JPG # Screenshot 1 for verify

├── mcv connected.JPG # Screenshot 2 for verify

---

##  How to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/devsachinpal/MCP_Server.git
   cd MCP_Server
Install dependencies
code:

npm install
# Start the server

node server.js
# Open your browser or use curl to test:

http://localhost:5000
 API Endpoint
POST /search
Request Body (JSON):

json
code:

{
  "keyword": "hello",
  "filepath": "C:\\Windows\\System32\\mcp_server\\mcp_server\\data.txt"
}

# Sample Response:

{
  "keyword": "hello",
  "occurrences": 2,
  "matches": ["hello world", "hello again"]
}
Example Output

{"keyword":"hello","occurrences":2,"matches":["hello world","hello again"]}

🧑 Author
# Sachin Pal
RESSL Assignment – Task 2
MCP Server Development (Node.js + Express)
2025

### 📸 Output Screenshot

Below is the sample output from the MCP Inspector tool:

![MCP Output](./mckeyword.jpg)
![MCP Output](./mcvconnected.jpg)
