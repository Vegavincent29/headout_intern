const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

// const dataPath = '/';

// HTML content with inline CSS
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>File Content Viewer</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }

    h1 {
      color: #333;
    }

    form {
      margin-bottom: 20px;
    }

    label {
      margin-right: 10px;
    }

    button {
      padding: 5px 10px;
      cursor: pointer;
    }

    #result {
      white-space: pre-wrap;
      background-color: #f5f5f5;
      padding: 10px;
    }
  </style>
</head>
<body>
  <h1>File Content Viewer</h1>

  <form id="fileForm">
    <label for="fileName">File Name (n): </label>
    <input type="text" id="fileName" name="n" required>

    <label for="lineNumber">Line Number (m): </label>
    <input type="number" id="lineNumber" name="m">

    <button type="button" onclick="getData()">Get Data</button>
  </form>

  <div id="result"></div>

  <script>
    async function getData() {
      const fileName = document.getElementById('fileName').value;
      const lineNumber = document.getElementById('lineNumber').value;

      const url = \`/data?n=\${encodeURIComponent(fileName)}\${lineNumber ? \`&m=\${lineNumber}\` : ''}\`;

      try {
        const response = await fetch(url);
        const data = await response.text();

        document.getElementById('result').innerText = data;
      } catch (error) {
        console.error(error);
        document.getElementById('result').innerText = 'Error fetching data.';
      }
    }
  </script>
</body>
</html>
`;

app.get('/', (req, res) => {
  res.send(htmlContent);
});

app.get('/data', async (req, res) => {
  try {
    const fileName = req.query.n;
    const lineNumber = req.query.m;

    if (!fileName) {
      return res.status(400).send('Please provide a file name (n).');
    }

    const filePath = path.join(__dirname, `${fileName}.txt`);

    if (lineNumber) {
      const content = await getSpecificLine(filePath, lineNumber);
      res.send(content);
    } else {
      const content = await getAllContent(filePath);
      res.send(content);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

async function getSpecificLine(filePath, lineNumber) {
  const content = await fs.readFile(filePath, 'utf-8');
  const lines = content.split('\n');
  return lines[lineNumber - 1] || 'Line not found.';
}

async function getAllContent(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  return content;
}

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
