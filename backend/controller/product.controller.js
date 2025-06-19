import Product from '../models/product.model.js';
import mongoose from 'mongoose';


export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({}); // Fetch all products from the database 
    // Error 200: OK => products fetched successfully
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    // Error 500: Internal Server Error => something went wrong on the server
    console.error('Error fetching products:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching products', error: error.message });
  }
}

export const postProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image){
    // Error 400: Bad Request
    return res.status(400).json({success: false, message: 'Please fill in all required fields.' });
  }

  const newProduct = new Product(product);
  try {
    const savedProduct = await newProduct.save();
    // Error 201: Created => product created successfully
    res.status(201).json({success: true, data: savedProduct});
  } catch (error) {
    // Error 500: Internal Server Error => something went wrong on the server
    console.error('Error saving product:', error.message);
    res.status(500).json({ success: false, message: 'Error saving product', error: error.message });
  }

}

export const deleteProduct = async (req, res) => {
  // id is a parameter in the URL, e.g., /products/12345
  // Destructure the id from req.params: => that's why the variable is named id, has to match the URL parameter "id"
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    // Error 400: Bad Request => invalid ID format
    return res.status(400).json({ success: false, message: 'Invalid product ID format, product ID has to be a 24-character HEX string, like this 78486ebfa77e7ec1497d4976' });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    console.log(`Product`, deletedProduct);
    if (!deletedProduct) {
      // Error 404: Not Found => product not found
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    // Error 200: OK => product deleted successfully
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    // Error 500: Internal Server Error => something went wrong on the server
    console.error('Error deleting product:', error.message);
    res.status(500).json({ success: false, message: 'Error deleting product', error: error.message });
  }
}

export const updateWholeProduct = async (req, res) => {
  const { id } = req.params;
  // newValues only contains the fields that users want to update, not all fields of the product
  const newValues = req.body;

  if (!newValues.name || !newValues.price || !newValues.image){
  // Error 400: Bad Request
  return res.status(400).json({success: false, message: 'Please fill in all required fields.' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    // Error 400: Bad Request => invalid ID format
    return res.status(400).json({ success: false, message: 'Invalid product ID format, product ID has to be a 24-character HEX string, like this 78486ebfa77e7ec1497d4976' });
  }

  try {
    const product = await Product.findByIdAndUpdate(id, newValues, { new: false });
    if (!product) {
      // Error 404: Not Found => product not found
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // users only udpate the fields they want in newValues => others fields like _id, createdAt, updatedAt are not included in the request body => create a new object with the updated fields
    const updatedProduct = {
      ...product.toObject(), // Convert Mongoose document to plain object => keep the need fields like _id, createdAt, updatedAt,... not all fields in mongoose document
      name: newValues.name,
      price: newValues.price,
      image: newValues.image
    };
    
    // Error 200: OK => product updated successfully
    // res.status(200).json(product);
    res.status(200).json({success: true, message: 'Product updated', old: product, update: updatedProduct});
  } catch (error) {
    // Error 500: Internal Server Error => something went wrong on the server
    console.error('Server error: ', error.message);
    res.status(500).json({ success: false, message: 'Server error: ', error: error.message });
  }
}