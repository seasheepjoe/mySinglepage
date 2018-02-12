$(function () {
    loadPage('login');
});

function loadPage(page) {
    $.ajax({
        url: page + '.html',
        type: 'get',
        success: function (data) {
            alert('YAY SUCCESS');
            return document.body.innerHTML += data;
        },
        error: function (data) {;
            alert('NOPE');
        }
    });
}