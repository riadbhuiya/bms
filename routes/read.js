import express from "express";
import { pool } from "../db.js";

export const readRouter = express.Router();

readRouter.get("/accounts", async (req, res) => {

    try{
        const connection = await pool.getConnection();

        const [ users ] = await connection.query(
            'select * from user'
        );
        console.log(users)

        pool.releaseConnection(connection);

        res.render("read", { users, balance: false, transaction: false, loan: false })

    } catch (e) {

        console.log(`Database error: ${e}`)

    }
})

readRouter.get("/balance", async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [ balance ] = await connection.query(
            'select * from balance'
        );

        console.log(balance)

        pool.releaseConnection(connection);

        res.render("read", { balance, users: false, transaction: false, loan: false })
    } catch (e) {
        console.log(`Database error: ${e}`)
    }
})

readRouter.get("/transaction", async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [ transaction ] = await connection.query(
            'select * from transaction'
        );

        console.log(transaction)

        pool.releaseConnection(connection);

        res.render("read", { transaction, users: false, balance: false, loan: false })
    } catch (e) {
        console.log(`Database error: ${e}`)
    }
})

readRouter.get("/loan", async (req, res) => {
    try {
        const connection = await pool.getConnection();

        const [ loan ] = await connection.query(
            'select * from loan'
        );

        console.log(loan)

        pool.releaseConnection(connection);

        res.render("read", { loan, users: false, balance: false, transaction: false })
    } catch (e) {
        console.log(`Database error: ${e}`)
    }
})