import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config()

/* 
createPool method: Creates a pool of connections for efficient management of multiple database requests, improving performance and resource utilization. Rather than using a single connection by createConnection().
diff between createConnection and createPool is obvious when the website is online, however i just desired to be familier with createPool method.
*/
const pool = mysql.createPool({
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
  
    }).promise();

 async function getNotes() {
    const result = await pool.query("SELECT * FROM notes")
    const rows = result[0]
    return rows;
}

async function getNote(id){
    const [rows] = await pool.query(
        `SELECT * 
        FROM notes 
        WHERE id = ?`, [id]) //syntx of query is appropriate to avoiding sql injections.
    return rows;
}

async function createNote(title,contents) {
    const [result] = await pool.query(`INSERT INTO notes (title, contents) VALUES (?, ?)`, [title, contents])
    const id = result.insertId;
return getNote(id);
}

async function deleteNote(id) {
    const result = await pool.query("DELETE FROM notes WHERE id =?", [id])
    return {
        id: result.insertId     
    };
}


async function updateNote(id, title, content) {
const result = await pool.query(
        `UPDATE notes 
        SET title =?, contents =?
        WHERE id =?`, [title, content, id])
    return {
        id: result.insertId,
        title,
        content
    };
}

async function truncateNotes() {
    const queryTrucnate = await pool.query("truncate table notes") 
    return getNotes();
}

export { getNotes, getNote, createNote, deleteNote, updateNote, truncateNotes };







