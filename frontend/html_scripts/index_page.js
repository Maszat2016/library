import fetch from "./fetch.js";
import modal from "./modal_controller.js";
import user from "./user_access.js";

document.addEventListener("DOMContentLoaded", () => {fetch.fillBookContainer()});
document.getElementById("apply-filter")
    .addEventListener("click", () => {fetch.fillBookContainer()});
document.getElementById("reset-filter")
    .addEventListener("click", () => {fetch.resetFilters()});


document.getElementById("close-modal")
    .addEventListener("click", () => {modal.closeModal("book_detail_modal")});
document.getElementById("close-modal-add")
    .addEventListener("click", () => {modal.closeModal("add-book-container")});
document.getElementById("close-modal-update")
    .addEventListener("click", () => {modal.closeModal("update-book-container")});
document.querySelector('.overlay')
    .addEventListener("click", () => {modal.closeModal()});

document.getElementById("add-book-button")
    .addEventListener("click", () => {modal.openModal(null, "add-book-container")});

document.getElementById("create-book-button")
    .addEventListener("click", () => {fetch.createBook()});

document.addEventListener("DOMContentLoaded", (event) => {user.showButtons()})

document.getElementById("logoutButton").addEventListener('click', () => {user.logOut()})