const userRouter = require('express').Router();
const {
  getAllUsers, addNewUser, editUserInfo, deleteUser, getUserTodos, login,
} = require('../controllers/userController');

userRouter.get('/', getAllUsers);
userRouter.post('/', addNewUser);
userRouter.post('/login', login);
userRouter.patch('/:id', editUserInfo);
userRouter.delete('/:id', deleteUser);
userRouter.get('/:id/todos', getUserTodos);
module.exports = userRouter;
