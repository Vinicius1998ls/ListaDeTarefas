const idList = []
const inEdit = []
const labelList = []

function addTask() {
    let taskName = document.getElementById('input-new-task').value

    if (taskName == '') {
        taskName = 'Sem titulo'
    }

    let idName = taskName.replace(/\s+/g, '')

    if (idList.includes(idName)) {
        let number = 1
        let numberString = 0
        let oldId = idName
        while (idList.includes(idName)) {
            idName = oldId
            numberString = number.toString()
            idName = idName + numberString
            number = number + 1
        }
        idList.push(idName)
    } else {
        idList.push(idName)
    }

    const taskList = document.querySelector('.task-list')
    const newTask = document.createElement('div')
    newTask.setAttribute('class', 'task')
    newTask.setAttribute('id', idName)

    newTask.innerHTML = `
        <div>
            <label>${taskName}</label>
        </div>
        <div class="task-icons">
            <i class="fa-solid fa-circle-check" id="${idName}" onclick="completed(this.id)"></i>
            <i class="fa-solid fa-circle-xmark" id="${idName}" onclick="deleteTask(this.id)"></i>
            <i class="fa-solid fa-pen" id="${idName}" onclick="editTask(this.id)"></i>
        </div>
        `

    taskList.insertBefore(newTask, taskList.querySelector('h2').nextSibling)

    document.getElementById('input-new-task').value = ''

    cancelEdition()
}

function completed(id) {
    const taskContainer = document.getElementById(id)
    const divLabel = taskContainer.children[0].children[0]
    const taskName = divLabel.textContent.trim()

    const completedList = document.querySelector('.completed')
    const taskCompleted = document.createElement('div')
    taskCompleted.setAttribute('class', 'task-completed')
    taskCompleted.setAttribute('id', id)

    taskCompleted.innerHTML = `
            <div>
                <label><del>${taskName}</del></label>
            </div>
            <div class="task-icons">
                <i class="fa-solid fa-trash" id="${id}" onclick="deleteTask(this.id)"></i>
            </div>`

    completedList.insertBefore(taskCompleted, completedList.querySelector('h2').nextSibling)

    taskContainer.remove()

    cancelEdition()
}

function deleteTask(id) {
    const taskContainer = document.getElementById(id)

    taskContainer.remove()

    idList.splice(idList.indexOf(id), 1)

    cancelEdition()
}

function editTask(id) {

    const taskContainer = document.getElementById(id)
    const Label = taskContainer.children[0].children[0]
    const labelValue = Label.textContent.trim()
    labelList.push(labelValue)

    Label.remove()
    taskContainer.children[0].innerHTML = `<input type="text" id="rename-task" value="${labelValue}">`

    const input = taskContainer.children[0].children[0]
    input.focus()
    input.selectionStart = input.value.length
    input.selectionEnd = input.value.length

    const divIcons = taskContainer.children[1]
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

        taskContainer.children[0].children[0].remove()
        taskContainer.children[0].innerHTML = `<label>${newValue}</label>`

        divIcons.classList.remove('edit-task')
        divIcons.classList.add('task-icons')
        while (divIcons.firstChild) {
            divIcons.removeChild(divIcons.firstChild)
        }
        divIcons.innerHTML = `
            <i class="fa-solid fa-circle-check" id="${id}" onclick="completed(this.id)"></i>
            <i class="fa-solid fa-circle-xmark" id="${id}" onclick="deleteTask(this.id)"></i>
            <i class="fa-solid fa-pen" id="${id}" onclick="editTask(this.id)"></i>
        `

        inEdit.splice(inEdit.indexOf(inEdit[0]), 1)
        labelList.splice(labelList.indexOf(labelList[0]), 1)
    })

    const cancel = document.getElementById('cancel')
    cancel.addEventListener('click', () => {

        taskContainer.children[0].children[0].remove()
        taskContainer.children[0].innerHTML = `<label>${labelValue}</label>`

        divIcons.classList.remove('edit-task')
        divIcons.classList.add('task-icons')
        while (divIcons.firstChild) {
            divIcons.removeChild(divIcons.firstChild)
        }
        divIcons.innerHTML = `
            <i class="fa-solid fa-circle-check" id="${id}" onclick="completed(this.id)"></i>
            <i class="fa-solid fa-circle-xmark" id="${id}" onclick="deleteTask(this.id)"></i>
            <i class="fa-solid fa-pen" id="${id}" onclick="editTask(this.id)"></i>
        `

        inEdit.splice(inEdit.indexOf(inEdit[0]), 1)
        labelList.splice(labelList.indexOf(labelList[0]), 1)
    })

    inEdit.push(id)
    if (inEdit[1] != undefined) {
        let taskContainer = document.getElementById(inEdit[0])
        if (!taskContainer.childElementCount > 0) {
            taskContainer = taskContainer.parentNode.parentNode
        }

        taskContainer.children[0].children[0].remove()
        taskContainer.children[0].innerHTML = `<label>${labelList[0]}</label>`

        const divIcons = taskContainer.children[1]
        divIcons.classList.remove('edit-task')
        divIcons.classList.add('task-icons')
        while (divIcons.firstChild) {
            divIcons.removeChild(divIcons.firstChild)
        }
        divIcons.innerHTML = `
            <i class="fa-solid fa-circle-check" id="${inEdit[0]}" onclick="completed(this.id)"></i>
            <i class="fa-solid fa-circle-xmark" id="${inEdit[0]}" onclick="deleteTask(this.id)"></i>
            <i class="fa-solid fa-pen" id="${inEdit[0]}" onclick="editTask(this.id)"></i>
        `
        inEdit.splice(inEdit.indexOf(inEdit[0]), 1)
        labelList.splice(labelList.indexOf(labelList[0]), 1)
    }
}

function cancelEdition() {
    if (inEdit[0] != undefined) {
        let taskContainer = document.getElementById(inEdit[0])
        if (!taskContainer.childElementCount > 0) {
            taskContainer = taskContainer.parentNode.parentNode
        }

        taskContainer.children[0].children[0].remove()
        taskContainer.children[0].innerHTML = `<label>${labelList[0]}</label>`

        const divIcons = taskContainer.children[1]
        divIcons.classList.remove('edit-task')
        divIcons.classList.add('task-icons')
        while (divIcons.firstChild) {
            divIcons.removeChild(divIcons.firstChild)
        }
        divIcons.innerHTML = `
            <i class="fa-solid fa-circle-check" id="${inEdit[0]}" onclick="completed(this.id)"></i>
            <i class="fa-solid fa-circle-xmark" id="${inEdit[0]}" onclick="deleteTask(this.id)"></i>
            <i class="fa-solid fa-pen" id="${inEdit[0]}" onclick="editTask(this.id)"></i>
        `
        inEdit.splice(inEdit.indexOf(inEdit[0]), 1)
        labelList.splice(labelList.indexOf(labelList[0]), 1)
    }
}