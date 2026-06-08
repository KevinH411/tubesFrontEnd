const fs = require("node:fs");
const path = require("node:path");
const express = require('express');
const app = express();
const cors = require("cors")

let users = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'users.json')));
let todos = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'todo.json')));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json())
app.use(cors());

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
        return res.status(401).json({ message: "Wrong password" });
    }

    return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email
    });
});

app.get("/api/todo/:id", (req, res) => {
    const id = Number(req.params.id);

    const userTodo = todos.filter(t => t.userId === id);

    return res.json(userTodo)
});

app.listen(8080, () => {
    console.log('Listening...');
});