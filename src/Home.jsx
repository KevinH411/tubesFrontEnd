import Header from "./Header";
import { A, useLocation } from "@solidjs/router";
import "./css/home.css";
import Calendar from "./Calendar";

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

function TableContent() {
    return (
        <>
            <div id="search-container">
                <input type="text" id="search-input" placeholder="Search by title" />
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
                        <tr>
                            <td>1</td>
                            <td>Kerjain tugas</td>
                            <td>PTO-Tugas Besar</td>
                            <td>1-Jan-2026</td>

                            <td>
                                <button>
                                    <TrashIcon />
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td>2</td>
                            <td>Kerjain tugas</td>
                            <td>ML-T09</td>
                            <td>1-Jan-2026</td>

                            <td>
                                <button>
                                    <TrashIcon />
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td>3</td>
                            <td>Kerjain tugas</td>
                            <td>Go-M09</td>
                            <td>2-Jan-2026</td>

                            <td>
                                <button>
                                    <TrashIcon />
                                </button>
                            </td>
                        </tr>

                        <tr>
                            <td>4</td>
                            <td>Kerjain tugas</td>
                            <td>Geometri-T1</td>
                            <td>3-Jan-2026</td>

                            <td>
                                <button>
                                    <TrashIcon />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div id="table-button">
                <button id="prev-button">
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M18 4 L6 12 L18 20 Z"
                            fill="black"
                        />
                    </svg>
                </button>

                <button id="next-button">
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 4 L18 12 L6 20 Z"
                            fill="black"
                        />
                    </svg>
                </button>
            </div>
        </>
    )
}

export default () => {
    const location = useLocation();

    return (
        <>
            <Header></Header>
            <div id="upper-home">
                <div id="home-navigation">
                    <A href="/">Table</A>
                    <A href="/Calendar">Calendar</A>
                </div>

                <A id="create-button" href='/Create'>Add a new Task</A>
            </div>

            <div id="home-content">
                <Show when={location.pathname === "/"}>
                    <TableContent />
                </Show>

                <Show when={location.pathname === "/Calendar"}>
                    <Calendar />
                </Show>
            </div>
        </>
    );
};
