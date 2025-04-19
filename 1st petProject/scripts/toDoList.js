const buttonElement = document.querySelector('#AddTaskButton')

const modalWindow = document.querySelector('#modal')

const cancelButtonElement = document.querySelector('#turnModalInactive')

const submitNewTaskElement = document.querySelector('#submitNewTask')

const tasksAsObjectArray = JSON.parse(localStorage.getItem('tasks')) || []

const formElement = document.querySelector('form')

const taskFieldElement = document.querySelector('.taskField')

const taskListElement = document.querySelector('.taskList')


// Константы выше

// Функция рендеринга таска на страницу

const renderNewTaskToTaskList = () => {
    console.log(tasksAsObjectArray[tasksAsObjectArray.length -1])
    let individualTask = document.createElement('div')
    individualTask.className = 'individualTaskBox'
    taskListElement.appendChild(individualTask)
    Object.values(tasksAsObjectArray[tasksAsObjectArray.length - 1]).forEach((value) => {
        console.log(value)
        let taskPropertyElement = document.createElement('span')
        taskPropertyElement.className = 'taskIndividualProperty'
        taskPropertyElement.textContent = value
        individualTask.appendChild(taskPropertyElement)
    })
    
}

// Переключение модалки

const turnModalWindowInactive = () => {
    modalWindow.classList.replace('modal__active', 'modal__inactive')
}

const expandModalWindowForm = () => {
    if (modalWindow.classList.contains('modal__inactive')) {
         modalWindow.classList.replace('modal__inactive', 'modal__active')
    }  else if (modalWindow.classList.contains('modal__active')) {
        modalWindow.classList.replace('modal__active', 'modal__inactive')
    }
     
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
    const TaskName = document.querySelector('#TaskName')
    const priority = document.querySelector('#priority')
    const difficulty = document.querySelector('#difficulty')
    const newTask = new Task(
        TaskName.value,
        priority.value,
        difficulty.value,
        
    )
    
    if (TaskName.value === '') {
        alert('Заполните все поля')
    } else {tasksAsObjectArray.push(newTask)
        renderNewTaskToTaskList()
        modalWindow.classList.replace('modal__active', 'modal__inactive')
        console.log(tasksAsObjectArray)
        saveArrayIntoLocalStorage()
        formElement.reset()
    }
    
    
}


// очистка страницы от тасок из прошлой сессии 

const clearTasksFromPage = () => {
    taskListElement.innerHTML = ''
}

// рендер тасок на страницу из локального хранилища

const renderTasksOnPageFromLocalStorage = () => {
    clearTasksFromPage()
    let parsedTasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks')) || []
    parsedTasksFromLocalStorage.forEach((task) => {
        let individualTask = document.createElement('div')
        individualTask.className = 'individualTaskBox'
        taskListElement.appendChild(individualTask)
        Object.values(task).forEach((value) => {
            let taskPropertyElement = document.createElement('span')
            taskPropertyElement.className = 'taskIndividualProperty'
            taskPropertyElement.textContent = value
            individualTask.appendChild(taskPropertyElement)
        })
        
    })
    
}

// функции и классы выше



submitNewTaskElement.addEventListener('click', submitNewTaskForArray)

cancelButtonElement.addEventListener('click', turnModalWindowInactive)

buttonElement.addEventListener('click', expandModalWindowForm)

// EventListeners Выше

renderTasksOnPageFromLocalStorage()


// Вызов независимых функций выше

