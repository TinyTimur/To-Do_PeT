const buttonElement = document.querySelector('#AddTaskButton')

const modalWindow = document.querySelector('#modal')

const cancelButtonElement = document.querySelector('#turnModalInactive')

const submitNewTaskElement = document.querySelector('#submitNewTask')

const tasksAsObjectArray = JSON.parse(localStorage.getItem('tasks')) || []

const formElement = document.querySelector('form')

const taskFieldElement = document.querySelector('.taskField')

const taskListElement = document.querySelector('.taskList')

const deleteAllTaskButtonElement = document.querySelector('#removeAllTasks')


// Константы выше

// Функция рендеринга таска на страницу

// const renderNewTaskToTaskList = () => {
//     console.log(tasksAsObjectArray[tasksAsObjectArray.length -1])
//     let individualTask = document.createElement('div')
//     individualTask.className = 'individualTaskBox'
//     taskListElement.appendChild(individualTask)
//     Object.values(tasksAsObjectArray[tasksAsObjectArray.length - 1]).forEach((value) => {
//         console.log(value)
//         let taskPropertyElement = document.createElement('span')
//         taskPropertyElement.className = 'taskIndividualProperty'
//         taskPropertyElement.textContent = value
//         individualTask.appendChild(taskPropertyElement)
//     })
    
// }


const renderNewTaskToTaskList = () => {
    let individualTaskElement = document.createElement('div')
    individualTaskElement.className = 'individualTaskBox'
    taskListElement.appendChild(individualTaskElement)
    let task = tasksAsObjectArray[tasksAsObjectArray.length - 1]

    const idPropertyOfTask = document.createElement('span')
    idPropertyOfTask.textContent = task.id
    idPropertyOfTask.className = 'taskIndividualProperty'

    const taskPropertyOfTask = document.createElement('span')
    taskPropertyOfTask.textContent = task.task
    taskPropertyOfTask.className = 'taskIndividualProperty'

    const priorityPropertyOfTask = document.createElement('span')
    priorityPropertyOfTask.textContent = task.priority
    priorityPropertyOfTask.className = 'taskIndividualProperty'

    const difficultyPropertyOfTask = document.createElement('span')
    difficultyPropertyOfTask.textContent = task.difficulty
    difficultyPropertyOfTask.className = 'taskIndividualProperty'

    const boxForStatusCheckbox = document.createElement('div')
    boxForStatusCheckbox.className = 'taskIndividualProperty'

    const statusPropertyOfTask = document.createElement('input')
    statusPropertyOfTask.type = 'checkbox'
    statusPropertyOfTask.className = 'taskIndividualProperty'

    individualTaskElement.appendChild(idPropertyOfTask)
    individualTaskElement.appendChild(taskPropertyOfTask)
    individualTaskElement.appendChild(priorityPropertyOfTask)
    individualTaskElement.appendChild(difficultyPropertyOfTask)
    individualTaskElement.appendChild(boxForStatusCheckbox)
    boxForStatusCheckbox.appendChild(statusPropertyOfTask)

}

// Переключение модалки

const toggleModalWindow = () => {
    modalWindow.classList.toggle('modal__active')
    modalWindow.classList.toggle('modal__inactive')
}


    
// Задаем класс для задачи

class Task {
    constructor(task, priority, difficulty, id = new Date().toLocaleDateString('ru-RU')) {
        this.id = id;
        this.task = task;
        this.priority = priority;
        this.difficulty = difficulty;
        this.completed = false
        
    }
}

// функция сохранения массива задач в локальное хранилище

const saveArrayIntoLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasksAsObjectArray))
}


// По нажатию кнопки вызываем функцию сохранения массива в локальное хранилище и рендерим задачу на странцу

const submitNewTaskForArray = () => {
    event.preventDefault()
    const TaskInputName = document.querySelector('#TaskName')
    const priorityInput = document.querySelector('#priority')
    const difficultyInput = document.querySelector('#difficulty')
    const newTask = new Task(
        TaskInputName.value,
        priorityInput.value,
        difficultyInput.value,
        
    )
    
    if (TaskInputName.value === '') {
        alert('Заполните все поля')
    } else {tasksAsObjectArray.push(newTask)                // dependant on renderNewTaskToTaskList
        renderNewTaskToTaskList()
        modalWindow.classList.replace('modal__active', 'modal__inactive')
        console.log(tasksAsObjectArray)
        saveArrayIntoLocalStorage()
        formElement.reset()
    }
    
    
}


// очистка страницы от тасок из прошлой сессии 

const clearTasksFromPage = () => {
    
}

// рендер тасок на страницу из локального хранилища

const renderTasksOnPageFromLocalStorage = () => {
    clearTasksFromPage()
    let parsedTasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks')) || []
    parsedTasksFromLocalStorage.forEach((task) => {
        let individualTaskElement = document.createElement('div')
        individualTaskElement.className = 'individualTaskBox'
        taskListElement.appendChild(individualTaskElement)

        const idPropertyOfTask = document.createElement('span')
        idPropertyOfTask.textContent = task.id
        idPropertyOfTask.className = 'taskIndividualProperty'

        const taskPropertyOfTask = document.createElement('span')
        taskPropertyOfTask.textContent = task.task
        taskPropertyOfTask.className = 'taskIndividualProperty'

        const priorityPropertyOfTask = document.createElement('span')
        priorityPropertyOfTask.textContent = task.priority
        priorityPropertyOfTask.className = 'taskIndividualProperty'

        const difficultyPropertyOfTask = document.createElement('span')
        difficultyPropertyOfTask.textContent = task.difficulty
        difficultyPropertyOfTask.className = 'taskIndividualProperty'

        const boxForStatusCheckbox = document.createElement('div')
        boxForStatusCheckbox.className = 'taskIndividualProperty'

        const statusPropertyOfTask = document.createElement('input')
        statusPropertyOfTask.type = 'checkbox'
        statusPropertyOfTask.className = 'taskIndividualProperty'

        individualTaskElement.appendChild(idPropertyOfTask)
        individualTaskElement.appendChild(taskPropertyOfTask)
        individualTaskElement.appendChild(priorityPropertyOfTask)
        individualTaskElement.appendChild(difficultyPropertyOfTask)
        individualTaskElement.appendChild(boxForStatusCheckbox)
        boxForStatusCheckbox.appendChild(statusPropertyOfTask)
        
    })
    
}
 
const removeAllTasks = () => {
    localStorage.clear('tasks')
    taskListElement.innerHTML = ''
}

// функции и классы выше



submitNewTaskElement.addEventListener('click', submitNewTaskForArray)

cancelButtonElement.addEventListener('click', toggleModalWindow)

buttonElement.addEventListener('click', toggleModalWindow)

deleteAllTaskButtonElement.addEventListener('click', removeAllTasks)

// EventListeners Выше

renderTasksOnPageFromLocalStorage()


// Вызов независимых функций выше

