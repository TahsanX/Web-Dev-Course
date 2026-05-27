import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUser } from "./user.interface";
const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, age, role = "user" } = payload;

  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      `
     INSERT INTO users(name,email,password,age,role) VALUES($1,$2,$3,$4,$5) RETURNING *
    `,
      [name, email, hashPassword, age, role],
    );
    delete result.rows[0].password;
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error occured during saving user: ", error.message);
    } else {
      console.log("Error occured during saving user: ", String(error));
    }
  }
};
const getAllUsersFromDB = async () => {
  const result = await pool.query(`
      SELECT * FROM users  
        `);
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM users WHERE id=$1  
        `,
    [id],
  );
  return result;
};

const updateUserFromDB = async (payload: IUser, id: string) => {
  const { name, password, age, is_active } = payload;

  const result = await pool.query(
    `
    UPDATE users 
    SET 
    name=COALESCE($1,name),
    password=COALESCE($2,password),
    age=COALESCE($3,age),
    is_active=COALESCE($4,is_active) 

    WHERE id=$5 RETURNING *
    `,
    [name, password, age, is_active, id],
  );

  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM users WHERE id=$1  
      `,
    [id],
  );
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
