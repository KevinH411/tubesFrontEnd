import { createSignal, createMemo, For } from "solid-js";
import { A } from "@solidjs/router";
import Header from "./Header";
import "./css/calendar.css";
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    format,
    isSameMonth,
} from "date-fns";

export default () => {
    const [currentDate, setCurrentDate] = createSignal(new Date(2026, 0, 1));

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

    return (
        <>
            <Header></Header>

            <div id="upper-home">
                <div id="home-navigation">
                    <p>Table</p>
                    <p>Calendar</p>
                </div>

                <A href="/create" class="add-task-btn">
                    Add a new Task
                </A>
            </div>

            <div id="home-content">
                <main class="calendar-main">
                    <div class="calendar-header">
                        <button class="nav-arrow left"></button>
                        <h2 class="month-title">January 2026</h2>
                        <button class="nav-arrow right"></button>
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

                                    const isActiveDay =
                                        dayString === "1" && isCurrentMonth;

                                    const hasTask =
                                        ["1", "2", "3"].includes(dayString) &&
                                        isCurrentMonth;

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
                                                    if (Number(dayString) > 3) {
                                                        return "inactive-text";
                                                    } else {
                                                        return "active-text";
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
            </div>
        </>
    );
};
