// Fetch existing todos from localStorage
const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

// Save todos to localStorage
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}


//remove todos based on id
const removeTodo = function(id) {
    const todoIndex = todos.findIndex(function(todo) {
        return todo.id === id
    }) 
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
      }
}

// Render application todos based on filters
const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

    filteredTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDOM(todo))
    })
}

// Get the DOM elements for an individual note
const generateTodoDOM = function (todo) {
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

    //set up remove button 
    removeButton.addEventListener('click', function() {
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
const generateSummaryDOM = function (incompleteTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    return summary
}
