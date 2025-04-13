import express from "express";
import { pool } from "../db.js";

export const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
    res.render("login")
})

loginRouter.post("/welcome", async (req, res) => {
    const username = req.body.username;
    console.log(username)
    const password = req.body.pass;
    console.log(password);

    try {
        const query = `select fname, email, password, uid from user where fname = "${username}" and password = "${password}" limit 1`;

        const connection = await pool.getConnection();

        const [ data ] = await connection.query(
            query
        );
        console.log(data)

        pool.releaseConnection(connection);

        if (username === data[0].fname) {
            if (data[0].fname === "admin") {
                res.render("admin", { query })
            } else {
                res.render("welcome", { name: data[0].fname, uid: data[0].uid, register: false, query })
            }
        }

    } catch (e) {
        console.log(`Database error: ${e}`)
        res.send(`${e}`);
    }
})
