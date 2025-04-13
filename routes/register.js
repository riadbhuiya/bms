import express from "express";
import { pool } from "../db.js";

export const registerRouter = express.Router();

registerRouter.get("/", (req, res) => {
    res.render("register")
})

registerRouter.post("/", async (req, res) => {

    const { fname, lname, email, password, phone, address, dob } = req.body;

    try {
        const query = `transaction`;

        const connection = await pool.getConnection();

        const [ data ] = await connection.query(
            `insert into user (fname, lname, dob, password, address, email, phone) values ('${fname}', '${lname}', '${dob}', '${password}', '${address}', '${email}', '${phone}')`
        );

        const [ name ] = await connection.query(
            `select fname, email, password from user where uid = "${data.insertId}" limit 1`
        );

        console.log(data);
        console.log(name);

        res.render("login", { name, register: true, query })


    } catch (e) {
        console.log(`Database error: ${e}`);
    }
})