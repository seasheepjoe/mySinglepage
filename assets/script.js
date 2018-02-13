$(function () {
    var loginForm = $('form[name="login"]');
    loginForm.submit(function () {
        var username = $('#username').val();
        var pwd = $('#pwd').val();
        toSessionStorage(username, pwd);
        remove(loginForm);
    });

    if (sessionStorage.getItem('username') !== null) {
        document.querySelector('#title').innerHTML += sessionStorage.getItem('username');
    } else {
        var menu = $('#menu');
        remove(menu);
    }

    $('#logout').click(function () {
        logout();
    });

    var editForm = $('form[name="edit-username"');
    editForm.submit(function () {
        var newUsername = $('#newUsername').val();
        updateSessionStorage(newUsername);
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