import mongoose, { mongo } from "mongoose"

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cateogry: {
    type: String,
    required: false, // Optional field
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
})

// variable "Product" define the fields of collections like class in OOP
const Product = mongoose.model("Product", productSchema) 
export default Product;