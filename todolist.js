const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filteroption=document.querySelector(".filter-todo")

todoList.addEventListener("click",deltecompletetodo)

todoButton.addEventListener("click",addtodo);

filteroption.addEventListener("click",filteroptiontodo)

function addtodo(event) {
    event.preventDefault();

    const tododiv=document.createElement("div")
    tododiv.classList.add("todo")

    const newtodo=document.createElement("li")
    newtodo.classList.add("todo")
    tododiv.innerText=todoInput.value;
    tododiv.appendChild(newtodo)

    savelocaltodo(todoInput.value);

    todoInput.value=""

    const completetodo=document.createElement("button")
    completetodo.innerHTML="<i class='fas fa-check'></i>"
    completetodo.classList.add("complete-btn")
    tododiv.appendChild(completetodo);

    const trashtodo=document.createElement("button")
    trashtodo.innerHTML="<i class='fas fa-trash'></i>"
    trashtodo.classList.add("trash-btn")
    tododiv.appendChild(trashtodo);

    todoList.appendChild(tododiv);

}

function filteroptiontodo(event) {
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                }
                break;
            case "uncompleted":
                if (todo.classList.contains("completed")) {
                    todo.style.display="none";
                }else{
                    todo.style.display="flex";
                }  
                break; 
        }
    })
}

function deltecompletetodo(event) {
    const item=event.target;
    if (item.classList[0]==="trash-btn") {
        const todo=item.parentElement;
        removelocaltodo(todo)
        todo.remove();
    }
    if (item.classList[0]==="complete-btn") {
        const todo=item.parentElement;
        todo.classList.toggle("completed");
    }
}
function removelocaltodo(todo) {
    let todos;
    if (localStorage.getItem("todos")===null) {
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    const todoindex=todo.children[0].innerText
    console.log(todoindex)
    todos.splice(todos.indexOf(todoindex), 1)
    localStorage.setItem("todos",JSON.stringify(todos))
}

function savelocaltodo(todo) {
    let todos;
    if (localStorage.getItem("todos")===null) {
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}