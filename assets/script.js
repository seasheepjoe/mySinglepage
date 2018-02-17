$(function () {
    var loginForm = $('form[name="login"]');
    loginForm.submit(function () {
        var username = $('#username').val();
        var pwd = $('#pwd').val();
        if (username.length <= 4 || pwd.length <= 4) {
            $('.errors').html('Username or password must be at least 5 characters');
            return false;
        } else if (username.length >= 14 || pwd.length >= 14) {
            $('.errors').html('Username or password must be max 15 characters');
            return false;
        } else {
            toSessionStorage(username, pwd);
            remove(loginForm);
            $('.errors').html(' ');
        }
    });

    if (sessionStorage.getItem('username') !== null) {
        document.querySelector('#title').innerHTML += sessionStorage.getItem('username');
    } else {
        var menu = $('#menu');
        remove(menu);
        menu.text('Please login');
    }

    $('#logout').click(function () {
        logout();
    });

    var editForm = $('form[name="edit-username"');
    editForm.submit(function () {
        var newUsername = $('#newUsername').val();
        if (newUsername.length <= 4) {
            $('.errors').html('Username must be at least 5 characters');
            return false;
        } else if (username.length >= 14) {
            $('.errors').html('Username must be max 15 characters');
            return false;
        } else {
            updateSessionStorage(newUsername);
            $('.errors').html(' ');
        }
    });
});

getUserInSessionStorage();

function loadPage(page) {
    $.ajax({
        url: page + '.html',
        type: 'get',
        success: function (data) {
            console.log('Ok');
            document.body.innerHTML += data;

        },
        error: function (data) {
            console.log('NOPE');
        }
    });
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
        loadPage('profil');
    } else {
        loadPage('login');
    }
}

function logout() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userpassword');
    window.location.reload();
}

function remove(item) {
    item.text(' ');
}

function updateSessionStorage(newUsername) {
    sessionStorage.setItem('username', newUsername);
}