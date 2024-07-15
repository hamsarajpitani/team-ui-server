const express = require("express");
const app = express();
const cors = require("cors");
const { connectDB } = require("./config/db");

//* MIDDLEWARE
//to recognize JSOn
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//* DATABASE
connectDB();

const memberRoutes = require('./routes/memberRoutes');

// Routes
app.use('/api/members', memberRoutes);

// Start server
app.listen(4000, () => {
  console.log(`Server running on port ${4000}`);
});

module.exports = app