const express = require('express');
const mongoose = require('mongoose');

const app = express();

const todosrouter = require('./routes/todoroute');
const userRouter = require('./routes/userRoute');

app.use(express.json());
mongoose.connect('mongodb://localhost:27017/todo', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log('the connection done with database'));

app.use('/users', userRouter);
app.use('/todos', todosrouter);

app.listen(3000, () => {
  console.log('the server working on port 3000');
});
