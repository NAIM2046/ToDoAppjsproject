const continer = document.querySelector(".continer") ;
const forme = document.querySelector(".formed")  ; 
const inputToDo = document.getElementById("input-todo") ;
const buttonAdd = document.querySelector(".btn") ;
const lists = document.querySelector(".lists"  ) ;
const messages = document.getElementById("message") ;




 const gettoDolocalstorage = () =>{
   return localStorage.getItem("mytodo")? JSON.parse(localStorage.getItem("mytodo")):[] ;
 };
  const showMessage = (text , stated) =>{
    messages.textContent = text ;
    messages.classList.add(`bg-${stated}`)  ;
    setTimeout(()=>{
        messages.textContent = "" ;
        messages.classList.remove(`bg-${stated}`)  ;
    },1000) ;
  };

 const creatTodo = (todoValue , todoId) =>{
    const todoElement = document.createElement("li") ; 
    todoElement.Id = todoId ; 
    todoElement.classList.add("li-style") ;
    todoElement.innerHTML = `<span>${todoValue}</span> <span><button class="btnn" id="deletbtn">delet</button> </span>`  ;
    lists.appendChild(todoElement) ;

    const deletButton = todoElement.querySelector("#deletbtn") ;
   deletButton.addEventListener("click" , deletTodo) ;
       
   
 };
 const deletTodo = (event) =>{
    const selectedtodo = event.target.parentElement.parentElement ;
    console.log(selectedtodo) ;
    lists.removeChild(selectedtodo) ;
    showMessage("delet success full" , "danger");
    let todos = gettoDolocalstorage() ;
    console.log(selectedtodo.Id) ;
    todos = todos.filter((todo)=> todo.todoId != selectedtodo.Id) ;
    localStorage.setItem("mytodo", JSON.stringify(todos));

};

const addTodo = (event)=> {
    event.preventDefault();
    const todoValue = inputToDo.value;
    const todoId = Date.now().toString();
    creatTodo(todoValue, todoId);
    showMessage("Todo is created", "success");
    const todos = gettoDolocalstorage();
    todos.push({ todoId, todoValue });
    localStorage.setItem("mytodo", JSON.stringify(todos));
    inputToDo.value = "";
};

const loadtodo =() => {
    let todos = gettoDolocalstorage() ;
    todos.map((todo)=>creatTodo(todo.todoValue , todo.todoId)) ;
} ;

forme.addEventListener("submit" , addTodo) ;

  window.addEventListener("DOMContentLoaded",loadtodo) ;
