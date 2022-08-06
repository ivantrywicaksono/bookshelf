const bookDataList = [];

// const submitBtn = document.getElementById("js-submit-book-btn");
function generateBookDataObject(title, author, year, bookStatus) {
    return {
        title,
        author,
        year,
        status,
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
    document.dispatchEvent(new Event('submit-book'));
}


console.log(bookDataList);

document.addEventListener('DOMContentLoaded', function () {
    const bookForm = document.getElementById("js-book-form");
    
    bookForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
    });

});