import { A } from "@solidjs/router";
import "./css/header.css";

export default () => {
    return (
        <>
            <header>

                <div id="header-left">

                    <svg
                        class="logo-svg"
                        viewBox="0 0 256 256"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#F58A3A" />
                                <stop offset="100%" stop-color="#B14DFF" />
                            </linearGradient>
                        </defs>

                        <rect
                            x="32"
                            y="32"
                            width="192"
                            height="192"
                            rx="42"
                            fill="url(#bgGradient)"
                        />

                        <circle
                            cx="128"
                            cy="128"
                            r="52"
                            fill="none"
                            stroke="white"
                            stroke-width="7"
                        />

                        <rect
                            x="102"
                            y="108"
                            width="10"
                            height="10"
                            rx="2"
                            fill="white"
                        />

                        <rect
                            x="144"
                            y="108"
                            width="10"
                            height="10"
                            rx="2"
                            fill="white"
                        />

                        <path
                            d="M100 140 Q128 166 156 140"
                            fill="none"
                            stroke="white"
                            stroke-width="7"
                            stroke-linecap="round"
                        />
                    </svg>

                    <h1>To-Do Online</h1>

                </div>

                <A href="/Login" id="header-right">

                    <h1>Please log in first</h1>

                    <svg
                        class="profile-svg"
                        viewBox="0 0 256 256"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="128"
                            cy="128"
                            r="92"
                            fill="#F58220"
                        />

                        <circle
                            cx="128"
                            cy="108"
                            r="12"
                            fill="none"
                            stroke="white"
                            stroke-width="6"
                        />

                        <path
                            d="M98 158
                            L98 146
                            Q98 132 112 132
                            L144 132
                            Q158 132 158 146
                            L158 158"
                            fill="none"
                            stroke="white"
                            stroke-width="6"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                </A>

            </header>
        </>
    );
};