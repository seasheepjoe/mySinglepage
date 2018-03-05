window.onload = function () {
    if (sessionStorage.getItem('username') !== null) {
        document.querySelector('#title').innerHTML += sessionStorage.getItem('username');
    } else {
        var menu = document.querySelector('#menu');
        remove(menu);
        menu.innerHTML = 'Please login';
    }
}

getUserInSessionStorage();

function loadPage(page, callback) {
    var http = new XMLHttpRequest();
    var url = page;
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onload = function () {
        if (http.readyState == 4 && http.status == 200) {
            document.body.innerHTML += http.responseText;
            if (typeof callback !== 'undefined') {
                callback();
            }
        }
    };
    http.send();
}

function toSessionStorage(data1, data2) {
    if (sessionStorage.getItem('username') === null && sessionStorage.getItem('userpassword') === null) {
        sessionStorage.setItem('username', data1);
        sessionStorage.setItem('userpassword', data2);
    } else {
        alert('You already are on a session');
    }
}

function getUserInSessionStorage() {
    if (sessionStorage.getItem('username') !== null && sessionStorage.getItem('userpassword') !== null) {
        var username = sessionStorage.getItem('username');
        loadPage('profil', edit);
    } else {
        loadPage('login', login);
    }
}

function login() {
    var loginForm = document.querySelector('form[name="login"]');
    loginForm.onsubmit = function () {
        var username = document.querySelector('#username').value;
        var pwd = document.querySelector('#pwd').value;
        if (username.length <= 4 || pwd.length <= 4) {
            document.querySelector('.errors').innerHTML = ('Username or password must be at least 5 characters');
            return false;
        } else if (username.length >= 14 || pwd.length >= 14) {
            document.querySelector('.errors').innerHTML = ('Username or password must be max 15 characters');
            return false;
        } else {
            toSessionStorage(username, pwd);
            remove(loginForm);
            document.querySelector('.errors').innerHTML = (' ');
        }
    };
}

function edit() {
    var editForm = document.querySelector('form[name="edit-username"');
    editForm.onsubmit = function () {
        var newUsername = document.querySelector('#newUsername').value;
        if (newUsername.length <= 4) {
            document.querySelector('.errors').innerHTML = ('Username must be at least 5 characters');
            return false;
        } else if (newUsername.length >= 14) {
            document.querySelector('.errors').innerHTML = ('Username must be max 15 characters');
            return false;
        } else {
            updateSessionStorage(newUsername);
            document.querySelector('.errors').innerHTML = (' ');
        }
    };

    document.querySelector('#logout').onclick = function () {
        logout();
    }
}

function logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userpassword');
    window.location.reload();
}

function remove(item) {
    item.innerHTML = ' ';
}

function updateSessionStorage(newUsername) {
    sessionStorage.setItem('username', newUsername);
}