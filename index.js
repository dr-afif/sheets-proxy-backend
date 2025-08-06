const express = require("express");
const cors = require("cors");
require("dotenv").config();

// ✅ Add this line to support fetch in Node.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Server running", timestamp: new Date().toISOString() });
});

app.get("/timetable", async (req, res) => {
  const { GOOGLE_API_KEY, SPREADSHEET_ID } = process.env;

  const range = "Timetable!A1:Z";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch timetable", details: err });
  }
});

app.get("/contacts", async (req, res) => {
  const { GOOGLE_API_KEY, SPREADSHEET_ID } = process.env;

  const range = "Contacts!A1:B";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts", details: err });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
