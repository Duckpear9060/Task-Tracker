const form = document.getElementById('homework-form');
const list = document.getElementById('homework-list');

let data = JSON.parse(localStorage.getItem('homeworkTasks')) || {};

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const subject = document.getElementById('subject').value.trim();
  const task = document.getElementById('task').value.trim();
  const dueDate = document.getElementById('due-date').value;

  if (!subject || !task) return;

  const taskObj = {
    text: task,
    completed: false,
    dueDate
  };

  if (!data[subject]) data[subject] = [];
  data[subject].push(taskObj);
  saveData();
  renderTasks();
  form.reset();
});

function renderTasks() {
  list.innerHTML = '';

  for (const subject in data) {
    const subjectGroup = document.createElement('li');
    subjectGroup.setAttribute('data-subject', subject.toLowerCase());

    const subjectTitle = document.createElement('strong');
    subjectTitle.textContent = subject;

    const taskList = document.createElement('ul');
    taskList.classList.add('task-list');

    data[subject].forEach((taskObj, index) => {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      if (taskObj.completed) taskItem.classList.add('completed');

      const taskText = document.createElement('span');
      taskText.textContent = taskObj.text;

      if (taskObj.dueDate) {
        taskText.textContent += ` (Due: ${taskObj.dueDate})`;
      }

      // Confirm Button
      const confirmBtn = document.createElement('button');
      confirmBtn.textContent = '✔️';
      confirmBtn.title = 'Confirm task';
      confirmBtn.className = 'confirm-btn';
      confirmBtn.disabled = taskObj.completed;

      confirmBtn.addEventListener('click', () => {
        data[subject][index].completed = true;
        saveData();
        renderTasks();
      });

      // Delete Button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '🗑️';
      deleteBtn.title = 'Delete task';
      deleteBtn.className = 'delete-btn';

      deleteBtn.addEventListener('click', () => {
        data[subject].splice(index, 1);
        if (data[subject].length === 0) delete data[subject];
        saveData();
        renderTasks();
      });

      taskItem.appendChild(taskText);
      taskItem.appendChild(confirmBtn);
      taskItem.appendChild(deleteBtn);
      taskList.appendChild(taskItem);
    });

    subjectGroup.appendChild(subjectTitle);
    subjectGroup.appendChild(taskList);
    list.appendChild(subjectGroup);
  }
}

function saveData() {
  localStorage.setItem('homeworkTasks', JSON.stringify(data));
}

renderTasks();

