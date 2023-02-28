const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = Router();

router.post('/sign-up', async (req, res) => {
  const { email, username, password } = req.body;

  const existUser = await User.findOne({ email });

  if (existUser) {
    return res
      .status(400)
      .json({ message: 'Пользователь с таким email уже существует' });
  } else if (password.length < 5) {
    return res.status(400).json({
      message: 'Пароль должен содержать как минимум 5 символов',
    });
  } else {
    const hashedPass = bcrypt.hashSync(password, 10);

    const newUser = new User({
      email: email,
      username: username,
      password: hashedPass,
    });

    const user = await newUser.save();

    res.status(201).json(user);
  }
});

router.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const compare = bcrypt.compareSync(password, user.password);

    if (compare) {
      const token = jwt.sign({ user }, 'secret_enc', {
        expiresIn: '24h',
      });

      res.status(200).json({ token });
    } else {
      res.status(400).json({ message: 'Неверные данные' });
    }
  } else {
    res.status(404).json({ message: 'Пользователь не найден' });
  }
});

module.exports = router;
