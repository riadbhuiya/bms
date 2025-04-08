// import mysql from 'mysql2/promise';
// import { pool } from "./db.js";
import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import { homeRouter } from "./routes/home.js"
import { readRouter } from "./routes/read.js"
import { loginRouter } from "./routes/login.js"
import { registerRouter } from "./routes/register.js"

const app = express();
const port = 8080;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use("/public", express.static(path.join(__dirname, "public")))

app.use("/home", homeRouter);
app.use("/read", readRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.get("*", (req, res) => {
    res.redirect("/home")
})

app.listen(port, () => {
    console.log(`listening to http://localhost:${port || process.env.PORT}`)
})