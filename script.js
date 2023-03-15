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
    let taskName = document.getElementById('input-new-task').value
    
    if(taskName == '') {
        taskName = 'Sem titulo'
    }

    const idName = taskName.replace(/\s+/g, '')

    // console.log(idName)

    const taskList = document.querySelector('.task-list')
    const newTask = document.createElement('div')

    // newTask.setAttribute('id', idName)

    newTask.innerHTML = `
        <div class="task">
            <div>
                <label for="">${taskName}</label>
            </div>
            <div class="task-icons">
                <i class="fa-solid fa-circle-check" task-title="${taskName}" id="${idName}" onclick="completed(this.id)"></i>
                <i class="fa-solid fa-circle-xmark"></i>
                <i class="fa-solid fa-pen"></i>
            </div>
        </div>`

    taskList.insertBefore(newTask, taskList.querySelector('h2').nextSibling)

    document.getElementById('input-new-task').value = ''
}

function completed(id) {
    const idName = document.getElementById(id)

    const taskName = idName.getAttribute('task-title') 
    
    const completedList = document.querySelector('.completed')
    const taskCompleted = document.createElement('div')

    taskCompleted.innerHTML = `
        <div class="task-completed">
            <div>
                <label for=""><del>${taskName}</del></label>
            </div>
            <div class="task-icons">
                <i class="fa-solid fa-trash"></i>
            </div>
        </div>`

    completedList.insertBefore(taskCompleted, completedList.querySelector('h2').nextSibling)

    const oldTask = idName.parentNode.parentNode.parentNode
    
    oldTask.remove()
}