import modal from "./modal_controller.js";

function createBookContainer(bookId, bookTitle, author, editor, pageCount) {
    // Create the book-details-container div
    const bookDetailsContainer = document.createElement("div");
    bookDetailsContainer.classList.add("book-details-container");

    // Create and add the book title
    const bookTitleContainer = document.createElement("h1");
    bookTitleContainer.classList.add("book-title");
    bookTitleContainer.textContent = bookTitle;
    bookDetailsContainer.appendChild(bookTitleContainer);

    // Create and add the author/editor information
    if (author != null) {
        const authorInfoContainer = document.createElement("div");
        authorInfoContainer.classList.add("book-author");
        authorInfoContainer.innerHTML = author;
        bookDetailsContainer.appendChild(authorInfoContainer);
    }
    if (editor != null) {
        const editorInfoContainer = document.createElement("div");
        editorInfoContainer.classList.add("book-editor");
        editorInfoContainer.innerHTML = editor;
        bookDetailsContainer.appendChild(editorInfoContainer);
    }

    // Create and add the page count information
    const pageCountContainer = document.createElement("div");
    pageCountContainer.classList.add("book-page");
    pageCountContainer.innerHTML = pageCount + " oldal";
    bookDetailsContainer.appendChild(pageCountContainer);

    // Create and add the "Részletek" button
    const bookButton = document.createElement("button");
    bookButton.id = bookId.toString();
    bookButton.classList.add("book-button");
    bookButton.textContent = "Részletek";
    bookButton.addEventListener("click", () => {modal.openModal(bookId, "book_detail_modal");})
    bookDetailsContainer.appendChild(bookButton);

    return bookDetailsContainer;
}

export default {
    createBookContainer
};