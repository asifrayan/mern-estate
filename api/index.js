require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user.routes');
const authRouter = require('./routes/auth.routes');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`|| Connected to DB ||`);
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

// routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello from Mern Estate');
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'internal server error';
  res.status(statusCode).json({
    success: 'false',
    statusCode,
    message,
  });
});

// server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`|| Server started at port ${PORT} ||`);
});
