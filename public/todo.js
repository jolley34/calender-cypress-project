window.addEventListener("DOMContentLoaded", main)

function main (){
    addTodo();
}

function addTodo(){
    const todolist = document.getElementById("todo-list");
    const newTodoInput = document.getElementById("new-todo");
    const todoDateInput = document.getElementById("todo-date")
    const todoTimeInput = document.getElementById("todo-time")
    const addTodoBtn = document.getElementById("add-todo-btn")

    addTodoBtn.addEventListener('click', function(){
        const todoText = newTodoInput.value.trim();
        const todoDate = todoDateInput.value;
        const todoTime = todoTimeInput.value;

        if (todoText !== "") {
            const todoItem = document.createElement("li");
            todoItem.className = "todo-Item";
            todoItem.textContent = `${todoText} - Time: ${todoTime} - ${todoDate}`
            todolist.appendChild(todoItem);

            newTodoInput.value = "";
            todoTimeInput.value = "";
            todoDateInput.value = "";
        }
    });

}

