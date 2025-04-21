const form = document.getElementById('homework-form');
const list = document.getElementById('homework-list');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const subject = document.getElementById('subject').value;
  const task = document.getElementById('task').value;

  if (subject && task) {
    const li = document.createElement('li');
    li.textContent = `${subject}: ${task}`;

    // Create the "Confirm" button
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = '✔️ Confirm';
    confirmBtn.style.marginLeft = '10px';

    // When clicked, cross out the task
    confirmBtn.addEventListener('click', function () {
      li.style.textDecoration = 'line-through';
      confirmBtn.disabled = true; // Optional: disable button after clicked
    });

    // Add button to the list item
    li.appendChild(confirmBtn);
    list.appendChild(li);

    form.reset();
  }
});

