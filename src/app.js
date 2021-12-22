const API_URL = "https://eykzcospdsihofcqycao.supabase.co/rest/v1/taches"

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDA4NTcwNywiZXhwIjoxOTU1NjYxNzA3fQ.U4mPAGSaiNXL_Ykexcz7-JiJBtwmPYWyIzGiTxn1vKk"


import { applyRouting } from "./routing.js";
// src/app.js


/***************************/

document.querySelector("form").addEventListener("submit", (event) => {
    
    event.preventDefault();
  
  
    const input = document.querySelector('input[name="todo-text"]');
  
    const item = {
      id: Date.now(),
      text: input.value,
      done: false,
    };
    

    addTodo(item);

    input.value = "";
    input.focus();
  });

  /************************* */
  const addTodo = (item) => {
  const container = document.querySelector("ul");
  container.insertAdjacentHTML(
    "beforeend",
    `
        <li>
            <label>
                <input type="checkbox" id="todo-${item.id}" ${item.done ? "checked" : ""} /> 
                ${item.text}
            </label>
        </li>
    `
  );
  document
  // Nous sélectionnons la checkbox fraichement ajoutée au DOM
  .querySelector("input#todo-" + item.id)
  // Et nous lions la fonction onClickCheckbox au click 
  .addEventListener("click", onClickCheckbox);
};


/**************************/
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector('input[name="todo-text"]');
    const item = {
      id: Date.now(),
      text: input.value,
      done: false,
    };
   
    fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                apiKey: API_KEY,
                Prefer: "return=representation",
            },
        })
        .then((response) => response.json())
        .then((items) => {
          addTodo(items[0]);
          input.value = "";
          input.focus();
        });
  });



  document.addEventListener("DOMContentLoaded", () => {
    applyRouting(window.location.pathname);
    // Appel HTTP vers Supabase
    fetch(`${API_URL}?order=created_at`, {
      headers: {
        apiKey: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((items) => {
        items.forEach((item) => addTodo(item));
      });

      

    // loadTodoItemsFromApi().then((items) => {
    //     items.forEach((item) => addTodo(item));
    // });
  });

/************* */
const onClickCheckbox = (e) => {
const inputId = e.target.id; 
const id = +inputId.split("-").pop();  
const isDone = e.target.checked;

e.preventDefault();

fetch(`${API_URL}?id=eq.${id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    apiKey: API_KEY,
    Prefer: "return=representation",
  },
  body: JSON.stringify({ done: isDone }),
}).then(() => {

  e.target.checked = isDone;
});
};
