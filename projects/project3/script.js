let tasks = [];
let taskId = 1;

function addTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const priority = document.getElementById('taskPriority').value;

    if (!title) {
        alert('Please enter a task title');
        return;
    }

    const task = {
        id: taskId++,
        title: title,
        priority: priority,
        status: 'todo'
    };

    tasks.push(task);

    document.getElementById('taskTitle').value = '';
    document.getElementById('taskPriority').value = 'medium';

    showTasks();

    function showTasks() {
        document.getElementById('todoTasks').innerHTML = '';
        document.getElementById('doingTasks').innerHTML = '';
        document.getElementById('doneTasks').innerHTML = '';


        tasks.forEach(task => {
            const taskElement = createTaskElement(task);

            if (task.status === 'todo') {
                document.getElementById('todoTasks').appendChild(taskElement);
            } else if (task.status === 'doing') {
                document.getElementById('doingTasks').appendChild(taskElement);
            } else if (task.status === 'done') {
                document.getElementById('doneTasks').appendChild(taskElement);
            }
        });
    }

    function createTaskElement(task) {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.draggable = true;
        taskDiv.dataset.taskId = task.id;

        taskDiv.innerHTML = `
        <div class="task-title">${task.title}</div> 
        <div class="task_info">
        <span class="priority priority-${task.priority}">${task.priority}</span>
        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        </div> 
        `;

        taskDiv.addEventListener('dragstart', handleDragStart);
        taskDiv.addEventListener('dragend', handleDragEnd);

        return taskDiv;
    }

    function deleteTask(id) {
        if (confirm('Delete this task?')) {
            tasks = tasks.filter(task => task.id !== id);
            showTasks();
        }
    }

    let draggedTaskId = null;

    function handleDragStart(e) {
        draggedTaskId = parseInt (e.target.dataset.taskId);
        e.target.classList.add('dragging');
    }

    function handleDragEnd(e) {
        e.target.classList.remove('dragging');
        draggedTaskId = null;
    }

    function setupBoards () {
        const boards = document.querySelectorAll('.board');

        boards.forEach(board => {
            board.addEventListener('dragover', function(e) {
                e.preventDefault();
                board.classList.add('.drag-over');
            });
            board.addEventListener('dragleave', function() {
                board.classList.remove ('drag-over');
            });

            board.addEventListener('drop', function(e) {
                e.preventDefault();
                board.classList.remove ('drag-over');

                if (draggedTaskId) {
                    const task = tasks.find(t => t.id === draggedTaskId);
                    if (task) {
                        task.status = board.dataset.status;
                        showTasks();
                    }
                }
            });
        });
    }

    document.getElementById('taskTitle').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    setupBoards();
    showTasks();
}