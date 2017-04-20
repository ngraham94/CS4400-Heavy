const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'academic-mysql.cc.gatech.edu',
    user     : 'cs4400_71',
    password : 'Je29H2sc',
    database : 'cs4400_71'
});

connection.connect();
console.log("sending query...");
connection.query('SELECT * FROM CITYSTATE', function (error, results, fields) {

    if (error) throw error;
    console.log(results[0].city);
});

connection.end();
console.log("response received...");

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