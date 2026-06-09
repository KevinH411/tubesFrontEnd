import { createSignal, createMemo, For, Show, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import "./css/calendar.css";
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
import { getTodoList } from "./Database";

export default () => {
    const navigate = useNavigate();

    const [user, setUser] = createSignal(null);
    const [tasks, setTasks] = createSignal([]);

    const [isPopupOpen, setIsPopupOpen] = createSignal(false);
    const [selectedTasks, setSelectedTasks] = createSignal([]);
    const [popupDate, setPopupDate] = createSignal("");

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

    const handleDayClick = (dateString, dayTasksArray) => {
        if (dayTasksArray.length > 0) {
            setPopupDate(dateString);
            setSelectedTasks(dayTasksArray);
            setIsPopupOpen(true);
        }
    };

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
                                const isCurrentMonth = isSameMonth(day, monthStart());
                                const dayString = format(day, "d");
                                const isActiveDay = isToday(day);
                                const currentFormattedDate = format(day, "yyyy-MM-dd");

                                const dayTasks = () => tasks().filter(t => {
                                    if (!t.dueDate) return false;
                                    const taskDate = t.dueDate.split("T")[0];
                                    return taskDate === currentFormattedDate;
                                });

                                const hasTask = () => isCurrentMonth && dayTasks().length > 0;

                                return (
                                    <div
                                        class="day-cell"
                                        classList={{
                                            active: isActiveDay,
                                            "outside-month": !isCurrentMonth,
                                            "clickable-day": hasTask()
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
                                        onClick={() => isCurrentMonth && handleDayClick(currentFormattedDate, dayTasks())}
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

                                        {hasTask() && (
                                            <div class="task-dot"></div>
                                        )}
                                    </div>
                                );
                            }}
                        </For>
                    </div>
                </div>

                {/* Pop-Up Modal */}
                <Show when={isPopupOpen()}>
                    <div class="calendar-popup-overlay" onClick={() => setIsPopupOpen(false)}>
                        <div class="calendar-popup-content" onClick={(e) => e.stopPropagation()}>
                            <div class="popup-header">
                                <h3>Deadline: {popupDate()}</h3>
                                <button class="close-icon" onClick={() => setIsPopupOpen(false)}>&times;</button>
                            </div>

                            <div class="popup-task-list">
                                <For each={selectedTasks()}>
                                    {(t) => (
                                        <div class="popup-task-item">
                                            <h4 class="popup-task-title">{t.title}</h4>
                                            <p class="popup-task-desc">{t.description}</p>
                                        </div>
                                    )}
                                </For>
                            </div>
                        </div>
                    </div>
                </Show>
            </main>
        </Show>
    );
};