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

    };

    const render = (newTask) => {
        renderTasks(newTask);
        renderButtons();
        bindEvents();
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