import { pool } from "../../DB";
import type { ICreateIssue } from "./issue.interface";

export const createIssueService = async (data: ICreateIssue) => {
  const { title, description, type, reporterId } = data;
  const result = await pool.query(
    `INSERT INTO issues(title, description, type, reporter_id) VALUES($1, $2, $3, $4) RETURNING *`,
    [title, description, type, reporterId],
  );
  return result.rows[0];
};
export const getIssuesService = async (query: any) => {
  const { sort, type, status } = query;

  let sql = `SELECT * FROM issues WHERE 1=1`;
  const params: any[] = [];
  let paramCount = 1;

  if (type) {
    sql += ` AND type = $${paramCount++}`;
    params.push(type);
  }
  if (status) {
    sql += ` AND status = $${paramCount++}`;
    params.push(status);
  }

  const sortOrder = sort === "oldest" ? "ASC" : "DESC";
  sql += ` ORDER BY created_at ${sortOrder}`;

  const result = await pool.query(sql, params);
  return result.rows;
};
export const getSingleUserFromDB = async (id: string) => {
  try {
    var result = await pool.query(
      `
      SELECT * FROM issues WHERE id=$1  
        `,
      [id],
    );
    const reporter = await pool.query(
      `
    SELECT id,name,role FROM users WHERE id=$1
    `,
      [result.rows[0].reporter_id],
    );
    result.rows[0].reporter = reporter.rows[0];
    delete result.rows[0].reporter_id
    const properresult = result.rows[0];
    if (properresult) {
        return {success: true, properresult}
    }
    else{
        return {success: false}
    }
  } catch (error) {
    return {success: false, error}
  }
};
export const deleteSingleUserFromDB = async (id: string) => {

    const result = await pool.query(
      `
      DELETE FROM issues WHERE id=$1  
        `,
      [id],
    );
    return result

};
