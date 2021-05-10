"use strict";

//Fetch Existing todos from localStorage
const getSavedTodos = () => {
  const retrieveData = localStorage.getItem("todosList");

  //if (retrieveData !== null) {
  //  return JSON.parse(retrieveData);
  //} else return [];

  try {
    return retrieveData ? JSON.parse(retrieveData) : [];
  } catch (error) {
    return [];
  }
};

//Save todos to LocalStorage
const saveTodos = (savedData) => {
  localStorage.setItem("todosList", savedData);
};

// Render app todos based on the filteres.
const renderTodos = (todos, filtered) => {
  const filterTodos = todos.filter((element) => {
    const searchTextMatch = element.text
      .toLowerCase()
      .includes(filtered.toLowerCase());
    const hideCompleteMatch = !hideCompleted || !element.completed;
    return searchTextMatch && hideCompleteMatch;
  });

  const incompleteTodos = filterTodos.filter((todo) => {
    return !todo.completed;
  });

  document.querySelector("#todos-container").innerHTML = "";

  generateSummaryDOM(incompleteTodos);

  filterTodos.forEach((todo) => {
    document
      .querySelector("#todos-container")
      .appendChild(generateTodoDOM(todo));
  });
};

//generate TodoDOM
const generateTodoDOM = (todo) => {
  const todoContainer = document.createElement("div");
  const checkbox = document.createElement("input");
  const span = document.createElement("span");
  const deleteBbutton = document.createElement("button");

  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  todoContainer.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(JSON.stringify(todos));
    renderTodos(todos, filtered);
  });

  span.textContent = todo.text;
  todoContainer.appendChild(span);

  deleteBbutton.textContent = "x";
  todoContainer.appendChild(deleteBbutton);
  deleteBbutton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(JSON.stringify(todos));
    renderTodos(todos, filtered);
  });

  return todoContainer;
};

//generate summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement("h2");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  document.querySelector("#todos-container").appendChild(summary);
};

// remove button
const removeTodo = (input) => {
  const index = todos.findIndex((element) => element.id === input);
  if (index > -1) {
    todos.splice(index, 1);
  }
};

//checkbox Worke

const toggleTodo = (input) => {
  const index = todos.findIndex((element) => element.id === input);
  if (todos[index].completed) {
    todos[index].completed = false;
  } else {
    todos[index].completed = true;
  }
};
