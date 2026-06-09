const URL = "http://localhost:8080/api";

export async function login(email, password) {
    const res = await fetch(`${URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
    }

    return await res.json();
}

export async function signup(username, email, password) {
    const res = await fetch(`${URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });
        if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
    }

     return await res.json();
    
}

export async function getTodoList(id) {
    const res = await fetch(`${URL}/todo/${id}`);

    if (!res.ok) {
        throw new Error("Failed getting list");
    }

    return await res.json();
}

export async function addTodo(title, description, dueDate) {
    const res = await fetch(`${URL}/todo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, dueDate })
    });
        if (!res.ok) {
            throw new Error("Failed adding todo");
        }
        return await res.json();
}

export async function deleteTodo(taskId) { //fungsi untuk hapus ToDo
    const res = await fetch(`${URL}/todo/${taskId}`, {
        method: "DELETE"
    });

    if (!res.ok) {
        throw new Error("Failed deleting todo");
    }

    return await res.json();
}
