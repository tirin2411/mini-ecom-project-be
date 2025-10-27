import express from "express";
import sequelize from "./config/database.js";
import productRoutes from "./routes/product.routes.js";
import Product from "./models/product.model.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server");
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected!");

    await sequelize.sync({ alter: true }); // Tự tạo bảng
    console.log("Tables synced!");

    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })



  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();