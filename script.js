function addTask() {
    let taskName = document.getElementById('input-new-task').value

    if (taskName == '') {
        taskName = 'Sem titulo'
    }

    const idName = taskName.replace(/\s+/g, '')

    const taskList = document.querySelector('.task-list')
    const newTask = document.createElement('div')

    newTask.innerHTML = `
        <div class="task">
            <div>
                <label>${taskName}</label>
            </div>
            <div class="task-icons">
                <i class="fa-solid fa-circle-check" id="${idName}" onclick="completed(this.id)"></i>
                <i class="fa-solid fa-circle-xmark" id="${idName}" onclick="deleteTask(this.id)"></i>
                <i class="fa-solid fa-pen" id="${idName}" onclick="editTask(this.id)"></i>
            </div>
        </div>`

    taskList.insertBefore(newTask, taskList.querySelector('h2').nextSibling)

    document.getElementById('input-new-task').value = ''
}

function completed(id) {
    const idName = document.getElementById(id)
    const divLabel = idName.parentNode.previousElementSibling
    const taskName = divLabel.textContent.trim()

    const completedList = document.querySelector('.completed')
    const taskCompleted = document.createElement('div')

    taskCompleted.innerHTML = `
        <div class="task-completed">
            <div>
                <label><del>${taskName}</del></label>
            </div>
            <div class="task-icons">
                <i class="fa-solid fa-trash" id="${idName}" onclick="deleteTask(this.id)"></i>
            </div>
        </div>`

    completedList.insertBefore(taskCompleted, completedList.querySelector('h2').nextSibling)

    const oldTask = idName.parentNode.parentNode.parentNode

    oldTask.remove()
}

function deleteTask(id) {
    const idName = document.getElementById(id)

    const oldTask = idName.parentNode.parentNode.parentNode

    oldTask.remove()
}

function editTask(id) {

    const idName = document.getElementById(id)

    const divLabel = idName.parentNode.previousElementSibling
    const labelValue = divLabel.textContent.trim()

    divLabel.children[0].remove()
    divLabel.innerHTML = `<input type="text" id="input-new-task" value="${labelValue}">`

    const input = divLabel.children[0]
    input.focus()
    input.selectionStart = input.value.length
    input.selectionEnd = input.value.length

    const divIcons = idName.parentNode
    divIcons.classList.remove('task-icons')
    divIcons.classList.add('edit-task')
    while (divIcons.firstChild) {
        divIcons.removeChild(divIcons.firstChild)
    }
    // a estrutura de repetição só para quando for falsa,
    // enquanto houver um elemento filho na primeira posição ele vai remover
    divIcons.innerHTML = `
        <i class="fa-regular fa-circle-check" id="confirm"></i>
        <i class="fa-regular fa-circle-xmark" id="cancel"></i>
    `
    const confirm = document.getElementById('confirm')
    confirm.addEventListener('click', () => {
        const newValue = input.value

        divLabel.children[0].remove()
        divLabel.innerHTML = `<label>${newValue}</label>`
        
        divIcons.classList.remove('edit-task')
        divIcons.classList.add('task-icons')
        while (divIcons.firstChild) {
            divIcons.removeChild(divIcons.firstChild)
        }
        divIcons.innerHTML = `
            <i class="fa-solid fa-circle-check" id="${idName}" onclick="completed(this.id)"></i>
            <i class="fa-solid fa-circle-xmark" id="${idName}" onclick="deleteTask(this.id)"></i>
            <i class="fa-solid fa-pen" id="${idName}" onclick="editTask(this.id)"></i>
        `
    })

    const cancel = document.getElementById('cancel')
    cancel.addEventListener('click', () => {
        
        divLabel.children[0].remove()
        divLabel.innerHTML = `<label>${labelValue}</label>`

        divIcons.classList.remove('edit-task')
        divIcons.classList.add('task-icons')
        while (divIcons.firstChild) {
            divIcons.removeChild(divIcons.firstChild)
        }
        divIcons.innerHTML = `
            <i class="fa-solid fa-circle-check" id="${idName}" onclick="completed(this.id)"></i>
            <i class="fa-solid fa-circle-xmark" id="${idName}" onclick="deleteTask(this.id)"></i>
            <i class="fa-solid fa-pen" id="${idName}" onclick="editTask(this.id)"></i>
        `
    })

    input.addEventListener('blur', () => {
        divLabel.children[0].remove()
        divLabel.innerHTML = `<label>${labelValue}</label>`

        divIcons.classList.remove('edit-task')
        divIcons.classList.add('task-icons')
        while (divIcons.firstChild) {
            divIcons.removeChild(divIcons.firstChild)
        }
        divIcons.innerHTML = `
            <i class="fa-solid fa-circle-check" id="${idName}" onclick="completed(this.id)"></i>
            <i class="fa-solid fa-circle-xmark" id="${idName}" onclick="deleteTask(this.id)"></i>
            <i class="fa-solid fa-pen" id="${idName}" onclick="editTask(this.id)"></i>
        `
    })

}