import express from 'express';
import cartController from '../controllers/cart.controller.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, cartController.getCart);
router.post('/', verifyToken, cartController.addtoCart);
router.delete('/:id', verifyToken, cartController.removeFromCart);

export default router;