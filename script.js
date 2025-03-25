// Define variable
const inp = document.querySelector('#textInput');
const taskContainer = document.querySelector('#taskList');
const superContainer = document.querySelector('#superContainer');

// Local Storage
callData()

// Define Functions
function addTask() {
    if (inp.value.trim() === "") {
        alert('You must write something!');
    } else {
        // Check if we are editing an existing task
        const editingTask = document.querySelector('.editing');
        if (editingTask) {
            const span = editingTask.querySelector('span');
            span.innerHTML = inp.value;
            editingTask.classList.remove('editing');
        } else {
            // Create Div Elements
            let task = document.createElement('div');
            let span = document.createElement('span');
            let input = document.createElement('input');
            let firstIcon = document.createElement('i');
            let secondIcon = document.createElement('i');
            let textContent = document.createElement('div');
            let iconContent = document.createElement('div');

            // Add Class
            input.type = 'checkbox';
            task.classList.add('task');
            textContent.classList.add('text-content');
            iconContent.classList.add('icon-content');
            firstIcon.classList.add(`fa-solid`, `fa-pen-to-square`);
            secondIcon.classList.add(`fa-solid`, `fa-trash-can`);

            // Define Values
            span.innerHTML = inp.value;

            // Append all elements
            taskContainer.appendChild(task);
            task.appendChild(textContent);
            task.appendChild(iconContent);
            textContent.appendChild(input);
            textContent.appendChild(span);
            iconContent.appendChild(firstIcon);
            iconContent.appendChild(secondIcon);
        }
        saveData();
    }
    inp.value = "";
    superContainer.style.border = "2px solid transparent"; 
}

// Live character limit control
inp.addEventListener("input", function () {
    if (inp.value.length > 100) {
        inp.value = inp.value.substring(0, 100); 
        superContainer.style.border = "2px solid red"; 
    } else superContainer.style.border = "2px solid transparent"; 
});


// Define Other Functions
taskContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'INPUT') {
        const parentDiv = e.target.closest('.text-content');
        const span = parentDiv.querySelector('span');
        if (e.target.checked) span.classList.add('checked');
        else span.classList.remove('checked');
        saveData()
    } else if (e.target.classList.contains('fa-trash-can')) {
        e.target.parentElement.parentElement.remove();
        saveData()
    } else if (e.target.classList.contains('fa-pen-to-square')) {
        const parentDiv = e.target.closest('.task');
        const span = parentDiv.querySelector('span');
        inp.value = span.innerHTML;
        parentDiv.classList.add('editing');
        saveData()
    }
}, false);

// Save on Local Storage 
function saveData() {
    localStorage.setItem("data's", taskContainer.innerHTML);
}

// Call data when opening website
function callData() {
    taskContainer.innerHTML = localStorage.getItem("data's")
}
