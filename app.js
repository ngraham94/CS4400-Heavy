const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'academic-mysql.cc.gatech.edu',
    user     : 'cs4400_71',
    password : 'Je29H2sc',
    database : 'cs4400_71'
});

connection.connect();

$('#register').click(function() {
    alert("You clicked Register!");
    window.location=("register.html");
})

$('#login').click(function() {
    let username = $('#username').val();
    let password = $('#password').val();
    //This block of code when you want to perfrom a query-------------------------------------------------------------------
    let query = "SELECT u.username, u.password FROM USER as u\n" +
            "WHERE u.username=\'" + username + "\'\n" +
            "AND u.password=\'" + password + "\';";
    console.log("sending query...\n" + query);
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        if(results.length == 0) {
            alert("Invalid credentials");
        } else {
            if (username = results[0].username && password == results[0].password) {
                alert("Login success!");
            }
        }
    });
//----------------------------------------------------------------------------------------------------------------------
    alert("You logged in yo!");
})