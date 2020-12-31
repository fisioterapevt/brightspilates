const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");

const connectDB = require("./config/mongo-db");
const userRoutes = require("./routes/user-routes");
const orderRoutes = require("./routes/order-routes");
const videoRoutes = require("./routes/video-routes");
const uploadRoutes = require("./routes/upload-routes");
const uploadContentRoutes = require("./routes/upload-content-routes");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("API is running...");
});

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/content", uploadContentRoutes);

app.get("/api/config/paypal", (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);

__dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/content", express.static(path.join(__dirname, "/content")));

const PORT = process.env.PORT || 8000;

// connect to MongoDB
connectDB().then(() => {
	app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
});
