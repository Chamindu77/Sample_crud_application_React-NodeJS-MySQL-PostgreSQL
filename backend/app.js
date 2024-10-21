require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { selectDatabase } = require("./Model/databaseHandler"); // Import the dynamic database handler
const userRoutes = require("./Routes/userRoutes");
const studentRoutes = require("./Routes/studentRoutes");

const app = express(); 

// Middleware setup
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000" 
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route setup
app.use("/", userRoutes); 
app.use("/api/Student", studentRoutes); 

// Select the database based on the environment variable
const sequelize = selectDatabase(process.env.DB_TYPE); // Set DB_TYPE to 'mysql' or 'postgresql'

// Sync Sequelize models and create database tables if they don't exist
sequelize.sync({ force: false })  // Set force: true for development if you want to drop and recreate tables
  .then(() => {
    console.log("Database & tables synced successfully.");
  })
  .catch(err => {
    console.error("Error syncing database & tables:", err);
  });

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
