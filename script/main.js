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
    bookAuthor.innerText = `Penulis: ${bookObject.author}`;

    const bookYear = document.createElement("p");
    bookYear.innerText = `Tahun: ${bookObject.year}`;


    const shelfItemContainer = document.createElement("article");
    shelfItemContainer.classList.add("book_item");
    shelfItemContainer.append(bookTitle, bookAuthor, bookYear);
    
    const bookActionContainer = document.createElement("div");
    bookActionContainer.classList.add("action");

    if (bookObject.isComplete == true) {
        const unFinishButton = document.createElement("button");
        unFinishButton.classList.add("green");
        unFinishButton.innerText = "Belum selesai dibaca"
        
        bookActionContainer.append(unFinishButton);
    } else {
        const finishButton = document.createElement("button");
        finishButton.classList.add("green");
        finishButton.innerText = "Selesai dibaca"
        
        bookActionContainer.append(finishButton);
    } 

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("red");
    deleteButton.innerText = "Hapus Buku";

    bookActionContainer.append(deleteButton);

    shelfItemContainer.append(bookActionContainer);

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

        for (const book of bookDataList) {
            const bookElement = makeBook(book);
            
            if (book.isComplete) completeList.append(bookElement);    
            else inCompleteList.append(bookElement);
        }
            
    });
});