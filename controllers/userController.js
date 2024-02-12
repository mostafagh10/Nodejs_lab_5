const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const todoModel = require('../models/todo');

exports.getAllUsers = async (req, res) => {
  const users = await userModel.find({});
  res.status(200).json({
    users,
  });
};

exports.addNewUser = async (req, res) => {
  try {
    const {
      username, firstName, lastName, password, dob,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const newUser = {
      username,
      firstName,
      lastName,
      password: hashedpassword,
      dob,
    };
    const newuser = await userModel.create(newUser);
    res.status(201).json({
      message: 'the user added',
      data: newuser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.editUserInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        error: 'User not found',
        message: 'There\'s no user with this id',
      });
    } else {
      await userModel.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
      });
      res.status(200).json({
        message: 'the user updated',
        user,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        error: 'User not found',
        message: 'There\'s no user with this id',
      });
    } else {
      await userModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: 'the user deleted',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred',
    });
  }
};

exports.getUserTodos = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      res.status(404).json({
        error: 'User not found',
        message: 'There\'s no user with this id',
      });
    } else {
      const userTodos = await todoModel.find({ userId: req.params.id });
      res.status(200).json({
        userTodos,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json({
        errorMessage: 'username is not fount ...',
      });
    }

    const ismatch = await bcrypt.compare(req.body.password, user.password);
    if (!ismatch) {
      return res.status(400).json({
        errorMessage: 'password is incorrect',
      });
    }
    const userInfo = {
      user: {
        _id: user._id,
      },
    };
    jwt.sign(userInfo, 'asbfdngdfedcfsa', { expiresIn: '7h' }, (err, token) => {
      if (err) {
        console.log('jwt error = ', err);
      }

      res.status(201).json({
        token,
      });
    });
  } catch (error) {
    console.log('signup controller error : ', error);
    res.status(500).json({
      errorMessage: 'server error',
    });
  }
};
