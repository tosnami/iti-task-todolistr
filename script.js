const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const clearAllBtn = document.getElementById('clear-all');


window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToDOM(task));
};


addBtn.addEventListener('click', () => {
  const taskText = input.value.trim();
  if (taskText !== '') {
    addTaskToDOM(taskText);
    saveTaskToStorage(taskText);
    input.value = '';
  }
});


function addTaskToDOM(taskText) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = taskText;

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.onclick = () => {
    li.remove();
    deleteTaskFromStorage(taskText);
  };

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}


function saveTaskToStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTaskFromStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


clearAllBtn.addEventListener('click', () => {
  localStorage.removeItem('tasks');
  taskList.innerHTML = '';
});