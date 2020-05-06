const inputTask = document.querySelector('.input-task');
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');

inputTask.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    if (!inputTask.value) return;
    makeTask(inputTask.value);
  }
});

btnTask.addEventListener('click', function (e) {
  // console.log(inputTask.value);
  if (!inputTask.value) return;
  makeTask(inputTask.value);
});

document.addEventListener('click', function (e) {
  const el = e.target;
  if (el.classList.contains('delete')) {
    el.parentElement.remove();
    saveTasks();
  }
});

function makeLi() {
  const li = document.createElement('li');
  return li;
}
function makeTask(textInput) {
  const li = makeLi();
  li.innerText = textInput;
  tasks.appendChild(li);
  clearInput();
  createDeleteBtn(li);
  saveTasks();
}

function clearInput() {
  inputTask.value = '';
  inputTask.focus();
}

function createDeleteBtn(li) {
  li.innerText += '  '; //dando espaço entre texto e btn
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.setAttribute('class', 'delete');
  deleteBtn.setAttribute('title', 'Delete Task');
  li.appendChild(deleteBtn);
}
function saveTasks() {
  const liTasks = tasks.querySelectorAll('li');
  const taskList = []; //criando um array

  for (let task of liTasks) {
    let taskText = task.innerText;
    taskText = taskText.replace('Delete', '').trim();
    taskList.push(taskText); // colocando as tasks dentro do meu array
  }
  const taskJSON = JSON.stringify(taskList); // transformando meu json em string(localstorage so permite armazenamento de string)
  localStorage.setItem('tasks', taskJSON);
}

function addSavedTasks() {
  const tasks = localStorage.getItem('tasks');
  const taskList = JSON.parse(tasks); // transofrmando em um array novamente
  console.log(tasks);

  for (let task of taskList) {
    makeTask(task);
  }
}

addSavedTasks();
