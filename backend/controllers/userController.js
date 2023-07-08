import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import nodemailer from 'nodemailer';


// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      preference: user.preference,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, preference, password, cpassword } = req.body;
  const userExists = await User.findOne({ email });

  // console.log({name, email, phone, preference, password, cpassword})
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  if (!name || !email || !phone || !preference || !password || !cpassword) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }
  const user = await User.create({
    name, email, phone, preference, password, cpassword,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      preference: user.preference,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/ out
// @access  Public
const logoutUser = (req, res) => {
  res.clearCookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,         // Include the 'phone' field
      preference: user.preference,   // Include the 'preference' field
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.preference = req.body.preference || user.preference;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});



// @desc    Send contact form email
// @route   POST /api/users/contact
// @access  Public
const sendContactEmail = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  // console.log({ name, email, message })

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shivampatel868@gmail.com',
      pass: 'cskkcvfzdswlcwkp',
    },
  });

  const mailOptions = {
    from: 'Magicentertainment@FUN.com',
    to: 'shivampatel868@yahoo.com',
    subject: subject,
    text: `New Message From:
    Name: ${name},
    Email: ${email},
    Message: ${message}`,
  };

  transporter
    .sendMail(mailOptions)
    .then((info) => {
      res.status(200).json({ message: 'Email Sent successfully' });
    })
    .catch((error) => {
      console.log(error);
    });

});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  sendContactEmail,
};
