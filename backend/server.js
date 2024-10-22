import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
app.use(express.json()); // middleware that allows to accept JSON data and parse in the req.body

app.use("/api/products", productRoutes); // calls product.route.js and prefixes the CRUD methods

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist"))); //__dirname goes to the root, then frontend, then dist
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html")); // renders __dirname to /frontend/dist/index.html
    })
}

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});
