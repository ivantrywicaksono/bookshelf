const bookDataList = [];
const RENDER_EVENT = "render-event";


function generateBookDataObject(title, author, year, isComplete) {
    return {
        title,
        author,
        year,
        isComplete,
        id: +new Date()
    }
}

function addBook() {
    const title = document.getElementById("js-book-title").value;
    const author = document.getElementById("js-book-author").value;
    const year = document.getElementById("js-book-year").value;
    const isComplete = document.getElementById("js-book-status").checked;
    
    const bookData = generateBookDataObject(title, author, year, isComplete);
    
    bookDataList.push(bookData);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeBook(bookObject) {
    const bookTitle = document.createElement("h3");
    bookTitle.innerText = bookObject.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = `Author: ${bookObject.author}`;

    const bookYear = document.createElement("p");
    bookYear.innerText = `Publication year: ${bookObject.year}`;

    const bookDataContainer = document.createElement("div");
    bookDataContainer.append(bookTitle, bookAuthor, bookYear);

    const shelfItemContainer = document.createElement("article");
    shelfItemContainer.append(bookDataContainer);

    return shelfItemContainer;
}

document.addEventListener('DOMContentLoaded', function () {
    const bookForm = document.getElementById("js-book-form");
    
    bookForm.addEventListener("submit", function (event) {
        event.preventDefault();

        addBook();
    });

    document.addEventListener(RENDER_EVENT, function () {
        console.log(bookDataList);
        const inCompleteList = document.getElementById("js-incomplete-list");
        inCompleteList.innerHTML = "";
        
        const completeList = document.getElementById("js-complete-list");
        completeList.innerHTML = "";

        bookDataList.forEach(book => {
            const bookElement = makeBook(book);
            
            if (book.isComplete == false) inCompleteList.append(bookElement);
            if (book.isComplete == true) completeList.append(bookElement);
        });

    });
});