import { pool } from "../../DB";
import type { ICreateIssue, IUpdateIssue } from "./issue.interface";

export const createIssueService = async (data: ICreateIssue) => {
  const { title, description, type, reporterId } = data;
  const result = await pool.query(
    `INSERT INTO issues(title, description, type, reporter_id) VALUES($1, $2, $3, $4) RETURNING *`,
    [title, description, type, reporterId],
  );
  return result.rows[0];
};
interface IssueQuery {
  sort: string;
  type: string;
  status: string;
}

export const getIssuesService = async (query: IssueQuery) => {
  const { sort, type, status } = query;

  let sql = `SELECT * FROM issues WHERE 1=1`;
  const params: string[] = [];
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

  const issues = await Promise.all(
    result.rows.map(async (issue) => {
      const reporterResult = await pool.query(
        `SELECT id, name, role FROM users WHERE id=$1`,
        [issue.reporter_id],
      );
      const { reporter_id, ...rest } = issue;
      return { ...rest, reporter: reporterResult.rows[0] };
    }),
  );

  return issues;
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
export const updateIssueService = async (
  id: string,
  data: IUpdateIssue,
) => {
  const { title, description, type } = data;
  const updates: string[] = [];
  const params: (string | number)[] = [];
  let paramCount = 1;

  if (title !== undefined) {
    updates.push(`title = $${paramCount++}`);
    params.push(title);
  }
  if (description !== undefined) {
    updates.push(`description = $${paramCount++}`);
    params.push(description);
  }
  if (type !== undefined) {
    updates.push(`type = $${paramCount++}`);
    params.push(type);
  }

  updates.push(`updated_at = NOW()`);
  params.push(id);

  const sql = `UPDATE issues SET ${updates.join(", ")} WHERE id = $${paramCount} RETURNING *`;
  const result = await pool.query(sql, params);
  return result;
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
export const SingleUpdateissuefromDB = async (id: string) => {

    const result = await pool.query(
      `
      SELECT * FROM issues WHERE id=$1  
        `,
      [id],
    );
    return result
};