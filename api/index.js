require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user.routes');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`|| Connected to DB ||`);
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// routes
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hello from Mern Estate');
});

// server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`|| Server started at port ${PORT} ||`);
});
