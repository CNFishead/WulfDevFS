import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import fileupload from "express-fileupload";
import path from "path";

// import routes
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import certRoutes from "./routes/certRoutes.js";
import expRoutes from "./routes/expRoutes.js";

// import middleware
import errorHandler from "./middleware/error.js";

// Load env vars
dotenv.config();

// Connnect to Database
connectDB();

const app = express();
// Body Parser, allows to accept body data
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(fileupload());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/certs", certRoutes);
app.use("/api/exp", expRoutes);

// Set static folder
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Init Middleware
// Has to be after routes, or the controllers cant use the middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server has started on port: ${PORT}, in ${process.env.NODE_ENV}`.yellow
  )
);
