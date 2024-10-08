import express from 'express';
const router = express.Router();

import {getOrder, getProducts, createOrder} from '../Controllers/Customer.js';


router.get('/orders',getOrder);
router.get('/products', getProducts);
router.post('/createOrder',createOrder);

export default router;