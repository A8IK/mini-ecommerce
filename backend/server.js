const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({
  origin: true,
  credintials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log(' MongoDB connected'))
.catch(err => console.error(' MongoDB error:', err));

app.get('/', (req, res) => {
  res.json({ message: 'Server is working!' });
});

app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});