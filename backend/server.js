import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './route/route.model.js';
import Product from './models/product.model.js';
import path from 'path';


// Config
dotenv.config();
const PORT = process.env.PORT || 5000;
console.log(process.env.MONGO_URI);

const app = express(); 
app.use(express.json()); // to parse JSON in req.body

// Method
// app.get('/', (req, res) => {
//   res.send('This is home page');    
// });

app.use('/api/products', productRoutes); 
console.log(process.env.NODE_ENV, process.env.NODE_ENV == "production ");

const __dirname = path.resolve();

if(process.env.NODE_ENV === 'production ') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get("", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  })
}

app.listen(PORT, () => {
  connectDB();
  console.log('Server is running on http://localhost:' + PORT);
});