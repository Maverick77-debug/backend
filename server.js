const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ============= 37 PRODUCTS - UPDATED =============
const products = [
  // Sa iyong products array - GANITO ANG TAMANG PATH
{
  id: '1', 
  name: 'Los Angeles Lakers LeBron James Jersey', 
  price: 89.99, 
  image: 'assets/images/james.jpg',  // ✅ TAMA ITO
  category: 'jerseys', 
  availability: true, 
  brand: 'Nike', 
  rating: 4.8, 
  sizes: ['S', 'M', 'L', 'XL'], 
  discount: 0
},
{
  id: '2', 
  name: 'Golden State Warriors Stephen Curry Jersey', 
  price: 89.99, 
  image: 'assets/images/curry.jpg',  // ✅ TAMA
  category: 'jerseys', 
  availability: true, 
  brand: 'Nike', 
  rating: 4.9, 
  sizes: ['S', 'M', 'L', 'XL'], 
  discount: 0
},
{
  id: '3', 
  name: 'Chicago Bulls Michael Jordan Jersey', 
  price: 129.99, 
  image: 'assets/images/jordan.jpg',  // ✅ TAMA
  category: 'jerseys', 
  availability: true, 
  brand: 'Nike', 
  rating: 5.0, 
  sizes: ['M', 'L', 'XL'], 
  discount: 0
},
{
  id: '4', 
  name: 'Boston Celtics Jayson Tatum Jersey', 
  price: 89.99, 
  image: 'assets/images/tatum.jpg',  // ✅ TAMA
  category: 'jerseys', 
  availability: true, 
  brand: 'Nike', 
  rating: 4.7, 
  sizes: ['S', 'M', 'L', 'XL'], 
  discount: 0
},
{
  id: '5', 
  name: 'Brooklyn Nets Kevin Durant Jersey', 
  price: 89.99, 
  image: 'assets/images/kd.jpg',  // ✅ TAMA
  category: 'jerseys', 
  availability: true, 
  brand: 'Nike', 
  rating: 4.8, 
  sizes: ['S', 'M', 'L', 'XL'], 
  discount: 0
},
{
  id: '6', 
  name: 'Dallas Mavericks Luka Doncic Jersey', 
  price: 89.99, 
  image: 'assets/images/luka.jpg',  // ✅ TAMA
  category: 'jerseys', 
  availability: true, 
  brand: 'Nike', 
  rating: 4.9, 
  sizes: ['S', 'M', 'L', 'XL'], 
  discount: 0
},
{
  id: '7', 
  name: 'Atlanta Hawks Trae Young Jersey', 
  price: 89.99, 
  image: 'assets/images/GA.jpg',  // ✅ TAMA (ito yung GA.jpg)
  category: 'jerseys', 
  availability: true, 
  brand: 'Nike', 
  rating: 4.6, 
  sizes: ['S', 'M', 'L', 'XL'], 
  discount: 0
},
  { id: '10', name: 'Philadelphia 76ers Joel Embiid Jersey', price: 89.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'jerseys', availability: true, brand: 'Nike', rating: 4.7, sizes: ['M', 'L', 'XL', 'XXL'], discount: 0 },
  { id: '11', name: 'Phoenix Suns Devin Booker Jersey', price: 89.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'jerseys', availability: true, brand: 'Nike', rating: 4.6, sizes: ['S', 'M', 'L', 'XL'], discount: 0 },
  { id: '12', name: 'Miami Heat Jimmy Butler Jersey', price: 89.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'jerseys', availability: true, brand: 'Nike', rating: 4.7, sizes: ['S', 'M', 'L', 'XL'], discount: 0 },
  { id: '13', name: 'Denver Nuggets Nikola Jokic Jersey', price: 89.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'jerseys', availability: true, brand: 'Nike', rating: 4.9, sizes: ['S', 'M', 'L', 'XL', 'XXL'], discount: 0 },
  { id: '14', name: 'New York Knicks Jalen Brunson Jersey', price: 79.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'jerseys', availability: true, brand: 'Nike', rating: 4.5, sizes: ['S', 'M', 'L', 'XL'], discount: 0 },
  { id: '15', name: 'Toronto Raptors Scottie Barnes Jersey', price: 79.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'jerseys', availability: true, brand: 'Nike', rating: 4.6, sizes: ['S', 'M', 'L', 'XL'], discount: 0 },
  { id: '30', name: 'Kids LeBron James Jersey (Youth)', price: 59.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'jerseys', availability: true, brand: 'Nike', rating: 4.7, sizes: ['YS', 'YM', 'YL', 'YXL'], discount: 0 },
  { id: '31', name: 'Kids Stephen Curry Jersey (Youth)', price: 59.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'jerseys', availability: true, brand: 'Nike', rating: 4.8, sizes: ['YS', 'YM', 'YL', 'YXL'], discount: 10 },
  { id: '36', name: 'Women\'s NBA Jersey - Curvy Fit', price: 79.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'jerseys', availability: true, brand: 'Nike', rating: 4.7, sizes: ['XS', 'S', 'M', 'L', 'XL'], discount: 0 },

  // SHORTS (4 products)
  { id: '4', name: 'NBA Elite Basketball Shorts', price: 59.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'shorts', availability: true, brand: 'Nike', rating: 4.6, sizes: ['S', 'M', 'L', 'XL'], discount: 15 },
  { id: '16', name: 'Los Angeles Lakers Practice Shorts', price: 49.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'shorts', availability: true, brand: 'Nike', rating: 4.5, sizes: ['S', 'M', 'L', 'XL'], discount: 15 },
  { id: '17', name: 'Chicago Bulls Vintage Shorts', price: 54.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'shorts', availability: true, brand: 'Mitchell & Ness', rating: 4.7, sizes: ['S', 'M', 'L', 'XL'], discount: 0 },
  { id: '18', name: 'NBA All-Star Game Shorts 2024', price: 64.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'limited edition', availability: true, brand: 'Nike', rating: 4.8, sizes: ['M', 'L', 'XL'], discount: 10 },

  // ACCESSORIES (9 products)
  { id: '5', name: 'NBA Championship Hat', price: 34.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'accessories', availability: true, brand: 'New Era', rating: 4.7, sizes: ['S/M', 'L/XL'], discount: 0 },
  { id: '19', name: 'Spalding NBA Official Game Ball', price: 89.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'accessories', availability: true, brand: 'Spalding', rating: 4.9, sizes: ['Size 7'], discount: 0 },
  { id: '20', name: 'NBA Team Socks 3-Pack', price: 24.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'accessories', availability: true, brand: 'Stance', rating: 4.5, sizes: ['M', 'L', 'XL'], discount: 20 },
  { id: '21', name: 'NBA Backpack - Team Edition', price: 69.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'accessories', availability: true, brand: 'Nike', rating: 4.6, sizes: ['One Size'], discount: 0 },
  { id: '22', name: 'NBA Headband & Wristband Set', price: 19.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'accessories', availability: true, brand: 'NBA', rating: 4.4, sizes: ['One Size'], discount: 0 },
  { id: '27', name: 'NBA Team Hoodie - Full Zip', price: 79.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'accessories', availability: true, brand: 'Nike', rating: 4.7, sizes: ['S', 'M', 'L', 'XL', 'XXL'], discount: 15 },
  { id: '28', name: 'NBA Shooting Shirt', price: 59.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'accessories', availability: true, brand: 'Nike', rating: 4.6, sizes: ['S', 'M', 'L', 'XL'], discount: 0 },
  { id: '29', name: 'NBA Winter Beanie', price: 29.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'accessories', availability: true, brand: 'New Era', rating: 4.5, sizes: ['One Size'], discount: 0 },
  { id: '32', name: 'NBA Kids Basketball Set', price: 34.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'accessories', availability: true, brand: 'Spalding', rating: 4.6, sizes: ['Size 5'], discount: 0 },
  { id: '37', name: 'Women\'s NBA Cropped Hoodie', price: 64.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'accessories', availability: true, brand: 'Nike', rating: 4.8, sizes: ['XS', 'S', 'M', 'L'], discount: 15 },

  // LIMITED EDITION (9 products)
  { id: '23', name: 'Kobe Bryant Tribute Edition Jersey', price: 159.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'limited edition', availability: true, brand: 'Nike', rating: 5.0, sizes: ['M', 'L', 'XL'], discount: 0 },
  { id: '24', name: 'NBA 75th Anniversary Diamond Jersey', price: 149.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'limited edition', availability: true, brand: 'Nike', rating: 4.9, sizes: ['S', 'M', 'L', 'XL'], discount: 0 },
  { id: '25', name: 'Michael Jordan Rookie Season Jersey', price: 199.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'limited edition', availability: true, brand: 'Mitchell & Ness', rating: 5.0, sizes: ['M', 'L', 'XL'], discount: 0 },
  { id: '26', name: 'LeBron James Lakers Championship Jersey', price: 139.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'limited edition', availability: true, brand: 'Nike', rating: 4.9, sizes: ['S', 'M', 'L', 'XL'], discount: 0 },
  { id: '33', name: 'Vintage Larry Bird Celtics Jersey', price: 119.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'limited edition', availability: true, brand: 'Mitchell & Ness', rating: 4.9, sizes: ['M', 'L', 'XL'], discount: 0 },
  { id: '34', name: 'Vintage Magic Johnson Lakers Jersey', price: 119.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'limited edition', availability: true, brand: 'Mitchell & Ness', rating: 4.9, sizes: ['M', 'L', 'XL'], discount: 0 },
  { id: '35', name: 'Vintage Allen Iverson 76ers Jersey', price: 109.99, image: 'https://images.unsplash.com/photo-1584735175313-ee9a4a24c63d?w=400', category: 'limited edition', availability: true, brand: 'Mitchell & Ness', rating: 4.8, sizes: ['S', 'M', 'L', 'XL'], discount: 5 }
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
