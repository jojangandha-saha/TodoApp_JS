//LOCAL STORAGE - if any todos saved get that item as json string
window.addEventListener('load', ()=>{
  todos = JSON.parse(localStorage.getItem('todos')) || []; //global var
  const nameInput = document.querySelector("#name");
  const newTodoForm = document.querySelector("#new-todo-form");
  
  const userName = localStorage.getItem('userName') || "";

  nameInput.value = userName;

  //set name - setter and getter
  nameInput.addEventListener('change', (e)=>{
    localStorage.setItem('userName', e.target.value);
  })

  newTodoForm.addEventListener('submit', (e)=>{
 e.preventDefault();

 const todo = {
    content: e.target.elements.content.value,
    category : e.target.elements.category.value,
    done : false,
    createdAt : new Date().getTime()
 }
// add new todo to array
 todos.push(todo)

 //turn that array into json string , can store that string in localstorage
 //- json.stringyfy, local storage can only allow to store primitive dt not non primitive dt like arr, obj
 localStorage.setItem('todos', JSON.stringify(todos));
// reset the form - reset 
 e.target.reset();


 displayTodo();
  })
  displayTodo();
})


function displayTodo(){
    const todoList = document.querySelector("#todo-list");
    todoList.innerHTML = '';
    todos.forEach( (todo)=>{
         const todoItem = document.createElement('div');
         todoItem.classList.add('todo-item')

         const label = document.createElement('label');
         const input = document.createElement('input');
         const span = document.createElement('span');
         const content = document.createElement('div');
         const actions = document.createElement('div');
         const edit = document.createElement('button');
         const deleteButton = document.createElement('button');

         input.type = 'checkbox';
         input.checked = todo.done;
         span.classList.add('bubble');

         if(todo.category == 'personal'){
            span.classList.add('personal');
         }else{
            span.classList.add('work');
         }

         content.classList.add('todo-content');
         actions.classList.add('actions');
         edit.classList.add('edit');
         deleteButton.classList.add('delete');


         content.innerHTML = `<input type = 'text' value = '${todo.content}' readonly>`;
         edit.innerHTML  = 'EDIT';
         deleteButton.innerHTML = 'DELETE';


         label.appendChild(input);
         label.appendChild(span);
         actions.appendChild(edit);
         actions.appendChild(deleteButton);
         todoItem.appendChild(label);
         todoItem.appendChild(content);
         todoItem.appendChild(actions);

         todoList.append(todoItem);

         if(todo.done){
            todoItem.classList.add('done');
         }

         input.addEventListener('click', (e)=>{
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if(todo.done){
                todoItem.classList.add('done');
            }else{
                todoItem.classList.remove('done');
            }

            displayTodo();
         })


         edit.addEventListener('click', (e)=>{
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', (e)=>{
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                displayTodo();
            })
         })

         deleteButton.addEventListener('click', (e)=>{
            todos = todos.filter( t => t!= todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodo();
         })


    })
}


//order according to date, priority, - todos.sort()

