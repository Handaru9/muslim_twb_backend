const express = require('express');
const app = express();
const port = 4000; // Ganti dengan port yang Anda inginkan
const bodyParser = require('body-parser');

// Middleware untuk parsing body pada permintaan POST dan PUT
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Data dummy untuk menyimpan produk
let products = [];
// Fungsi untuk menghasilkan ID unik

function generateId() {
  const timestamp = Date.now().toString();
  const randomNum = Math.floor(Math.random() * 1000).toString();
  const uniqueId = timestamp + randomNum;
  return uniqueId;
}
// Menggunakan middleware bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('aku yang NT');
});
app.get('/endpoint', (req, res) => {
  // Logika penanganan permintaan
  res.send('Hello, GET request!');
});
app.post('/endpoint', (req, res) => {
  // Logika penanganan permintaan
  res.send('Hello, POST request!');
});
app.get('/products', (req, res) => {
  res.json(products);
});
app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const product = products.find(product => product.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});
app.post('/products', (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = { id: generateId(), name, price, description };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
app.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  const { name, price, description } = req.body;
  const productIndex = products.findIndex(product => product.id === productId);
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], name, price, description };
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});
app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  const productIndex = products.findIndex(product => product.id === productId);
  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1);
    res.json(deletedProduct[0]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
