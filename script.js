const idList = []
const inEdit = []
const labelList = []

//Função para adicionar nova tarefa
function addTask() {
    // pega o valor que está no input para criar o nome da terefa
    let taskName = document.getElementById('input-new-task').value

    // Evita que o nome da tarefa fique em branco
    if (taskName == '') {
        taskName = 'Sem titulo'
    }

    //Remove todos os espaços em branco
    let idName = taskName.replace(/\s+/g, '')

    //Faz com que não haja ID repetidos
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

    //Cria a div da tarefa
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

    // Inclui a tarefa depois do titulo h2
    taskList.insertBefore(newTask, taskList.querySelector('h2').nextSibling)

    // Limpa o input
    document.getElementById('input-new-task').value = ''

    //Se alguma tarefa estiver sendo editada, a edição é cancelada
    cancelEdition()
}

//Função para concluir tarefas
function completed(id) {
    //Pega a div da tarefa
    const taskContainer = document.getElementById(id)
    //Pega a tag label
    const Label = taskContainer.children[0].children[0]
    //Passa para a variavel o texto que está no label e remove os espaços em branco
    const taskName = Label.textContent.trim()

    //Seleciona a lista de tarefas completadas
    const completedList = document.querySelector('.completed')
    //Cria a div que vai ser inserida nas tarefas completas
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

    //Inseri apos o titulo h2
    completedList.insertBefore(taskCompleted, completedList.querySelector('h2').nextSibling)

    //remove a tarefa completada da lista de tarefas
    taskContainer.remove()

    //Se alguma tarefa estiver sendo editada, a edição é cancelada
    cancelEdition()
}

//Função para excluir tarefas
function deleteTask(id) {
    //Pega a div da tarefa
    const taskContainer = document.getElementById(id)

    //Remove a tarefa
    taskContainer.remove()

    //Remove o id da lista de id que evita repetições
    idList.splice(idList.indexOf(id), 1)

    //Se alguma tarefa estiver sendo editada, a edição é cancelada
    cancelEdition()
}

//Função para alterar o nome das tarefas
function editTask(id) {
    //Pega a div da tarefa
    const taskContainer = document.getElementById(id)
    //Pega a tag label
    const Label = taskContainer.children[0].children[0]
    //Passa para a variavel o texto que está no label e remove os espaços em branco
    const labelValue = Label.textContent.trim()
    //Inseria o valor de label para lista
    labelList.push(labelValue)

    //Remove a tag label
    Label.remove()
    //Inseri a tag input lo lugar onde estava o label
    taskContainer.children[0].innerHTML = `<input type="text" id="rename-task" value="${labelValue}">`

    //Faz com que o cursor foque no input e fique no final da palavra
    const input = taskContainer.children[0].children[0]
    input.focus()
    input.selectionStart = input.value.length
    input.selectionEnd = input.value.length

    //altera a classe da div que contem os botões
    const divIcons = taskContainer.children[1]
    divIcons.classList.remove('task-icons')
    divIcons.classList.add('edit-task')
    //Remove os filhos da div
    // a estrutura de repetição só para quando for falsa,
    // enquanto houver um elemento filho na primeira posição ele vai remover
    while (divIcons.firstChild) {
        divIcons.removeChild(divIcons.firstChild)
    }
    //Inseri os novos icones para confirmar o novo nome da div ou cancelar a edição
    divIcons.innerHTML = `
        <i class="fa-regular fa-circle-check" id="confirm"></i>
        <i class="fa-regular fa-circle-xmark" id="cancel"></i>
    `

    const confirm = document.getElementById('confirm')
    //Caso for clicado no botão de confirmar essa função é executada
    confirm.addEventListener('click', () => {
        //Pega o valor que está no input
        const newValue = input.value

        //Remove o input
        taskContainer.children[0].children[0].remove()
        //Inseri o label com o novo nome da tarefa
        taskContainer.children[0].innerHTML = `<label>${newValue}</label>`

        //Remove os icones de edição e coloca os normais
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

        // Remove da lista de edição
        inEdit.splice(inEdit.indexOf(inEdit[0]), 1)
        labelList.splice(labelList.indexOf(labelList[0]), 1)
    })


    // Função para cancelar edição
    const cancel = document.getElementById('cancel')
    cancel.addEventListener('click', () => {

        //Remove o input e coloca o label com valor original
        taskContainer.children[0].children[0].remove()
        taskContainer.children[0].innerHTML = `<label>${labelValue}</label>`

        //Remove os icones de edição e coloca os normais
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

        //Remove da lista de edição
        inEdit.splice(inEdit.indexOf(inEdit[0]), 1)
        labelList.splice(labelList.indexOf(labelList[0]), 1)
    })

    // inseri na lista de edição
    inEdit.push(id)
    //verifica se já ha tarefas em edição
    //se houver vai ser cancela o item que entrou em edição primeiro
    if (inEdit[1] != undefined) {
        //pega a div que entrou em edição primeiro
        let taskContainer = document.getElementById(inEdit[0])
        //Verifica se foi armazenado a div da tarefa ou algum botão da div com mesmo id
        //caso tenha selecionado o botão, vai ser selecionado a div da tarefa
        if (!taskContainer.childElementCount > 0) {
            taskContainer = taskContainer.parentNode.parentNode
        }

        //Remove o input e inseri o label com valor original
        taskContainer.children[0].children[0].remove()
        taskContainer.children[0].innerHTML = `<label>${labelList[0]}</label>`
        
        //Remove os icones de edição e coloca os normais
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

        //Remove da lista de edição
        inEdit.splice(inEdit.indexOf(inEdit[0]), 1)
        labelList.splice(labelList.indexOf(labelList[0]), 1)
    }
}

//essa Função serve para cancelar a edição caso algum outro botão seja interagido
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