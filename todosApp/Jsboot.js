"use strict";

const todos = getSavedTodos(); //generate the array

let filtered = "";
let hideCompleted = false;

renderTodos(todos, filtered);

document.querySelector("#filter-todo").addEventListener("input", (e) => {
  filtered = e.target.value;
  renderTodos(todos, filtered);
});

document.querySelector("#new-todo").addEventListener("submit", (event) => {
  event.preventDefault();
  todos.push({
    id: uuidv4(),
    text: event.target.elements.text.value,
    completed: false,
  });
  renderTodos(todos, filtered);
  saveTodos(JSON.stringify(todos));
  event.target.elements.text.value = "";
});

document
  .querySelector("#hide-completed")
  .addEventListener("change", (event) => {
    hideCompleted = event.target.checked;
    renderTodos(todos, filtered);
  });
