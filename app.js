// app.js
const express = require("express");
const app = express();
const path = require("node:path");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Mini message board Express app - listening on port ${PORT}!`);
});

app.get("/", (req, res) => {
    res.render("index", {title: "Mini Messageboard!", messages: messages});
});

app.get("/new", (req, res) => {
    res.render("form");
});

app.post("/new", (req, res) => {
    messages.push({ text: req.body.message, user: req.body.name, added: new Date() });
    res.redirect("/");
});