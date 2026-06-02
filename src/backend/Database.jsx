const users = await fetch("/users.json").then(r => r.json())
const todos = await fetch("/todo.json").then(r => r.json())

function findUserByEmail(email) {
    for (let i = 0; i < users.length; i++) {
        let tmp = users[i];
        if (tmp.email === email) {
            return tmp
        }
    }

    return null
}

function findUserByName(username) {
    for (let i = 0; i < users.length; i++) {
        let tmp = users[i];
        if (tmp.username === username) {
            return tmp
        }
    }
    
    return null
}

function getTodoList(id) {
    return todos.filter(todo => todo.userId === id);
}

export {
    findUserByEmail,
    findUserByName,
    getTodoList
};