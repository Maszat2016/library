import createContainer from './container_create.js';
import modal from './modal_controller.js';

async function fillBookContainer() {
    try {
        const filters = new URLSearchParams();

        const text_filter = document.getElementById('filter-text');
        const page_filter = document.getElementById('filter-page-count');

        if (text_filter && text_filter.value != "") {
            filters.append('title', text_filter.value);
            filters.append('author', text_filter.value);
            filters.append('editor', text_filter.value);
            filters.append('publisher', text_filter.value);
            filters.append('house', text_filter.value);
            filters.append('comment', text_filter.value);
        }
        if (page_filter && page_filter.value != "") {
            filters.append('page_count', page_filter.value);
        }

        console.log('/api/books/all?' + filters.toString());

        const response = await fetch('/api/books/all?' + filters.toString());
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const datas = await response.json();
        console.log(datas);
        const books = datas.data;
        const bookContainer = document.getElementById('book-container');
        bookContainer.innerHTML = "";

        books.forEach(book => {
            console.log(book);
            bookContainer.appendChild(
                createContainer.createBookContainer(book.book_id, book.title, book.authors, book.editor, book.page_count));
        })
    }
    catch (e) {
        console.error('Error fetching books:', e);
    }
}

async function fetchBookById(book_id) {
    try{
        const response = await fetch(`/api/books/${book_id}`);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const datas = await response.json();
        console.log(datas);
        const book = datas.data;
        console.log(book);

        modal.fillBookModal(book.book_id, book.title, book.authors, book.editor, book.publisher, book.publishing_date, book.isbn,
            book.page_count, book.house, book.room, book.bookcase, book.shelf, book.comment);

        return book;
    }
    catch(e){
        console.error('Error fetching the book:', error);
    }
}

async function deleteBookById(book_id) {
    try{
        const response = await fetch(`/api/books/${book_id}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        location.reload();
    }
    catch (error){
        console.error('Error deleting the book:', error);
    }
}

async function createBook() {
    const title = document.getElementById('title').value;
    const authors = document.getElementById('authors').value;
    const editor = document.getElementById('editor').value;
    const publisher = document.getElementById('publisher').value;
    const publishingDate = document.getElementById('publishing_date').value;
    const isbn = document.getElementById('isbn').value;
    const pageCount = document.getElementById('page_count').value;
    const house = document.getElementById('house').value;
    const room = document.getElementById('room').value;
    const bookcase = document.getElementById('bookcase').value;
    const shelf = document.getElementById('shelf').value;
    const comment = document.getElementById('comments').value;

    if(!(title && pageCount && house && room && bookcase && shelf)){
        alert("A cím, oldalszám és hely mezőket ki kell tölteni")
        return;
    }

    console.log(JSON.stringify({
        title: title,
        authors: (authors == "") ? null : authors,
        editor: (editor == "") ? null : editor,
        publisher: (publisher == "") ? null : publisher,
        publishing_date: parseInt(publishingDate),
        isbn: (isbn == "") ? null : isbn,
        page_count: parseInt(pageCount),
        house: house,
        room: room,
        bookcase: parseInt(bookcase),
        shelf: parseInt(shelf),
        comment: (comment == "") ? null : comment
    }))

    try{
        const response = await fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                authors: (authors == "") ? null : authors,
                editor: (editor == "") ? null : editor,
                publisher: (publisher == "") ? null : publisher,
                publishing_date: parseInt(publishingDate),
                isbn: (isbn == "") ? null : isbn,
                page_count: parseInt(pageCount),
                house: house,
                room: room,
                bookcase: parseInt(bookcase),
                shelf: parseInt(shelf),
                comment: (comment == "") ? null : comment
            })
        })

        const result = await response.json();

        if(response.ok){
            alert("Könyv sikeresen hozzáadva");
            location.reload();
        }
        else{
            alert(`Hiba történt: ${result.message || 'Ismeretlen hiba' }`)
        }
    }
    catch(error){
        console.error('Error creating the book:', error);
    }
}

async function updateBookById(book_id) {
    const title = document.getElementById('update_title').value;
    const authors = document.getElementById('update_authors').value;
    const editor = document.getElementById('update_editor').value;
    const publisher = document.getElementById('update_publisher').value;
    const publishingDate = document.getElementById('update_publishing_date').value;
    const isbn = document.getElementById('update_isbn').value;
    const pageCount = document.getElementById('update_page_count').value;
    const house = document.getElementById('update_house').value;
    const room = document.getElementById('update_room').value;
    const bookcase = document.getElementById('update_bookcase').value;
    const shelf = document.getElementById('update_shelf').value;
    const comment = document.getElementById('update_comments').value;

    let changed = {};
    if(title){changed.title = title}
    if(authors){changed.authors = authors}
    if(editor){changed.editor = editor}
    if(publisher){changed.publisher = publisher}
    if(publishingDate){changed.publishing_date = parseInt(publishingDate)}
    if(isbn){changed.isbn = isbn}
    if(pageCount){changed.page_count = parseInt(pageCount)}
    if(house){changed.house = house}
    if(room){changed.room = room}
    if(bookcase){changed.bookcase = parseInt(bookcase)}
    if(shelf){changed.shelf = parseInt(shelf)}
    if(comment){changed.comment = comment}

    console.log(changed);

    try{
        const response = await fetch(`/api/books/${book_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changed)
        })

        const result = await response.json();

        if(response.ok){
            alert('Könyv sikeresen frissítve')
            location.reload();
        }
        else{
            alert(`Hiba történt: ${result.message || 'Ismeretlen hiba' }`)
        }
    }
    catch (error){
        console.error('Error updating the book:', error);
    }
}

export default {
    fillBookContainer,
    fetchBookById,
    deleteBookById,
    createBook,
    updateBookById
};