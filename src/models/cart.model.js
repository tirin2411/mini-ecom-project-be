import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "../models/user.model.js";
import CartItem from "./cartItem.model.js";

const Cart = sequelize.define('Cart', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
  timestamps: true,
})

Cart.belongsTo(User, { foreignKey: "userId" });
Cart.hasMany(CartItem, { foreignKey: "cartId", as: "items" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

export default Cart;