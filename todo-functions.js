// Fetch existing todos from localStorage
const getSavedTodos =  () => {
    const todosJSON = localStorage.getItem('todos')
    return todosJSON !== null ?  JSON.parse(todosJSON) : []
}

// Save todos to localStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id) 
    if (todo !== undefined) {
        todo.completed = !todo.completed
      }
}


//remove todos based on id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
      }
}

// Render application todos based on filters
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach((todo) => {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const divEl = document.createElement('div')
    const spanEl = document.createElement('span')
    const removeButton = document.createElement('button')
    const checkbox = document.createElement('input')

    //html dom manipulations
    checkbox.setAttribute('type', 'checkbox')
    removeButton.textContent = 'X'
    divEl.appendChild(checkbox)
    divEl.appendChild(spanEl)
    divEl.appendChild(removeButton)
    spanEl.textContent = todo.text

    //set up checkbox toggle 
    checkbox.addEventListener('change',(e) => {
       toggleTodo(todo.id)
        saveTodos(todos)
     renderTodos(todos, filters)
    })
    //set up remove button 
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    //setting up checkbox botton to checked
    //    if (todo.completed){
    //     checkbox.checked = true
    //    }
    checkbox.checked = todo.completed

    return divEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}
