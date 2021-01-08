const fs = require("fs");

const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");

const connectDB = require("./config/mongo-db");
const userRoutes = require("./routes/user-routes");
const orderRoutes = require("./routes/order-routes");
const videoRoutes = require("./routes/video-routes");
const uploadContentRoutes = require("./routes/upload-content-routes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("API is running...");
});

__dirname = path.resolve();
app.use(
	"/uploads/avatars",
	express.static(path.join(__dirname, "uploads", "avatars"))
);
//app.use("/uploads/avatars", express.static(path.join("uploads", "avatars")));

//app.use("/content", express.static(path.join(__dirname, "content")));

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/videos", videoRoutes);

app.use("/api/content", uploadContentRoutes);
app.get("/api/config/paypal", (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

// connect to MongoDB first
connectDB().then(() => {
	app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
});
