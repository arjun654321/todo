document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const list = document.getElementById("todo-list");
    const clrBtn = document.getElementById("clr-btn");

    function getDT() {
        const now = new Date();
        const date = now.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
        const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        return `${date}, ${time}`;
    }

    function updateNo() {
        const items = list.querySelectorAll("li");
        items.forEach((item, idx) => {
            const num = item.querySelector(".num");
            num.textContent = `#${idx + 1}`;
        });
    }

    function addTask() {
        const text = input.value.trim();

        if (text === "") {
            alert("Please enter a task!");
            return;
        }

        const item = document.createElement("li");

        const num = document.createElement("span");
        num.className = "num";
        num.textContent = `#${list.children.length + 1}`;

        const content = document.createElement("div");
        content.className = "content";
        content.innerHTML = `
            <span class="text">${text}</span>
            <small>Added on: ${getDT()}</small>
        `;

        const updBtn = document.createElement("button");
        updBtn.textContent = "Update";
        updBtn.addEventListener("click", () => updateTask(item));

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
            item.remove();
            updateNo(); 
        });

        item.appendChild(num);
        item.appendChild(content);
        item.appendChild(updBtn);
        item.appendChild(delBtn);
        list.appendChild(item);

        input.value = "";
    }

    function updateTask(item) {
        const textElem = item.querySelector(".text");
        const newText = prompt("Update your task:", textElem.textContent);
        if (newText && newText.trim() !== "") {
            textElem.textContent = newText.trim();
        }
    }

    function clearTasks() {
        list.innerHTML = "";
    }

    addBtn.addEventListener("click", addTask);
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addTask();
    });
    clrBtn.addEventListener("click", clearTasks);
});
