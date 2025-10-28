import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Product from "./product.model.js";
import Cart from "./cart.model.js";

const CartItem = sequelize.define('CartItem', {
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
  timestamps: true,
})

Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

export default CartItem;