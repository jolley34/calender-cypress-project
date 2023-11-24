window.addEventListener("DOMContentLoaded", main)

function main (){
    addTodo();
    
}



 
 
updateClock();
  setInterval(updateClock, 60000);

function addTodo(){
    //add todo form
    const todolist = document.getElementById("todo-list");
    const newTodoInput = document.getElementById("new-todo");
    const todoDateInput = document.getElementById("todo-date")
    const todoTimeInput = document.getElementById("todo-time")
    const todoEndTimeInput = document.getElementById('todo-end-time')
    const addTodoBtn = document.getElementById("add-todo-btn")

    //Edit modal to edit todos
   // const editModal = document.getElementById("edit-modal");
   // const editTodoText = document.getElementById("edit-todo-text");
   // const editTodoDate = document.getElementById("edit-todo-date");
    //const editTodoTime = document.getElementById("edit-todo-time");
    //const saveEditBtn = document.getElementById("save-edit-btn");
    //const closeEditBtn = document.getElementById("close-edit-btn");

    // adds the todos to list when add-button is clicked
    addTodoBtn.addEventListener('click', function(){
        const todoText = newTodoInput.value.trim();
        const todoDate = todoDateInput.value;
        const todoTime = todoTimeInput.value;
        const todoEndTime = todoEndTimeInput.value;

        if (todoText !== " ") {
            const todoItem = document.createElement("li");
            todoItem.className = "todo-Item";
            todoItem.textContent = `${todoText} - Time: ${todoTime} - ${todoEndTime} , ${todoDate}`;
            todolist.appendChild(todoItem);

            //clears input after click on add-button
            newTodoInput.value = "";
            todoTimeInput.value = "";
            todoDateInput.value = "";

            todoItem.addEventListener('click', function(){

                todoText.value = todoText;
                todoTime.value = todoTime;
                todoDate.value = todoDate;

                
            });
        }
    });
    /*
    editModal.style.display = "block";
    saveEditBtn.addEventListener('click', function (){

        const editedText = editTodoText.value.trim();
        const editedTime = editTodoTime.value;
        const editedDate = editTodoDate.value;

        const editedItem = document.createElement("li");
        editedItem.className = "todo-item";
        editedDate.innerHTML = `${editedText} - Time: ${editedTime} - ${editedDate}`;

        const originalItem = editModal.previousSibling;
        originalItem.parentNode.replaceChild(editedItem, originalItem);

        editModal.style.display = "none";

    });

    closeEditBtn.addEventListener('click', function(){

        editModal.style.display = "none";
    });
    */
}