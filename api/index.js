require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`|| Connected to DB ||`);
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`|| Server started at port ${PORT} ||`);
});
