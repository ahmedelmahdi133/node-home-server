const express = require('express');

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World 2020! 2024 2025 2026');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

