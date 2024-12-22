import user from './user_access.js';

document.getElementById("registration-button")
    .addEventListener('click', () => user.register())