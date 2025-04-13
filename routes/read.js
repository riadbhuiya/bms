import express from "express";
import { pool } from "../db.js";

export const readRouter = express.Router();

readRouter.get("/account/:uid", async (req, res) => {

    try{
        const uid = req.params.uid;
        
        const query = `select * from user where uid = "${uid}"`;

        console.log(uid);

        const connection = await pool.getConnection();

        const [ users ] = await connection.query(
            query
        );
        console.log(users)

        pool.releaseConnection(connection);

        res.render("read", { users, balance: false, transaction: false, loan: false, query })

    } catch (e) {

        console.log(`Database error: ${e}`)
        res.send(`${e}`);

    }
})

readRouter.get("/balance/:uid", async (req, res) => {
    try {
        
        const uid = req.params.uid;
        
        const query = `select balance.balance, balance.uid, user.fname

            from balance
            
            inner join user
            
            on balance.uid = user.uid
            
            where user.uid = "${uid}"`;

        const connection = await pool.getConnection();

        const [ balance ] = await connection.query(
            query
        );

        console.log(balance)

        pool.releaseConnection(connection);

        res.render("read", { balance, users: false, transaction: false, loan: false, query })
    } catch (e) {
        console.log(`Database error: ${e}`)
        res.send(`${e}`);
    }
})

readRouter.get("/transaction/:uid", async (req, res) => {
    try {
        
        const uid = req.params.uid;
        
        const query = 
            `select transaction.tid, transaction.date, transaction.sender_uid, sender.fname as sender_name, transaction.receiver_uid, receiver.fname as receiver_name,transaction.amount

            from transaction
            
            inner join user sender on transaction.sender_uid = sender.uid

            inner join user receiver on transaction.receiver_uid = receiver.uid
            
            where transaction.sender_uid = "${uid}"`;

        const connection = await pool.getConnection();

        const [ transaction ] = await connection.query(
            query
        );

        const [ receivers ] = await connection.query(
            `select uid from user where uid != ${uid}`
        );

        console.log(transaction)
        console.log(receivers)

        pool.releaseConnection(connection);

        res.render("read", { transaction, users: false, balance: false, loan: false, query, receivers, uid })
    } catch (e) {
        console.log(`Database error: ${e}`)
        res.send(`${e}`);
    }
})

readRouter.post("/transaction/:uid", async (req, res) => {
    try {
        const uid = parseInt(req.params.uid);
        const { receiver, amount } = req.body;

        const query = `insert into transaction (sender_uid, receiver_uid, amount)
                        values (${uid}, ${receiver}, ${amount})`;

        const connection = await pool.getConnection();

        const [ statement ] = await connection.query(
            query
        );

        console.log(statement)
        console.log([uid, receiver, amount])

        pool.releaseConnection(connection);

        res.render("send", { statement, uid })

    } catch (e) {
        console.log(`Database error: ${e}`)
        res.send(`${e}`);
    }
})

readRouter.get("/loan/:uid", async (req, res) => {
    try {
        const uid = req.params.uid;

        const query = 'select * from loan'

        const connection = await pool.getConnection();

        const [ loan ] = await connection.query(
            query
        );

        console.log(loan)

        pool.releaseConnection(connection);

        res.render("read", { loan, users: false, balance: false, transaction: false, query })
    } catch (e) {
        console.log(`Database error: ${e}`)
        res.send(`${e}`);
    }
})