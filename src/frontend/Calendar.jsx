import { createSignal, createMemo, For, createEffect, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import "./css/calendar.css";
import { getTodoList } from "../backend/Database.jsx";
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    format,
    isSameMonth,
    addMonths,
    subMonths,
    isToday
} from "date-fns";

export default () => {
    const navigate = useNavigate();

    const [user, setUser] = createSignal(null);
    const [tasks, setTasks] = createSignal([]);

    createEffect(() => {
        const storedUser = localStorage.getItem("currentUser");

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            const userTasks = getTodoList(parsedUser.id);
            setTasks(userTasks);
        } else {
            navigate("/Login", { replace: true });
        }
    });

    const [currentDate, setCurrentDate] = createSignal(new Date());

    const monthStart = createMemo(() => startOfMonth(currentDate()));
    const monthEnd = createMemo(() => endOfMonth(monthStart()));

    const startDate = createMemo(() =>
        startOfWeek(monthStart(), { weekStartsOn: 1 })
    );

    const endDate = createMemo(() =>
        endOfWeek(monthEnd(), { weekStartsOn: 1 })
    );

    const calendarDays = createMemo(() => {
        return eachDayOfInterval({
            start: startDate(),
            end: endDate(),
        });
    });

    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate(), 1));
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate(), 1));

    return (
        <Show when={user()}>
            <main class="calendar-main">
                <div class="calendar-header">
                    <button class="nav-arrow left" onClick={handlePrevMonth}></button>
                    <h2 class="month-title">{format(currentDate(), "MMMM yyyy")}</h2>
                    <button class="nav-arrow right" onClick={handleNextMonth}></button>
                </div>

                <div class="calendar-grid-container">
                    <div class="weekdays-row">
                        <div class="weekday">Monday</div>
                        <div class="weekday">Tuesday</div>
                        <div class="weekday">Wednesday</div>
                        <div class="weekday">Thursday</div>
                        <div class="weekday">Friday</div>
                        <div class="weekday">Saturday</div>
                        <div class="weekday">Sunday</div>
                    </div>

                    <div class="days-grid">
                        <For each={calendarDays()}>
                            {(day) => {
                                const isCurrentMonth = isSameMonth(
                                    day,
                                    monthStart()
                                );

                                const dayString = format(day, "d");

                                const isActiveDay =isToday(day);

                                const currentFormattedDate = format(day, "yyyy-MM-dd");

                                const hasTask = isCurrentMonth && tasks().some(t => {
                                    if (!t.dueDate) return false;
                                    const taskDate = t.dueDate.split("T")[0];
                                    return taskDate === currentFormattedDate;
                                });

                                return (
                                    <div
                                        class="day-cell"
                                        classList={{
                                            active: isActiveDay,
                                            "outside-month": !isCurrentMonth,
                                        }}
                                        style={{
                                            opacity: (() => {
                                                if (isCurrentMonth) {
                                                    return 1;
                                                } else {
                                                    return 0.3;
                                                }
                                            })(),
                                        }}
                                    >
                                        <span
                                            class={`day-number ${(() => {
                                                if (isCurrentMonth) {
                                                    return "active-text";
                                                } else {
                                                    return "inactive-text";
                                                }
                                            })()}`}
                                        >
                                            {dayString}
                                        </span>

                                        {hasTask && (
                                            <div class="task-dot"></div>
                                        )}
                                    </div>
                                );
                            }}
                        </For>
                    </div>
                </div>
            </main>
        </Show>
    );
};
