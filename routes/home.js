import express from "express";

export const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
    res.render("home")
})

homeRouter.get("/about", (req, res) => {
    res.render("about")
})

homeRouter.get("/report", (req, res) => {
    res.render("report")
})