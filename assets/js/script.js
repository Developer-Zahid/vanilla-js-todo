let inputBox = document.querySelector(".card__header__input");
let addButton = document.querySelector(".card__footer__btn--add");
let updateButton = document.querySelector(".card__footer__btn--update");
let resultList = document.querySelector(".card__body__list");
let alertBox = document.querySelector(".alert");
let todoArr = [];
let storageTodoArr = JSON.parse(localStorage.getItem("todo-array"));

document.addEventListener("DOMContentLoaded", function(){
    inputBox.value = '';
    if(storageTodoArr !== null){
        addStorageTodoList();
    }
});

function inputBoxReset(placeholderText){
    inputBox.classList.remove("card__header__input--empty");
    inputBox.setAttribute("placeholder", placeholderText);
}

function todoListEmptyAlert(){
    if(todoArr.length > 0){
        alertBox.classList.add("hidden")
    }else{
        alertBox.classList.remove("hidden")
    }
}

function updateStorageTodoArr(){
    localStorage.setItem("todo-array", JSON.stringify(todoArr));
}

function addTodoList(){
    resultList.innerHTML = "";
    todoArr.map((item, index)=>{
        resultList.insertAdjacentHTML('beforeend', `
            <li class="card__body__list__item">
                <input type="checkbox" class="card__body__list__item__checkbox" aria-label="complete task">
                <span class="card__body__list__item__checkbox__indicator">
                    <span class="card__body__list__item__checkbox__indicator__icons"></span>
                </span>
                <span class="card__body__list__item__text">
                    <span class="card__body__list__item__text__inner">${item}</span>
                </span>
                <div class="card__body__list__item__btn-group">
                    <button type="button" class="card__body__list__item__btn card__body__list__item__btn--edit" aria-label="edit button">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button type="button" class="card__body__list__item__btn card__body__list__item__btn--delete" aria-label="delete button">
                        <i class="bi bi-trash3"></i>
                    </button>
                </div>
            </li>
        `);
    });
    editTodoList();
    removeTodoList();
}

function editTodoList(){
    let editButtons = document.querySelectorAll(".card__body__list__item__btn--edit");
    let editButtonsArr = [...editButtons];
    let listCheckboxs = document.querySelectorAll(".card__body__list__item__checkbox");
    let listCheckboxsArr = [...listCheckboxs];
    editButtonsArr.map((item, index)=>{
        item.addEventListener("click", function(){
            if(inputBox.classList.contains("card__header__input--empty")){
                inputBoxReset("Update this todo")
            }
            inputBox.value = todoArr[index];
            updateButton.setAttribute("data-edit-index", index);
            updateButton.classList.remove("hidden");
            addButton.classList.add("hidden");
            inputBox.setAttribute("placeholder", "Update this todo");
            listCheckboxsArr.map((item)=>{
                item.checked = false;
                item.disabled = true;
            });
        })
    });
}

function removeTodoList(){
    let deleteButtons = document.querySelectorAll(".card__body__list__item__btn--delete");
    let deleteButtonsArr = [...deleteButtons];
    deleteButtonsArr.map((item, index)=>{
        item.addEventListener("click", function(){
            todoArr.splice(index, 1);
            updateStorageTodoArr();
            addTodoList();
        })
    });
    todoListEmptyAlert();
}

function addStorageTodoList(){
    todoArr = [...storageTodoArr];
    addTodoList();
}

addButton.addEventListener("click", function(){
    if(inputBox.value.trim() != ''){
        if(inputBox.classList.contains("card__header__input--empty")){
            inputBoxReset("Add a todo");
        }
        todoArr.push(inputBox.value);
        updateStorageTodoArr();
        todoListEmptyAlert();
        addTodoList();
        inputBox.value = '';
    }else{
        inputBox.value = '';
        inputBox.setAttribute("placeholder", "Please enter a todo");
        inputBox.classList.add("card__header__input--empty");

        inputBox.addEventListener("input", function(){
            if(inputBox.value.trim() != '' && inputBox.classList.contains("card__header__input--empty")){
                inputBoxReset("Add a todo");
            }
        })
    }
});

updateButton.addEventListener("click", function(){
    if(inputBox.value.trim() != ''){
        inputBoxReset("Add a todo");
        todoArr.splice(updateButton.dataset.editIndex, 1, inputBox.value);
        updateStorageTodoArr();
        addTodoList();
        updateButton.removeAttribute("data-edit-index");
        updateButton.classList.add("hidden");
        addButton.classList.remove("hidden");
        inputBox.value = '';
    }else{
        inputBox.value = '';
        inputBox.setAttribute("placeholder", "Please edit this todo");
        inputBox.classList.add("card__header__input--empty");

        inputBox.addEventListener("input", function(){
            if(inputBox.value.trim() != '' && inputBox.classList.contains("card__header__input--empty")){
                inputBoxReset("Add a todo");
            }
        })
    }
})