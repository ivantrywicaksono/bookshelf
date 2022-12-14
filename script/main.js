const RENDER_EVENT = "render-event";
const INIT_LOAD = "init-load";
const bookDataKey = "BOOK_DATA";

let bookDataList = [];

document.dispatchEvent(new Event(INIT_LOAD));

function localSave(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function localGet(key) {
    return JSON.parse(localStorage.getItem(key));
}

function generateBookDataObject(title, author, year, isComplete) {
    return {
        title,
        author,
        year,
        isComplete,
        id: +new Date()
    }
}

document.addEventListener(INIT_LOAD, function () {
    const dataList = localGet(bookDataKey);
    for (const data of dataList) bookDataList.push(data);
    localSave(bookDataKey, bookDataList);
});

function addBook() {
    const titleField = document.getElementById("js-book-title");
    const title = titleField.value;

    const authorField = document.getElementById("js-book-author");
    const author = authorField.value;

    const yearField = document.getElementById("js-book-year");
    const year = yearField.value;

    const isCompleteField = document.getElementById("js-book-status");
    const isComplete = isCompleteField.checked;

    titleField.value = "";
    authorField.value = "";
    yearField.value = "";
    isCompleteField.checked = false;

    for (const book of bookDataList) {
        if (title == book.title) {
            alert("Maaf, Anda sudah memiliki buku dengan judul yang sama");
            return;
        }
    }
    
    const bookData = generateBookDataObject(title, author, year, isComplete);
    
    bookDataList.push(bookData);

    localSave(bookDataKey, bookDataList);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBook(bookId) {
    for (const book of bookDataList) {
        if (book.id === bookId) return book;
    }
    return null;
}

function moveToCompleteList(bookId) {
    const targetedBookObject = findBook(bookId);
    
    if (targetedBookObject == null) return;

    targetedBookObject.isComplete = true;

    localSave(bookDataKey, bookDataList);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function moveToIncompleteList(bookId) {
    const targetedBookObject = findBook(bookId);
    
    if (targetedBookObject.isComplete === null) return;

    targetedBookObject.isComplete = false;

    localSave(bookDataKey, bookDataList);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBookIndex(bookId) {
    for (const index in bookDataList) {
        if (bookDataList[index].id == bookId) return index;
    }
    return -1;
}

function deleteBook(bookId) {
    const targetedBookIndex = findBookIndex(bookId);

    if (targetedBookIndex == -1) return;

    bookDataList.splice(targetedBookIndex, 1);

    localSave(bookDataKey, bookDataList);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeBook(bookObject) {
    const {title, author, year, isComplete, id} = bookObject;

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = `Penulis: ${author}`;

    const bookYear = document.createElement("p");
    bookYear.innerText = `Tahun: ${year}`;


    const shelfItemContainer = document.createElement("article");
    shelfItemContainer.classList.add("book_item");
    shelfItemContainer.append(bookTitle, bookAuthor, bookYear);
    
    const bookActionContainer = document.createElement("div");
    bookActionContainer.classList.add("action");

    if (isComplete) {
        const unFinishButton = document.createElement("button");
        unFinishButton.classList.add("green");
        unFinishButton.innerHTML = '<img src="./assets/icons/swap_vertical.svg">';

        unFinishButton.addEventListener("click", function () {
            moveToIncompleteList(id);
        });
        
        bookActionContainer.append(unFinishButton);
    } else {
        const finishButton = document.createElement("button");
        finishButton.classList.add("green");
        finishButton.innerHTML = '<img src="./assets/icons/swap_vertical.svg">';

        finishButton.addEventListener("click", function () {
            moveToCompleteList(id);
        });
        
        bookActionContainer.append(finishButton);
    } 

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("red");
    deleteButton.innerHTML = '<img src="./assets/icons/delete_forever.svg">';

    deleteButton.addEventListener("click", function () {
        deleteBook(id);
    });

    bookActionContainer.append(deleteButton);

    shelfItemContainer.append(bookActionContainer);

    return shelfItemContainer;
}

document.addEventListener('DOMContentLoaded', function () {
    document.dispatchEvent(new Event(INIT_LOAD));
    document.dispatchEvent(new Event(RENDER_EVENT));


    const bookForm = document.getElementById("js-book-form");

    bookForm.addEventListener("submit", function (event) {
        event.preventDefault();

        addBook();
    });

    const searchButton = document.getElementById("js-search-btn");

    searchButton.addEventListener("click", function () {
        const books = document.getElementsByClassName("book_item");
        const searchTitle = document.getElementById("js-search-book-title").value;

        if (searchTitle == "") {
            for (const i in books) books[i].removeAttribute("hidden");
        }

        for (const i in books) {
            if (books[i].firstChild.innerText == searchTitle) books[i].removeAttribute("hidden");
            else books[i].setAttribute("hidden", true);
        }
    });    
});

document.addEventListener(RENDER_EVENT, function () {
    const inCompleteList = document.getElementById("js-incomplete-list");
    inCompleteList.innerHTML = "";
    
    const completeList = document.getElementById("js-complete-list");
    completeList.innerHTML = "";

    for (const book of bookDataList) {
        const bookElement = makeBook(book);
        
        if (book.isComplete) completeList.append(bookElement);    
        else inCompleteList.append(bookElement);
    }
});
