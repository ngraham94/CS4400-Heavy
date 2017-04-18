function register() {
    alert("You clicked Register!");
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'register_form.html'),
        protocol: 'file:',
        slashes: true}));
}

function login() {
    alert("You clicked Register!");
}