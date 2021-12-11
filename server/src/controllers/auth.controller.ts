import { Request, Response } from 'express';
import { RegisterValidation } from '../validation/register.validation';
const User = require('../models/User');
import bcryptjs from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export const Register = async (req: Request, res: Response) => {
  const body = req.body;

  const { error } = RegisterValidation.validate(body);

  if (error) {
    return res.status(400).send(error.details);
  }

  if (body.password !== body.password_confirm) {
    return res.status(400).send({ message: "Password's do not match " });
  }

  let newUser = User({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: await bcryptjs.hash(body.password, 10),
  });
  await newUser.save((err: String) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: 'Success create a new User',
    });
  });
};

export const Login = async (req: Request, res: Response) => {
  // Chceck if the email exist
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).send({
      message: 'User not found!',
    });
  }
  if (!(await bcryptjs.compare(req.body.password, user.password))) {
    return res.status(400).send({
      message: 'Invalid credentials!',
    });
  }

  const token = sign({ id: user.id }, 'secret');

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 100, // 1day
  });
  res.send({
    message: 'success',
  });
};

export const AuthenticatedUser = async (req: Request, res: Response) => {
  // sent a token TODO latter
  const jwt = req.cookies['jwt'];
  console.log(jwt);
  res.send(jwt);
};

export const Logout = async (req: Request, res: Response) => {
  res.cookie('jwt', '', { maxAge: 0 });
  res.send({
    message: 'Success',
  });
};
