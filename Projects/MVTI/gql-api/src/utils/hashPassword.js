import bcrypt from 'bcryptjs';
import CustomError from './error';

const hashPassword = (password) => {
  if (password.length < 8) {
    throw new CustomError('InvalidPassword', { message: 'Password must be 8 characters or longer.' });
  }
  return bcrypt.hash(password, 10);
};

export { hashPassword as default };
