$(function () {
    var form = $('form');
    form.submit(function () {
        var username = $('#username').val();
        var pwd = $('#pwd').val();
        console.log(username, pwd);
        toSessionStorage(username, pwd);
        return false;
    });
});

loadPage('login');

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
    if (sessionStorage.getItem('userdata') === null) {
        var userData = [data1, data2];
        sessionStorage.setItem('userdata', userData);
    } else {
        alert('You already are on a session');
    }

}