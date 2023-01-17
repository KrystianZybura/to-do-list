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
                <li>
                    ${task.content}
                </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    }

    const init = () => {
        render();
    }

    init();
}