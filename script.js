// Select DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions
function addTodo(event) {
    // Prevent form from submiiting
    event.preventDefault();

    // Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create List (li)
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // --this put the newTodo inside todoDiv

    // Add todo to Localstroage
    saveLocalTodos(todoInput.value);

    // Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Check Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fa-solid fa-circle-minus"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append To List
    todoList.appendChild(todoDiv);

    // Clear todoInput value
    todoInput.value = "";
}

// Delete Check Function
function deleteCheck(event) {
    const item = event.target;
    // Delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        // Delete Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
          todo.remove();  
        }); 
    }
    // Check Mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(event.target.value) {
            case "all":
                todo.style.display ='flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    // Check if you already have things saved of the is file
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
       todos = JSON.parse(localStorage.getItem("todos"));
        // This assumes we have codes of this files in save local 
    }
    
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Allows You To get todos that is saved in localstroage
function getTodos() {
     // Copy and paste this function code from "Check if you already have things saved of the is file"
     let todos;
     if (localStorage.getItem("todos") === null) {
         todos = [];
     } else {
        todos = JSON.parse(localStorage.getItem("todos"));
         // This assumes we have codes of this files in save local 
     }
     todos.forEach(function(todo) {
        //  type in the above code and copy and paste the create todoDiv code todoList appendChild code
        // Create todo div. Delete new
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Create List (li)
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        // --delete 'Input.value' from above
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // --this put the newTodo inside todoDiv

        // // Add todo to Localstroage  ***delete***
        // saveLocalTodos(todoInput.value); ***delete***

        // Check Mark Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // Check Trash Button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fa-solid fa-circle-minus"></i>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Append To List
        todoList.appendChild(todoDiv);
     });
}

function removeLocalTodos(todo) {
    // Copy and paste this function code a third time to delete from localstoragesaves. 
    // Took this from function getTodos and that was also took from function saveLocalTodos
    // Both the same code I reused
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
       todos = JSON.parse(localStorage.getItem("todos"));
        // This assumes we have codes of this files in save local 
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}