import user from './user_access.js';

document.getElementById("login-button")
    .addEventListener('click', () => user.logIn())