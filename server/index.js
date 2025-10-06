const express = require('express');
const app = express();
const PORT = 5000; 

app.use(express.json());

// cCONTOH
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
