import express from "express";
import { pool } from "../db.js";

export const adminRouter = express.Router();

adminRouter.get("/branches", async (req, res) => {
    try {
        const query = `select * from branches`

        const connection = await pool.getConnection();

        const [ branches ] = await connection.query(
            query
        );

        console.log(branches)

        pool.releaseConnection(connection);

        res.render("read", { branches, balance: false, transaction: false, loans: false, view: false, users: false, query })


    } catch (e) {
        console.log(`Database error: ${e}`)
        res.send(`${e}`);
    }
})

adminRouter.get("/accounts", async (req, res) => {
    try {
        const query = `select * from accounts`

        const connection = await pool.getConnection();

        const [ users ] = await connection.query(
            query
        );

        console.log(users)

        pool.releaseConnection(connection);

        res.render("read", { users, balance: false, transaction: false, loans: false, branches: false, view: true, query })


    } catch (e) {
        console.log(`Database error: ${e}`)
        res.send(`${e}`);
    }
})

adminRouter.get("/loans", async (req, res) => {
    try {
        const query = `select u.uid, u.fname, u.lname, l.lid, l.amount as loan_amount, l.duration, l.installments 
                        from loan l 
                        inner join balance as b ON l.bid = b.bid 
                        inner join user u ON b.uid = u.uid`;

        const connection = await pool.getConnection();

        const [ loans ] = await connection.query(
            query
        );

        console.log(loans)

        pool.releaseConnection(connection);

        res.render("read", { loans, users: false, balance: false, transaction: false, view: false, branches: false, query })
    } catch (e) {
        console.log(`Database error: ${e}`)
        res.send(`${e}`);
    }
})