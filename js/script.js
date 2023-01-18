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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            ${task.done
                    ? '<li class="list__item taskDone">'
                    : '<li class="list__item">'
                }

            ${task.content}
                </li >
        `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    }

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        
        render();
    }

    const onFormSubmit = (event) => {
            event.preventDefault();

            const newTaskContent = document.querySelector(".js-newTask").value.trim();

            if (newTaskContent)
                addNewTask(newTaskContent);
        }
    
    const init = () => {
        render();

        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", onFormSubmit);
    };

    init();
}