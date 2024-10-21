const User = require('../Model/userModel');
const jwt = require('jsonwebtoken');
const bcryptJS = require('bcryptjs');

// Registration
exports.registration = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!(firstName && lastName && email && password)) {
      return res.status(401).send("All fields are required!");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(401).send("User already exists.");
    }

    // Hash the password
    const hashedPassword = await bcryptJS.hash(password, 10);

    // Create the new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      process.env.SECRET,
      { expiresIn: '3d' }
    );

    user.token = token;
    user.password = undefined; // Hide password

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(401).send("Email and password are required.");
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email doesn't exist, please create an account!",
      });
    }

    // Compare password
    if (await bcryptJS.compare(password, user.password)) {
      // Create JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        process.env.SECRET,
        { expiresIn: '3d' }
      );

      user.password = undefined;
      user.token = token;

      return res.status(200).json({
        success: true,
        token,
        user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password didn't match!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

// Get user by ID
exports.getUser = async (req, res) => {
  try {
    // Find user by ID
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).send("No such user exists");
    }

    user.password = undefined; // Hide password

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
