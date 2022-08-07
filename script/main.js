const bookDataList = [];
const RENDER_EVENT = "render-event";


function generateBookDataObject(title, author, year, bookStatus) {
    return {
        title,
        author,
        year,
        bookStatus,
        id: +new Date()
    }
}

function addBook() {
    const title = document.getElementById("js-book-title").value;
    const author = document.getElementById("js-book-author").value;
    const year = document.getElementById("js-book-year").value;
    const bookStatus = document.getElementById("js-book-status").value;
    
    const bookData = generateBookDataObject(title, author, year, bookStatus);
    
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

    const shelfItemContainer = document.createElement("div");
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
        const notStartedList = document.getElementById("js-not-started-list");
        notStartedList.innerHTML = "";

        const inProgressList = document.getElementById("js-in-progress-list");
        inProgressList.innerHTML = "";
        
        const finishedList = document.getElementById("js-finished-list");
        finishedList.innerHTML = "";

        bookDataList.forEach(book => {
            const bookElement = makeBook(book);
            
            if (book.bookStatus == 0) notStartedList.append(bookElement);
            if (book.bookStatus == 1) inProgressList.append(bookElement);
            if (book.bookStatus == 2) finishedList.append(bookElement);
        });

    });
});