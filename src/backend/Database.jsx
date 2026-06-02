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

function addUser(username, email, password){
    let newId = users.length + 1;
    let newUser = {
        id: newId,
        username: username,
        email: email,
        password: password
    };

    users.push(newUser);
    console.log("Database updated: ", users);
    return true;
}

export {
    findUserByEmail,
    findUserByName,
    getTodoList,
    addUser
};
