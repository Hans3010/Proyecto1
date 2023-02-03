const User = require('../models/user.model');

exports.createUser = async (req, res) => {
  try {
    const { name, password, amount } = req.body;

    const newUser = await User.create({
      name: name.toLowerCase(),
      password,
      amount,
    });
    res.status(201).json({
      status: 'success',
      message: 'The account was created sucessfully',
      newUser,
    });
  } catch (error) {
    console.log(error);
    if (error.parent.code === '22P02') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid DataType in your request',
      });
    }
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { accountNumber, password } = req.body;

    const user = await User.findOne({
      where: {
        status: true,
        accountNumber,
        password,
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'Logged',
    });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The account number or password is incorrect',
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.historyUser = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: true,
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'The user was found successfully',
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
