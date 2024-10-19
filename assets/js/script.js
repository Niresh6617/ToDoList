document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const startDateInput = document.getElementById('startDateInput');
    const endDateInput = document.getElementById('endDateInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');

    // Load todos from local storage
    loadTodos();

    // Add todo event
    addTodoBtn.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        if (todoText && startDate && endDate) {
            addTodo(todoText, startDate, endDate);
            todoInput.value = '';
            startDateInput.value = '';
            endDateInput.value = '';
        }
    });

    function addTodo(text, startDate, endDate) {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span class="todo-text">${text} - From: ${startDate} - To: ${endDate}</span>
            <button class="editBtn">Edit</button>
            <button class="saveBtn" style="display: none;">Save</button>
            <button class="deleteBtn">Delete</button>
            <button class="doneBtn">Done</button>
        `;

        // Event listener for deleting
        li.querySelector('.deleteBtn').addEventListener('click', () => {
            todoList.removeChild(li);
            saveTodos();
        });

        // Event listener for editing
        li.querySelector('.editBtn').addEventListener('click', () => {
            const todoText = li.querySelector('.todo-text');
            todoText.contentEditable = true;
            todoText.focus();
            li.querySelector('.editBtn').style.display = 'none';
            li.querySelector('.saveBtn').style.display = 'inline';
        });

        // Event listener for saving
        li.querySelector('.saveBtn').addEventListener('click', () => {
            const todoText = li.querySelector('.todo-text');
            todoText.contentEditable = false;
            li.querySelector('.editBtn').style.display = 'inline';
            li.querySelector('.saveBtn').style.display = 'none';
            saveTodos();
        });

        // Event listener for marking as done
        li.querySelector('.doneBtn').addEventListener('click', () => {
            const todoText = li.querySelector('.todo-text');
            todoText.style.textDecoration = todoText.style.textDecoration === 'line-through' ? 'none' : 'line-through';
            saveTodos();
        });

        todoList.appendChild(li);
        saveTodos();
    }

    function saveTodos() {
        const todos = [];
        document.querySelectorAll('.todo-item').forEach(li => {
            todos.push({
                text: li.querySelector('.todo-text').textContent,
                isDone: li.querySelector('.todo-text').style.textDecoration === 'line-through'
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <span class="todo-text" style="text-decoration: ${todo.isDone ? 'line-through' : 'none'};">${todo.text}</span>
                <button class="editBtn">Edit</button>
                <button class="saveBtn" style="display: none;">Save</button>
                <button class="deleteBtn">Delete</button>
                <button class="doneBtn">Done</button>
            `;

            // Add event listeners for existing todos
            li.querySelector('.deleteBtn').addEventListener('click', () => {
                todoList.removeChild(li);
                saveTodos();
            });

            li.querySelector('.editBtn').addEventListener('click', () => {
                const todoText = li.querySelector('.todo-text');
                todoText.contentEditable = true;
                todoText.focus();
                li.querySelector('.editBtn').style.display = 'none';
                li.querySelector('.saveBtn').style.display = 'inline';
            });

            li.querySelector('.saveBtn').addEventListener('click', () => {
                const todoText = li.querySelector('.todo-text');
                todoText.contentEditable = false;
                li.querySelector('.editBtn').style.display = 'inline';
                li.querySelector('.saveBtn').style.display = 'none';
                saveTodos();
            });

            li.querySelector('.doneBtn').addEventListener('click', () => {
                const todoText = li.querySelector('.todo-text');
                todoText.style.textDecoration = todoText.style.textDecoration === 'line-through' ? 'none' : 'line-through';
                saveTodos();
            });

            todoList.appendChild(li);
        });
    }
});
