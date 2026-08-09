const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes")
const loginRoutes = require("./routes/loginRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")

const ProductDataRoutes = require("./routes/GetProdRoutes")

const orderRoutes = require("./routes/ordersRoutes");


const ProductData = require("./routes/ProductRoutes")

const getSingleProduct = require("./routes/GetSingleProduct")

const profileRoutes = require("./routes/profileRoutes")
const categoryRoutes = require("./routes/categoryRoutes");



connectDB();

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Routes
app.use("/api/users", userRoutes);
app.use("/api/users", loginRoutes);
app.use("/api/users", dashboardRoutes);
app.use("/api/users", profileRoutes);

// https://myshopecommerce-backend.onrender.com/api/productsdetails
app.use("/api", ProductDataRoutes);

app.use("/api/orders", orderRoutes);
app.use("/api", ProductData);
app.use("/api", getSingleProduct);
app.use("/api/categories", categoryRoutes);


app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});