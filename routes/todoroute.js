const todosrouter = require('express').Router();
const {
  getAllTodos, addNewTodo, updateTodo, deleteTodo,
} = require('../controllers/todoscontroller');

const { confirmbody, confirmbodyinupdate, confirmuserlogged } = require('../middlewares/todomiddlewares');

todosrouter.get('/', confirmuserlogged, getAllTodos);
todosrouter.post('/', confirmuserlogged, confirmbody, addNewTodo);
todosrouter.patch('/:id', confirmuserlogged, confirmbodyinupdate, updateTodo);
todosrouter.delete('/:id', confirmuserlogged, deleteTodo);

module.exports = todosrouter;
