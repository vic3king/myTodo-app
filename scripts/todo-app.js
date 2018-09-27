'use strict'

let todos = getSavedTodos()

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    // const formEl = document.querySelector('#new-todo')
    // const textEl = document.createElement('p')
    
    const input = e.target.elements.text.value.trim()
    // vic3King<<<<<<
    if (input.length > 0) {
    todos.push({
            id: uuidv4(),
            text: input,
            completed: false
        })
        saveTodos(todos)
        renderTodos(todos, filters)
        e.target.elements.text.value = ''
    } else {
        // textEl.textContent = 'Enter a note'
        //   formEl.appendChild(textEl)
    }

    e.preventDefault()
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})
