{
    const tasks = [
        {
            content: "Zjeść obiad",
            done: true,
        },
        {
            content: "Pójść do fryzjera",
            done: false,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);

        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;

        render();
    }

    const bindEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButtons, index) => {
            toggleDoneButtons.addEventListener("click", () => {

                toggleTaskDone(index);
            });
        });

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="form__listItem js-listItem
                    ${task.done ? 'form__listItem--done"' : '"'}
                >
                    <button class="form__doneButton js-done ${task.done ? "form__doneButton--checked" : ""}">✔</button>

                    ${task.content}

                    <button class="form__removeButton js-remove">🗑</button>
                </li>
        `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask");

        newTaskContent.focus();

        if (newTaskContent.value === "") {
            return;
        }

        addNewTask(newTaskContent.value.trim());

        newTaskContent.value = "";
    };

    const init = () => {
        render();

        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", onFormSubmit);
    };

    init();
}