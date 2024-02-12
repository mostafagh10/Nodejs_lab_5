const jwt = require('jsonwebtoken');
const todoModel = require('../models/todo');

exports.getAllTodos = async (req, res) => {
  const token = req.headers.authorization;
  let userId = '';
  jwt.verify(token, 'asbfdngdfedcfsa', async (err, decodedToken) => {
    if (err) {
      console.log('JWT verification error:', err);
      return res.status(401).json({ errorMessage: 'Invalid token' });
    }
    userId = decodedToken.user._id;

    try {
      const query = { userId };

      if (req.query.status) {
        query.status = req.query.status;
      }

      let todosQuery = todoModel.find(query);

      if (req.query.limit) {
        todosQuery = todosQuery.limit(parseInt(req.query.limit));
      }

      if (req.query.skip) {
        todosQuery = todosQuery.skip(parseInt(req.query.skip));
      }

      const todos = await todosQuery.exec();

      if (todos.length > 0) {
        res.status(200).json({ todos });
      } else {
        res.status(404).send("There's no todo added yet");
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).send('Internal Server Error');
    }
  });
};

exports.addNewTodo = async (req, res) => {
  try {
    const token = req.headers.authorization;
    let userId = '';
    jwt.verify(token, 'asbfdngdfedcfsa', (err, decodedToken) => {
      if (err) {
        console.log('JWT verification error:', err);
        return res.status(401).json({ errorMessage: 'Invalid token' });
      }
      userId = decodedToken.user._id;
    });
    const newTodo = await todoModel.create({ ...req.body, userId });
    res.status(201).json({
      message: 'the todo added',
      data: newTodo,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const token = req.headers.authorization;
    let userId = '';
    jwt.verify(token, 'asbfdngdfedcfsa', (err, decodedToken) => {
      if (err) {
        console.log('JWT verification error:', err);
        return res.status(401).json({ errorMessage: 'Invalid token' });
      }
      userId = decodedToken.user._id;
    });
    const Todo = await todoModel.findById(req.params.id);
    if (!Todo) {
      res.status(404).json({
        error: 'Todo not found',
        message: 'There\'s no Todo with this id',
      });
    } else if (Todo.userId === userId) {
      await todoModel.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
      });
      res.status(200).json({
        message: 'the Todo updated',
        Todo,
      });
    } else {
      res.status(404).json({
        message: 'unauthorized to update this todo',
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

exports.deleteTodo = async (req, res) => {
  try {
    const token = req.headers.authorization;
    let userId = '';
    jwt.verify(token, 'asbfdngdfedcfsa', (err, decodedToken) => {
      if (err) {
        console.log('JWT verification error:', err);
        return res.status(401).json({ errorMessage: 'Invalid token' });
      }
      userId = decodedToken.user._id;
    });
    const todo = await todoModel.findById(req.params.id);
    if (!todo) {
      res.status(404).json({
        error: 'todo not found',
        message: 'There\'s no todo with this id',
      });
    } else if (todo.userId === userId) {
      await todoModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: 'the todo deleted',
      });
    } else {
      res.status(404).send('not authorized to delete tis todo');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred',
    });
  }
};
