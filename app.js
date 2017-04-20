$('#register').click(function() {
    alert("You clicked Register!");
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'register_form.html'),
        protocol: 'file:',
        slashes: true}));
})

$('#login').click(function() {
    alert("You logged in yo!");
})