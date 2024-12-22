import fetch from './fetch.js';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

function fillBookModal(book_id, title, author, editor, publisher, publishing_date, isbn, page_count,
                       house, room, bookcase, shelf, comment) {
    if(author == null){
        document.getElementById('modal-authors').classList.add('hidden');
    }
    else{
        document.getElementById('modal-authors-data').textContent = author;
    }
    if(editor == null){
        document.getElementById('modal-editor').classList.add('hidden');
    }
    else{
        document.getElementById('modal-editor-data').textContent = editor;
    }

    document.getElementById('modal-id-data').textContent = book_id;
    document.getElementById('modal-book_title').textContent = title;
    document.getElementById('modal-publisher-data').textContent = publisher;
    document.getElementById('modal-publishing_date-data').textContent = publishing_date;
    document.getElementById('modal-isbn-data').textContent = isbn;
    document.getElementById('modal-page_count-data').textContent = page_count;
    document.getElementById('modal-house-data').textContent = house;
    document.getElementById('modal-room-data').textContent = room;
    document.getElementById('modal-bookcase-data').textContent = bookcase;
    document.getElementById('modal-shelf-data').textContent = shelf;
    document.getElementById('modal-comment-data').textContent = comment;

    document.getElementById('delete_book').addEventListener('click', () => {fetch.deleteBookById(book_id)});
    document.getElementById('edit_book').addEventListener('click', () => {openModal(book_id, "update-book-container")});
    document.getElementById('update-book-button').addEventListener('click', () => {fetch.updateBookById(book_id)});
}

async function fillUpdateBookModal(book_id) {
    const book = await fetch.fetchBookById(book_id);

    document.getElementById('update_title').placeholder = book.title;
    document.getElementById('update_authors').placeholder = (book.authors === null) ? "" : book.authors;
    document.getElementById('update_editor').placeholder = (book.editor === null) ? "" : book.editor;
    document.getElementById('update_publisher').placeholder = (book.publisher === null) ? "" : book.publisher;
    document.getElementById('update_publishing_date').placeholder = (book.publishing_date === null) ? "" : book.publishing_date;
    document.getElementById('update_isbn').placeholder = (book.isbn === null) ? "" : book.isbn;
    document.getElementById('update_page_count').placeholder = book.page_count;
    document.getElementById('update_house').placeholder = book.house;
    document.getElementById('update_room').placeholder = book.room;
    document.getElementById('update_bookcase').placeholder = book.bookcase;
    document.getElementById('update_shelf').placeholder = book.shelf;
    document.getElementById('update_comments').placeholder = (book.comment === null) ? "" : book.comment;
}

function resetAddBookForm() {
    document.getElementById('title').value = "";
    document.getElementById('authors').value = "";
    document.getElementById('editor').value = "";
    document.getElementById('publisher').value = "";
    document.getElementById('publishing_date').value = "";
    document.getElementById('isbn').value = "";
    document.getElementById('page_count').value = "";
    document.getElementById('house').value = "";
    document.getElementById('room').value = "";
    document.getElementById('bookcase').value = "";
    document.getElementById('shelf').value = "";
    document.getElementById('comments').value = "";
}

const openModal = function (ID, container_name) {
    const modal_container = document.getElementById(container_name);
    if(container_name === "book_detail_modal"){
        fetch.fetchBookById(ID);
    }
    if(container_name === "update-book-container"){
        fillUpdateBookModal(ID);
    }
    if(container_name === "add-book-container"){
        resetAddBookForm();
    }
    modal_container.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = function (modal_name) {
    const modal_container = document.getElementById(modal_name);
    modal_container.classList.add('hidden');
    overlay.classList.add('hidden');
};

export default {
    openModal,
    closeModal,
    fillBookModal
}