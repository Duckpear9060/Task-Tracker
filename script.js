const form = document.getElementById('homework-form');
const list = document.getElementById('homework-list');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const subject = document.getElementById('subject').value.trim();
  const task = document.getElementById('task').value.trim();

  if (!subject || !task) return;

  // Check if the subject section already exists
  let subjectGroup = document.querySelector(`li[data-subject="${subject.toLowerCase()}"]`);

  // If subject section doesn't exist, create it
  if (!subjectGroup) {
    subjectGroup = document.createElement('li');
    subjectGroup.setAttribute('data-subject', subject.toLowerCase());

    const subjectTitle = document.createElement('strong');
    subjectTitle.textContent = subject;

    const taskList = document.createElement('ul');
    taskList.classList.add('task-list');

    subjectGroup.appendChild(subjectTitle);
    subjectGroup.appendChild(taskList);
    list.appendChild(subjectGroup);
  }

  // Add the new task under the subject's task list
  const taskList = subjectGroup.querySelector('.task-list');

  const taskItem = document.createElement('li');
  taskItem.textContent = task;

  const confirmBtn = document.createElement('button');
  confirmBtn.textContent = '✔️ Confirm';
  confirmBtn.style.marginLeft = '10px';

  confirmBtn.addEventListener('click', function () {
    taskItem.style.textDecoration = 'line-through';
    confirmBtn.disabled = true;
  });

  taskItem.appendChild(confirmBtn);
  taskList.appendChild(taskItem);

  form.reset();
});

