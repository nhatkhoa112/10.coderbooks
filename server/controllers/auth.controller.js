const {
  AppError,
  catchAsync,
  sendResponse,
} = require('../helpers/utils.helper');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const authController = {};

authController.loginWithEmail = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return next(new AppError(400, 'Invalid credentials', 'Login Error'));

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError(400, 'Wrong password', 'Login Error'));

  accessToken = await user.generateToken();
  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    'Login successful'
  );
});

authController.loginWithFacebookOrGoogle = async ({ user }, res) => {
  if (user) {
    user = await User.findByIdAndUpdate(
      user._id,
      { avatarUrl: user.avatarUrl },
      { new: true }
    );
  } else {
    throw new Error('There is No User');
  }

  const accessToken = await user.generateToken();
  res.status(200).json({ status: 'success', data: { user, accessToken } });
};

module.exports = authController;
