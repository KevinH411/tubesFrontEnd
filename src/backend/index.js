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

app.post("/api/signup", (req, res) => {
    const { username, email, password } = req.body;
    if (users.some(u => u.username === username)) {
        return res.status(400).json({ message: "Username already exists" });
    }

    if (users.some(u => u.email === email)) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = { id: users.length + 1, username, email, password };
    users.push(newUser);
    fs.writeFileSync(path.resolve(__dirname, 'users.json'), JSON.stringify(users));

    return res.status(201).json({ message: "User created successfully" });
});

app.post("/api/todo", (req, res) => {
    const {title, description, dueDate} = req.body;
    const newTodo = { id: todos.length + 1, id: users.length+1, title, description, dueDate };
    todos.push(newTodo);
    fs.writeFileSync(path.resolve(__dirname, 'todo.json'), JSON.stringify(todos));
    return res.status(201).json({ message: "Todo created successfully" });
});

app.get("/api/todo/:id", (req, res) => {
    const id = Number(req.params.id);

    const userTodo = todos.filter(t => t.userId === id);

    return res.json(userTodo)
});

app.listen(8080, () => {
    console.log('Listening...');
});