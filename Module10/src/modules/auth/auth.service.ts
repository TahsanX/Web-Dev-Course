import { pool } from '../../DB/index.js';
import bcrypt from 'bcrypt';
import type { Isignup } from './auth.interface.js';

export const createUserService = async (userData: Isignup) => {
  const { name, email, password, role } = userData;

  const mainpass = String(password);
  const hashPassword = await bcrypt.hash(mainpass, 10);


  const result = await pool.query(
    `INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING *`,
    [name, email, hashPassword, role]
  );

  const newUser = result.rows[0];

  const userResponse = { ...newUser };
  delete userResponse.password;

  return userResponse;
};