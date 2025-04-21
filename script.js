const form = document.getElementById('homework-form');
const list = document.getElementById('homework-list');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const subject = document.getElementById('subject').value;
  const task = document.getElementById('task').value;

  if (subject && task) {
    const li = document.createElement('li');
    li.textContent = `${subject}: ${task}`;
    list.appendChild(li);

    form.reset();
  }
});
