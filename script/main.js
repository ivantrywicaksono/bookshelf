const bookDataList = [];
const SUBMIT_EVENT = "submit-event";


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

    document.dispatchEvent(new Event(SUBMIT_EVENT));
}

document.addEventListener('DOMContentLoaded', function () {
    const bookForm = document.getElementById("js-book-form");
    
    bookForm.addEventListener("submit", function (event) {
        event.preventDefault();

        addBook();
    });

    document.addEventListener(SUBMIT_EVENT, function () {
        console.log(bookDataList);

        renderBooks();
    });
});