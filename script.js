const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;

    if (nameInput.value.trim() === '') {
        showError(nameInput, 'nameError');
        isValid = false;
    } else {
        hideError(nameInput, 'nameError');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        showError(emailInput, 'emailError');
        isValid = false;
    } else {
        hideError(emailInput, 'emailError');
    }

    if (messageInput.value.trim() === '') {
        showError(messageInput, 'messageError');
        isValid = false;
    } else {
        hideError(messageInput, 'messageError');
    }

    if (isValid) {
        successMessage.classList.add('show');
        contactForm.reset();
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    }
});

function showError(input, errorId) {
    input.classList.add('error');
    document.getElementById(errorId).classList.add('show');
}

function hideError(input, errorId) {
    input.classList.remove('error');
    document.getElementById(errorId).classList.remove('show');
}

let todos = [];

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text === '') return;

    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(todo);
    input.value = '';
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${todo.id})">
            <span class="todo-text">${todo.text}</span>
            <div class="todo-actions">
                <button class="complete-btn" onclick="toggleTodo(${todo.id})">
                    ${todo.completed ? 'Undo' : 'Done'}
                </button>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        
        todoList.appendChild(li);
    });
}

document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});