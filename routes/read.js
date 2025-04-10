import express from "express";
import { pool } from "../db.js";

export const readRouter = express.Router();

readRouter.get("/account/:fname", async (req, res) => {

    try{
        const fname = req.params.fname;
        console.log(fname);

        const connection = await pool.getConnection();

        const [ users ] = await connection.query(
            `select * from user where fname = "${fname}"`
        );
        console.log(users)

        pool.releaseConnection(connection);

        res.render("read", { users, balance: false, transaction: false, loan: false })

    } catch (e) {

        console.log(`Database error: ${e}`)
        res.send(`${e}`);

    }
})

readRouter.get("/balance/:fname", async (req, res) => {
    try {
        const fname = req.params.fname;

        const connection = await pool.getConnection();

        const [ balance ] = await connection.query(
            `select balance.balance, balance.uid, user.fname

            from balance
            
            inner join user
            
            on balance.uid = user.uid
            
            where fname = "${fname}"`
        );

        console.log(balance)

        pool.releaseConnection(connection);

        res.render("read", { balance, users: false, transaction: false, loan: false })
    } catch (e) {
        console.log(`Database error: ${e}`)
        res.send(`${e}`);
    }
})

readRouter.get("/transaction/:fname", async (req, res) => {
    try {
        const fname = req.params.fname;

        const connection = await pool.getConnection();

        const [ transaction ] = await connection.query(
            `select transaction.tid, transaction.date, transaction.sender_uid, transaction.receiver_uid, transaction.amount, user.fname

            from transaction
            
            inner join user
            
            on transaction.sender_uid = user.uid
            
            where fname = "${fname}"`
        );

        console.log(transaction)

        pool.releaseConnection(connection);

        res.render("read", { transaction, users: false, balance: false, loan: false })
    } catch (e) {
        console.log(`Database error: ${e}`)
        res.send(`${e}`);
    }
})

readRouter.get("/loan", async (req, res) => {
    try {
        const fname = req.params.fname;

        const connection = await pool.getConnection();

        const [ loan ] = await connection.query(
            'select * from loan'
        );

        console.log(loan)

        pool.releaseConnection(connection);

        res.render("read", { loan, users: false, balance: false, transaction: false })
    } catch (e) {
        console.log(`Database error: ${e}`)
        res.send(`${e}`);
    }
})