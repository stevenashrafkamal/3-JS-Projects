function navigate(pageId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    setTimeout(() => {
        document.getElementById(pageId).classList.add('active');
        if(pageId === 'colors') {
            generatePaletteCode();
        }
    }, 50);
}

let tasks = [];

function addTask() {
    const input = document.getElementById('taskInput');
    if (input.value.trim() === '') return;

    tasks.push({ id: Date.now(), text: input.value });
    input.value = '';
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task-item';
        div.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                <button class="btn-edit" onclick="editTask(${task.id})">Edit</button>
                <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        list.appendChild(div);
    });
}

function editTask(id) {
    const newText = prompt("Edit Task:");
    if (newText && newText.trim() !== '') {
        tasks = tasks.map(task => task.id === id ? { ...task, text: newText } : task);
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function getRandomColorHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
}

function createColorBox(color) {
    const box = document.createElement('div');
    box.className = 'color-box';
    box.style.background = color;
    box.textContent = color;
    return box;
}

function copyColor(color) {
    navigator.clipboard.writeText(color);
    alert('Color copied!');
}

function generatePaletteCode() {
    const palette = document.getElementById('palette');
    if (!palette) return;
    
    palette.innerHTML = '';
    
    for (let i = 0; i < 8; i++) {
        const color = getRandomColorHex();
        const box = createColorBox(color);
        box.addEventListener('click', () => copyColor(color));
        palette.appendChild(box);
    }
}

const modal = document.getElementById('myModal');

function openModal() {
    modal.classList.add('show');
}

function closeModal() {
    modal.classList.remove('show');
}

window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}