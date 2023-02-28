const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', authRouter);

const start = async () => {
  await mongoose
    .connect('mongodb+srv://riot:riot@cluster0.uwesyc2.mongodb.net')
    .then(() => console.log('db ok'))
    .catch(() => console.log('db bad'));
  app.listen(8080, () => console.log('started'));
};

start();
