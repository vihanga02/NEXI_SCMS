import express from 'express';
const router = express.Router();

import customer_routes from './Customer.js';
import auth_routes from './Auth.js';

router.use('/customer', customer_routes);
router.use('/auth', auth_routes);

export default router;