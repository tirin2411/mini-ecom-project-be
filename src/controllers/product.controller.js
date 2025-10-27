import Product from "../models/product.model.js";

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export default {getProducts, createProduct}