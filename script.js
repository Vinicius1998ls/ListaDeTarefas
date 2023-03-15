// const plus = document.getElementById('plus')

// const { random } = require("lodash")

// plus.addEventListener('click', () => {
//     console.log('funciona')
// })

// function addTask() {
//     const divTask = document.getElementById('new-task-name');
//     const input = document.createElement('input');
//     input.setAttribute('type', 'text');
//     input.setAttribute('id', 'input-new-task');
//     divTask.removeChild(divTask.querySelector('label'));
//     divTask.appendChild(input);
// }

function addTask() {
    const taskList = document.querySelector('.task-list')
    const newTask = document.createElement('div')

    let taskName = document.getElementById('input-new-task').value

    if(taskName == '') {
        taskName = 'Sem titulo'
    }

    console.log(taskName)

    newTask.innerHTML = `
        <div class="task">
            <div>
                <label for="">${taskName}</label>
            </div>
            <div class="task-icons">
                <i class="fa-solid fa-circle-check"></i>
                <i class="fa-solid fa-circle-xmark"></i>
                <i class="fa-solid fa-pen"></i>
            </div>
        </div>`

    taskList.insertBefore(newTask, taskList.querySelector('h2').nextSibling)

    document.getElementById('input-new-task').value = ''
}

