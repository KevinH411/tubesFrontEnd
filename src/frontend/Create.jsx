import Header from "./Header";
import { A, useNavigate } from "@solidjs/router";
import "./css/create.css";
import { addTodo } from "./Database";
import { createSignal } from "solid-js";

export default function Create() { //:P

    const navigate = useNavigate();

    const storedUser = localStorage.getItem("currentUser");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    // redirect if not logged in
    if (!currentUser) {
        navigate("/Login");
        return null;
    }
    const [title, setTitle] = createSignal("");
    const [description, setDescription] = createSignal("");
    const [dueDate, setDueDate] = createSignal("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addTodo(title(), description(), dueDate());
            navigate("/");
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    return (
        <>
            <Header></Header>
            <div class="body">
                <h1>Create A New Task</h1>
                <form onSubmit={handleSubmit}>
                <div class="container">
                    <div id="p">
                        <p>Title</p>
                        <p>Description</p>
                        <p>Deadline</p>
                    </div>

                    <div id="inputs">
                        <input type="text" 
                            placeholder="Task title.."
                            onInput={(e) => setTitle(e.target.value)} 
                            value={title()}
                            required
                        />
                        <input type="text" 
                            placeholder="Task description.."
                            onInput={(e) => setDescription(e.target.value)} 
                            value={description()} 
                            required                          
                         />
                        <input type="date" 
                            onInput={(e) => setDueDate(e.target.value)} 
                            value={dueDate()}
                            required
                         />
                    </div>
                </div>
                    <button type="submit" class="create-task-btn">
                        Create Task
                    </button>
                
                </form>
            </div>
        </>
    );
};
