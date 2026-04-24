const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const products = [
  {
    id: 'jersey-1',
    name: 'Los Angeles Lakers LeBron James Jersey',
    price: 89.99,
    image: 'assets/images/james.jpg',
    category: 'jerseys',
    availability: true,
    brand: 'Nike',
    rating: 4.8,
    sizes: ['S', 'M', 'L', 'XL'],
    discount: 0
  },
  {
    id: 'jersey-2',
    name: 'Golden State Warriors Stephen Curry Jersey',
    price: 89.99,
    image: 'assets/images/curry.jpg',
    category: 'jerseys',
    availability: true,
    brand: 'Nike',
    rating: 4.9,
    sizes: ['S', 'M', 'L', 'XL'],
    discount: 0
  },
  {
    id: 'jersey-3',
    name: 'Chicago Bulls Michael Jordan Jersey',
    price: 129.99,
    image: 'assets/images/jordan.jpg',
    category: 'jerseys',
    availability: true,
    brand: 'Nike',
    rating: 5.0,
    sizes: ['M', 'L', 'XL'],
    discount: 0
  },
  {
    id: 'jersey-4',
    name: 'Boston Celtics Jayson Tatum Jersey',
    price: 89.99,
    image: 'assets/images/tatum.jpg',
    category: 'jerseys',
    availability: true,
    brand: 'Nike',
    rating: 4.7,
    sizes: ['S', 'M', 'L', 'XL'],
    discount: 0
  },
  {
    id: 'jersey-5',
    name: 'Brooklyn Nets Kevin Durant Jersey',
    price: 89.99,
    image: 'assets/images/kd.jpg',
    category: 'jerseys',
    availability: true,
    brand: 'Nike',
    rating: 4.8,
    sizes: ['S', 'M', 'L', 'XL'],
    discount: 0
  },
  {
    id: 'jersey-6',
    name: 'Dallas Mavericks Luka Doncic Jersey',
    price: 89.99,
    image: 'assets/images/luka.jpg',
    category: 'jerseys',
    availability: true,
    brand: 'Nike',
    rating: 4.9,
    sizes: ['S', 'M', 'L', 'XL'],
    discount: 0
  },
  {
    id: 'jersey-7',
    name: 'Atlanta Hawks Trae Young Jersey',
    price: 89.99,
    image: 'assets/images/GA.jpg',
    category: 'jerseys',
    availability: true,
    brand: 'Nike',
    rating: 4.6,
    sizes: ['S', 'M', 'L', 'XL'],
    discount: 0
  },

  {
    id: 'shorts-1',
    name: 'NBA Elite Basketball Shorts',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400',
    category: 'shorts',
    availability: true,
    brand: 'Nike',
    rating: 4.6,
    sizes: ['S', 'M', 'L', 'XL'],
    discount: 15
  },

  {
    id: 'accessory-1',
    name: 'NBA Championship Hat',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400',
    category: 'accessories',
    availability: true,
    brand: 'New Era',
    rating: 4.7,
    sizes: ['S/M', 'L/XL'],
    discount: 0
  },

  {
    id: 'limited-1',
    name: 'Kobe Bryant Tribute Edition Jersey',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400',
    category: 'limited-edition',
    availability: true,
    brand: 'Nike',
    rating: 5.0,
    sizes: ['M', 'L', 'XL'],
    discount: 0
  }
];

let cart = [];

// Routes
app.get('/api', (req, res) => {
  res.json({ success: true, message: 'HoopsHub API', totalProducts: products.length });
});

app.get('/products', (req, res) => {
  res.json({ success: true, count: products.length, products: products });
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, product });
});

app.get('/cart', (req, res) => {
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  res.json({ success: true, count: cart.length, total: total, items: cart });
});

app.post('/cart', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  
  const existingItem = cart.find(item => item.product.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity, addedAt: new Date().toISOString() });
  }
  res.json({ success: true, message: `${product.name} added to cart!` });
});

app.delete('/cart/:productId', (req, res) => {
  const productId = req.params.productId;
  cart = cart.filter(item => item.product.id !== productId);
  res.json({ success: true, message: 'Item removed from cart' });
});

app.put('/cart/:productId', (req, res) => {
  const { quantity } = req.body;
  const productId = req.params.productId;
  const cartItem = cart.find(item => item.product.id === productId);
  if (cartItem) {
    cartItem.quantity = quantity;
    res.json({ success: true, message: 'Cart updated' });
  } else {
    res.status(404).json({ success: false, message: 'Item not found' });
  }
});

app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 Products: ${products.length} products available`);
  console.log(`========================================`);
});
