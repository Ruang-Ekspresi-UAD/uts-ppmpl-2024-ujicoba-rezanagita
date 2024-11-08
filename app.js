const express = require('express');
const app = express();

app.use(express.json());

// GET route
app.get('/api/hello', (req, res) => {
  res.status(200).json({ message: 'Hello, world!' });
});

// POST route
app.post('/api/hello', (req, res) => {
  const { name } = req.body;
  if (name) {
    res.status(201).json({ message: `Hello, ${name}!` });
  } else {
    res.status(400).json({ error: 'Name is required' });
  }
});

// PUT route
app.put('/api/hello', (req, res) => {
  res.status(200).json({ message: 'Updated successfully' });
});

// DELETE route
app.delete('/api/hello', (req, res) => {
  res.status(200).json({ message: 'Deleted successfully' });
});

module.exports = app;
