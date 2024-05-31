const todoInput = document.querySelector('.todo-input');
const addBtn = document.querySelector('.addbutton');
const filters = document.querySelectorAll('.filter');
const deleteAll = document.querySelector('.delete-all');
const container = document.querySelector('.container');
const taskListContainer = document.querySelector('.task-list-container');

let tasks = [];

function renderTasks() {
    const taskList = document.querySelector('.task-list');

    if (taskList) {
        taskList.remove();
    }

    const newTaskList = document.createElement('div');
    newTaskList.classList.add('task-list');

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        if (task.completed) {
            taskElement.classList.add('completed');
        }
        taskElement.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div class="task-actions">
                <i class="fa fa-check-circle" data-action="complete" data-index="${index}"></i>
                <i class="fa fa-trash" data-action="delete" data-index="${index}"></i>
            </div>
        `;
        newTaskList.appendChild(taskElement);
    });

    taskListContainer.appendChild(newTaskList);
}

addBtn.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        todoInput.value = '';
        renderTasks();
    }
});

container.addEventListener('click', (e) => {
    if (e.target.dataset.action === 'complete') {
        const index = e.target.dataset.index;
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    } else if (e.target.dataset.action === 'delete') {
        const index = e.target.dataset.index;
        tasks.splice(index, 1);
        renderTasks();
    }
});

filters.forEach((filter) => {
    filter.addEventListener('click', () => {
        filters.forEach((f) => f.classList.remove('active'));
        filter.classList.add('active');
        const filterValue = filter.dataset.filter;
        const taskList = document.querySelector('.task-list');
        const taskElements = taskList ? taskList.querySelectorAll('.task') : [];
        taskElements.forEach((task) => {
            const isCompleted = task.querySelector('span').classList.contains('completed');
            if (filterValue === 'all') {
                task.style.display = 'flex';
            } else if (filterValue === 'completed' && !isCompleted) {
                task.style.display = 'none';
            } else if (filterValue === 'pending' && isCompleted) {
                task.style.display = 'none';
            } else {
                task.style.display = 'flex';
            }
        });
    });
});

deleteAll.addEventListener('click', () => {
    tasks = [];
    renderTasks();
});

renderTasks();
