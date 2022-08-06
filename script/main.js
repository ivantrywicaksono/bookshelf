// Initialize a variable to store the book data objects
const bookDataList = [];

// Set the custom event name
const SUBMIT_EVENT = "submit-event";

// const submitBtn = document.getElementById("js-submit-book-btn");

// Generate an object which contain the book data
function generateBookDataObject(title, author, year, bookStatus) {
    return {
        title,
        author,
        year,
        bookStatus,
        id: +new Date()
    }
}

// Generate a new object of book data and push it to the bookDataList array
function addBook() {
    const title = document.getElementById("js-book-title").value;
    const author = document.getElementById("js-book-author").value;
    const year = document.getElementById("js-book-year").value;
    const bookStatus = document.getElementById("js-book-status").value;
    
    // Store the generated book data object
    const bookData = generateBookDataObject(title, author, year, bookStatus);
    
    // Store the generated book data object to the bookDataList array
    bookDataList.push(bookData);

    // Trigger the custom event
    document.dispatchEvent(new Event(SUBMIT_EVENT));
}

// Do these if the document sucessfully loaded
document.addEventListener('DOMContentLoaded', function () {
    const bookForm = document.getElementById("js-book-form");
    
    bookForm.addEventListener("submit", function (event) {
        // Prevent the submit button refreshing the page
        event.preventDefault();

        // Generate a new object of book data and push it to the bookDataList array
        addBook();
    });

    // Do these if the custom event is triggered
    document.addEventListener(SUBMIT_EVENT, function () {
        console.log(bookDataList);

        // Generate new HTML elements for each object in bookDataList and display it
        renderBooks();
    });
});