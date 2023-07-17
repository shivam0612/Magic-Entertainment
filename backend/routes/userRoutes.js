import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  addSubscription,
  getSubscription
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { sendContactEmail } from '../controllers/userController.js';
import nodemailer from 'nodemailer';


const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);


// @desc    Send contact form email
// @route   POST /api/users/contact
// @access  Public
router.post('/contact', sendContactEmail);
router.post('/subscription', addSubscription);
router.get('/getsubscription', getSubscription) 


export default router;
