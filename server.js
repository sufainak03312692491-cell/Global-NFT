const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('Global NFT Backend is running!');
});
app.get('/api/nfts', (req, res) => {
  const sampleNfts = [
    { id: 1, name: 'Global NFT #1', price: '0.1 ETH' },
    { id: 2, name: 'Global NFT #2', price: '0.2 ETH' }
  ];
  res.json(sampleNfts);
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
