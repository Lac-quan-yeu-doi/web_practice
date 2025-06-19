import express from 'express';
import { getProduct, postProduct, deleteProduct, updateWholeProduct } from '../controller/product.controller.js';

const router = express.Router();

router.get('/', getProduct);

router.post('/', postProduct);

router.delete('/:id', deleteProduct);

router.put('/:id', updateWholeProduct);

export default router;