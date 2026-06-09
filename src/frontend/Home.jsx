import { createSignal, createEffect, Show, For, onMount } from "solid-js";
import { A, useLocation, useNavigate } from "@solidjs/router";
import Header from "./Header";
import "./css/home.css";
import Calendar from "./Calendar";
import { getTodoList, deleteTodo } from "./Database";

const TrashIcon = () => (
    <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4 7H20"
            stroke="#333"
            stroke-width="2"
            stroke-linecap="round"
        />
        <path
            d="M9 7V5C9 4.4 9.4 4 10 4H14C14.6 4 15 4.4 15 5V7"
            stroke="#333"
            stroke-width="2"
            stroke-linecap="round"
        />
        <rect
            x="6"
            y="7"
            width="12"
            height="13"
            rx="1"
            stroke="#333"
            stroke-width="2"
        />
    </svg>
);

function TableContent(props) {
    const [page, setPage] = createSignal(1);
    const [search, setSearch] = createSignal("");
    const filteredTasks = () => {
        return props.tasks.filter(task =>
            task.title.toLowerCase().includes(search().toLowerCase())
        );
    };
    const maxPage = () => Math.max(1, Math.ceil(filteredTasks().length / 5));
    const start = () => (page() - 1) * 5;

    const displayedTask = () => {
        return filteredTasks().slice(start(), start() + 5);
    };

    return (
        <>
            <div id="search-container">
                <input 
                    type="text" 
                    id="search-input" 
                    placeholder="Search by title"
                    value={search()}
                    onInput={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }} 
                />
            </div>

            <div id="table-container">
                <table id="todo-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        <For each={displayedTask()} fallback={
                            <tr>
                                <td colspan="5" style={{ "text-align": "center" }}>No tasks found. Add a new one!</td>
                            </tr>
                        }>
                            {(task, index) => {
                                const formattedDate = task.dueDate
                                    ? task.dueDate.split("T")[0]
                                    : "No Deadline";

                                return (
                                    <tr>
                                        <td>{start() + index() + 1}</td>
                                        <td>{task.title}</td>
                                        <td>{task.description}</td>
                                        <td>{formattedDate}</td>
                                        <td>
                                            <button onClick={() => props.onDelete(task.taskId)}>
                                                <TrashIcon />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }}
                        </For>
                    </tbody>
                </table>
            </div>

            <div id="table-button">
                <button id="prev-button" classList={{ disabled: page() === 1 }} onClick={() => setPage(p => Math.max(1, p - 1))}>
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M18 4 L6 12 L18 20 Z" fill="black" />
                    </svg>
                </button>

                <button id="next-button" classList={{ disabled: page() === maxPage() }} onClick={() => setPage(p => Math.max(1, p + 1))}>
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M6 4 L18 12 L6 20 Z" fill="black" />
                    </svg>
                </button>
            </div>
        </>
    );
}

export default () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = createSignal(null);
    const [tasks, setTasks] = createSignal([]);

    const handleDelete = async (taskId) => {
        const confirmDelete = confirm("Are you sure you want to delete this task?");
        if (!confirmDelete) return;

        try {
            // Hapus di backend (.json)
            await deleteTodo(taskId);
            // Hapus di frontend (tampilan langsung update otomatis)
            setTasks(tasks().filter(task => task.taskId !== taskId));
        } catch (err) {
            alert(err.message);
        }
    };

    onMount(async () => {
        const storedUser = localStorage.getItem("currentUser");

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            const loadTask = async () => {
                try {
                    const userTasks = await getTodoList(parsedUser.id);
                    setTasks(userTasks || []);
                } catch (err) {
                    alert(err.message);
                }
            }
            loadTask();

        } else {

            navigate("/Login", { replace: true });
        }
    });

    return (
        <Show when={user()}>
            <Header />
            <div id="upper-home">
                <div id="home-navigation">
                    <A href="/">Table</A>
                    <A href="/Calendar">Calendar</A>
                </div>

                <A id="create-button" href='/Create'>Add a new Task</A>
            </div>

            <div id="home-content">
                <Show when={location.pathname === "/"}>
                    <TableContent tasks={tasks()} onDelete={handleDelete} />
                </Show>

                <Show when={location.pathname === "/Calendar"}>
                    <Calendar />
                </Show>
            </div>
        </Show>
    );
};
