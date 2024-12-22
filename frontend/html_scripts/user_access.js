function isUserLoggedIn() {
    const cookies = document.cookie
        .split('; ')
        .map(cookie => cookie.split('='))
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

    if (cookies.jwt && cookies.jwt.trim() !== ''){
        return true;
    } else {
        return false;
    }
}

function checkIfAdmin(){
    try{
        const response = fetch('/api/admin/check-admin', {
            method: 'GET',
            credentials: 'include',
        })

        if(!response.ok){
            throw new Error('Failed to check if user is admin');
        }

        const data = response.json();
        return data.data.isAdmin;
    }catch(e){
        console.error('Error checking admin status: ', e);
        return false;
    }
}

function showButtons(){
    const logoutButton = document.getElementById('logoutButton');
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const addBookButton = document.getElementById('add-book-button');
    const filter = document.getElementById('filter-container');
    const header = document.getElementById('header');

    if(isUserLoggedIn()){
        logoutButton.style.display = 'block';
        logoutButton.style = "text-decoration: none;"
        loginButton.style.display = 'none';
        registerButton.style.display = 'none';
        addBookButton.style.display = 'block';
        addBookButton.style = "text-decoration: none;"
        filter.style.display = 'block';
        filter.style = "text-decoration: none;"
        header.style.display = 'none';
    }
    else{
        logoutButton.style.display = 'none';
        loginButton.style.display = 'block';
        loginButton.style = "text-decoration: none;"
        registerButton.style.display = 'block';
        registerButton.style = "text-decoration: none;"
        addBookButton.style.display = 'none';
        filter.style.display = 'none';
        header.style.display = 'block';
        header.style = "text-decoration: none;"
    }
}

async function logIn() {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        await axios.post('/api/users/login', {
            username: username,
            password: password
        }, {
            withCredentials: true
        });
        localStorage.setItem('username', username);

        const userResponse = await axios.get(`/api/users/${username}`, {});
        const userId = userResponse.data.data.user_id;
        localStorage.setItem('user_id', userId);
        alert('Login successful');
        window.location.href = '/api/books';
    }
    catch (error) {
        console.error(error);
        alert('Login failed');
    }
}

function logOut(){
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');

    document.cookie = "jwt=; token=; path=/;";
    window.location.reload();
}

async function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('/api/users/register', {
            username: username,
            password: password
        }, {
            withCredentials: true
        });
        alert('Registration successful');
        window.location.href = '/api/books';
    } catch (error) {
        console.error(error);
        alert('Registration failed');
    }
}

export default {
    showButtons,
    logOut,
    logIn,
    register,
};