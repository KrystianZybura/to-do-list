{
    let tasks = [];

    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks,
        { content: newTaskContent, done: false },
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
        tasks = tasks.map(task => {
            if (taskIndex === tasks.indexOf(task))
                task.done = !task.done;
            return task;
        });

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
        tasks = tasks.map(task => {
            if (!task.done) {
                task.done = !task.done;
            }
            return task;
        });

        render();
    };

    const bindButtonsEvents = () => {

        if (!tasks.some(({ content }) => content)) {
            return;
        }
        
        const completeAllTasksButton = document.querySelector(".js-completeAllTasksButton");

        completeAllTasksButton.addEventListener("click", completeAllTasks);

        const hideDoneTasksButton = document.querySelector(".js-hideTaskButton");

        hideDoneTasksButton.addEventListener("click", () => { });

    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
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
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let htmlString = "";

        if (tasks.some(({ content }) => content)) {
            htmlString += `
                <button class="section__button js-hideTaskButton">Ukryj ukończone</button>
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

        newTask.focus();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);

        newTask.value = "";
    };

    const init = () => {
        render();

        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", onFormSubmit);
    };

    init();
}