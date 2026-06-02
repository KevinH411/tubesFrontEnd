import Header from "./Header";
import { A } from "@solidjs/router";
import "./css/create.css";

export default function Create () { //:P
    return (
        <>
            <Header></Header>
            <div class="body">
                <h1>Create A New Task</h1>
                <div class = "container">
                    <div id="p">
                    <p>Title</p>
                    <p>Description</p>
                    <p>Deadline</p>
                    </div>

                    <div id="inputs">
                    <input type="text" placeholder="Task name.."></input>
                    <input type="text" placeholder="Task description.."></input>
                    <input type="date"></input>
                    </div>
                </div>
                <A href="/">Create Task</A>
                {/*untuk submit. untuk sekarang pakai A unutk direct ke home/mainpage*/}
            </div>
        </>
    );
};
