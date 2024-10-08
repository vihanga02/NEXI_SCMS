import Customer from '../Models/Customer.js';

async function getOrder(req, res) {
    try {
        const order = await Customer.getOrders(req);
        console.log(order);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'server error' });
    }
}

async function getProducts(req, res) {
    try {
        const products = await Customer.getProducts(req);
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'server error' });
    }
}

async function createOrder(req, res) {
    try {
        const order = await Customer.createOrder(req);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'server error' });
    }
}

export { getOrder, getProducts, createOrder };