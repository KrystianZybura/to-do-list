{
    let tasks = [];

    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks,
        { content: newTaskContent },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => index === taskIndex ? { ...task, done: !task.done } : task);

        render();
    };

    const bindTasksEvents = () => {
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

    const completeAllTasks = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => {
        if (tasks.some(({ done }) => done)) {
            hideDoneTasks = !hideDoneTasks;
        }

        render();
    };

    const bindButtonsEvents = () => {
        if (!tasks.length) {
            return;
        }

        const completeAllTasksButton = document.querySelector(".js-completeAllTasksButton");
        completeAllTasksButton.addEventListener("click", completeAllTasks);

        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasksButton");
        hideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            if (task.done === true && hideDoneTasks === true) {
                htmlString += ``;
            }
            else {
                htmlString += `
                    <li class="list__item js-listItem">
                        <button
                            class="list__button list__button--done js-done
                            ${task.done ? "list__button--checked" : ""}">✔
                        </button>
                        <span
                            ${task.done ? 'class="list__item--done"' : ''}
                        >
                            ${task.content}
                        </span>
                        <button class="list__button js-remove">🗑</button>
                    </li>
                `;
            }
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let htmlString = "";

        if (tasks.length) {
            htmlString += `
                <button class="section__button js-hideDoneTasksButton"
                >
                    ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
                </button>
                <button 
                    ${tasks.every(({ done }) => done) ? "disabled" : ""}
                    class="section__button js-completeAllTasksButton"
                >
                    Ukończ wszystkie
                </button>
            `;
        }
        document.querySelector(".js-buttonsContainer").innerHTML = htmlString;
    };

    const render = (newTask) => {
        renderTasks(newTask);
        renderButtons();

        bindTasksEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask");
        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
        }

        newTask.focus();
        newTask.value = "";
    };

    const init = () => {
        render();

        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", onFormSubmit);
    };

    init();
}