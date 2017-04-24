const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'academic-mysql.cc.gatech.edu',
    user     : 'cs4400_71',
    password : 'Je29H2sc',
    database : 'cs4400_71',
    dateStrings : 'true'
});

connection.connect();

$('#register').click(function() {
    alert("You clicked Register!");
    connection.close();
    window.location=("register.html");
})

$('#BackLogin').click(function() {
    connection.close();
    window.location=("index.html");
})


$('#login').click(function() {
    let username = $('#username').val();
    let password = $('#password').val();
    //This block of code when you want to perfrom a query-------------------------------------------------------------------
    let query = "SELECT u.username, u.password, u.user_type FROM USER as u\n" +
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
                user_type = results[0].user_type;
                switch(user_type) {
                    case "admin":
                        window.location=("choosefunctionality.html");   //admin funcitonality
                        break;
                    case "city officials":
                        window.location=("COchooseFunctionality.html"); //city official functionality
                        break;
                    case "city scientists":
                        window.location=("adddatapoint.html");
                        break;
                }

            }
        }
    });
//----------------------------------------------------------------------------------------------------------------------
})

$('#Create').click(function() {
    let username = $('#username').val();
    let email    = $('#email').val();
    let password = $('#pwd').val();
    let user_type = $('#user_type')
    //This block of code when you want to perfrom a query-------------------------------------------------------------------
    let query = "INSERT INTO USER ('email_address', 'username', 'password', 'user_type')\n" +
    "VALUES ('email', 'username', 'password', 'user_type');";
    console.log("sending query...\n" + query);
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        else {
        switch(user_type) {
                            case "admin":
                                window.location=("choosefunctionality.html");
                                break;
                            case "city officials":
                                window.location=("COchooseFunctionality.html");
                                break;
                            case "city scientists":
                                console.log("city_scientist");
                                break;
                        }
        }

    });
//----------------------------------------------------------------------------------------------------------------------
})

//Admin functionality code begins here----------------------------------------------------------------------------------


$('#PendingDP').click(function() {
    window.location = "PendingDataPoint.html";
});

$('#PendingCOA').click(function() {
    window.location = "PendingCOFAccount.html";
});

function getPendingCityOfficials() {
    let row;
    let query = "SELECT * FROM CITY_OFFICIAL AS o\n" +
    "WHERE o.approved IS NULL;";
    console.log("sending query...\n" + query);
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        if(results.length == 0) {
            alert("No pending officials found.");
        } else {
            for(i of results) {
                row = '<tr>'
                row += '<td><input type="checkbox"/> &nbsp;</td>';
                row += '<td>' + i.username + '</td>';
                row += '<td>' + i.email_address + '</td>';
                row += '<td>' + i.city + '</td>';
                row += '<td>' + i.state + '</td>';
                row += '<td>' + i.title + '</td>';
                row += '</tr>';
                $('#pending_official_table').append(row);

            }
            console.log(results);
        }
    });
}

function getPendingDataPoints() {
    let row;
    let query = "SELECT * FROM DATA_POINT AS p\n" +
        "WHERE p.Accepted IS NULL;";
    console.log("sending query...\n" + query);
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        if (results.length == 0) {
            alert("No pending data points found.");
        } else {
            console.log(results);
            var date;
            for (i of results) {
                row = '<tr>'
                row += '<td><input type="checkbox"/> &nbsp;</td>';
                row += '<td>' + i.LocationName + '</td>';
                row += '<td>' + i.Type + '</td>';
                row += '<td>' + i.DataValue + '</td>';
                row += '<td>' + i.DateTime + '</td>';
                row += '</tr>';
                $('#pending_points_table').append(row);
            }
        }
    });
}

    $('#Accept1').click(function() {
        let query ;
        let selected_row = $("input:checked").closest('tr');
        for (r of selected_row) {
            var date = r.cells[4].innerHTML.toString();
            date.replace(/T/g, " ");
            date.replace(/Z/g, "");
            query = "UPDATE DATA_POINT\n" +
            "SET `Accepted` = 1\n" +
            "WHERE `LocationName` = '" + r.cells[1].innerHTML + "'\n" +
            "AND `DateTime` = '" + date + "';";

            console.log(query);
            connection.query(query, function (error, results, fields) {
                if (error) throw error;
                else {console.log(results)};
            })
        }
        window.location = "PendingDataPoint.html;"
    });

    $('#Reject1').click(function() {
        let query ;
        let selected_row = $("input:checked").closest('tr');
        for (r of selected_row) {
            var date = r.cells[4].innerHTML.toString();
            date.replace(/T/g, " ");
            date.replace(/Z/g, "");
            query = "UPDATE DATA_POINT\n" +
                "SET `Accepted` = 0\n" +
                "WHERE `LocationName` = '" + r.cells[1].innerHTML + "'\n" +
                "AND `DateTime` = '" + date + "';";

            console.log(query);
            connection.query(query, function (error, results, fields) {
                if (error) throw error;
                else {console.log(results)};
            })
        }
        window.location = "PendingDataPoint.html;"
    });

    $('#Accept2').click(function() {
        console.log("clicked");
        let query ;
        let selected_row = $("input:checked").closest('tr');
        for (r of selected_row) {
            query = "UPDATE CITY_OFFICIAL\n" +
                "SET `approved` = 1\n" +
                "WHERE `username` = '" + r.cells[1].innerHTML + "';";

            console.log(query);
            connection.query(query, function (error, results, fields) {
                if (error) throw error;
                else {console.log(results)};
            })
        }
        window.location = "PendingCOFAccount.html"
    });

    $('#Reject2').click(function() {
        let query ;
        let selected_row = $("input:checked").closest('tr');
        for (r of selected_row) {
            query = "UPDATE CITY_OFFICIAL\n" +
                "SET `approved` = 0\n" +
                "WHERE `username` = '" + r.cells[1].innerHTML + "';";

            console.log(query);
            connection.query(query, function (error, results, fields) {
                if (error) throw error;
                else {console.log(results)};
            })
        }
        window.location = "PendingCOFAccount.html"
    });

    function getPOIReport() {
        let rows = [];
        let row;
        let query = "SELECT p.LocationName, q.City, q.State, MIN( p.Mold ) AS MoldMin, AVG( p.Mold ) AS MoldAvg, MAX( p.Mold ) AS MoldMax, MIN( p.AQ ) AS AQMin, AVG( p.AQ ) AS AQAvg, MAX( p.AQ ) AS AQMax, COUNT( p.LocationName ) AS num_points, CASE Max(p.Flag)\n"+
        "WHEN 1 THEN 'Yes'\n" +
        "ELSE 'No' END as Flagged\n" +
        "FROM (\n"+
        "    SELECT * ,\n" +
        "    CASE WHEN TYPE = 'Mold'\n" +
        "THEN DataValue\n" +
        "END AS  'Mold',\n" +
            "CASE WHEN TYPE = 'Air Quality'\n" +
        "THEN DataValue\n" +
        "END AS 'AQ'\n" +
        "FROM DATA_POINT\n"+
        ") AS p\n"+
        "    LEFT JOIN POI AS q ON p.LocationName = q.LocationName\n"+
        "    GROUP BY p.LocationName;";
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            else {
                for (result of results) {
                    row = []
                    row.push(result.LocationName);
                    row.push(result.City);
                    row.push(result.State);
                    row.push(result.MoldMin);
                    row.push(result.MoldAvg);
                    row.push(result.MoldMax);
                    row.push(result.AQMin);
                    row.push(result.AQAvg);
                    row.push(result.AQMax);
                    row.push(result.num_points);
                    row.push(result.Flagged);
                    rows.push(row);
                }
                $('#POIReport').DataTable({
                    data:rows
                });
            };
        });


    }



 /*  $('#apply1').click(function() {
       let POIlocation = $('#POILN').val();
       let city = $('#city').val();
       let state = $('#state').val();
       let zipcode = $('#zipcode').val();
       let date1 = $('#date1').val();
       let date2 = $('#date2').val();
       //let selected_flag = $("input:checked").closest('p');
       //This block of code when you want to perfrom a query-------------------------------------------------------------------
       let query = "SELECT * FROM POI as p\n" +
               "WHERE p.LocationName = a.Name\n'" + POIlocation + "\'\n" +
               "AND p.city = a_city\'" + city + "\'\n" +
               "AND p.state = a_state\'" + state + "\'\n" +
               "AND p.zipcode = a_zip\'" + zipcode + "\'\n" +
               "AND p.DateFlagged BETWEEN 'min_val' and 'max_val' \'" + "\';";
       console.log("sending query...\n" + query);
       connection.query(query, function (error, results, fields) {
        if (error) throw error;
        else {console.log(results)};
        for (r of selected_row) {
            query = "UPDATE CITY_OFFICIAL\n" +
                "SET `approved` = 1\n" +
                "WHERE `username` = '" + r.cells[1].innerHTML + "';";

            console.log(query);
            connection.query(query, function (error, results, fields) {
                if (error) throw error;
                else {console.log(results)};
            })
        }
        window.location = "viewPOIs.html"
    }); */

    function viewPOIs() {
        let row;
        let query = "SELECT * FROM CITY_STATE\n";
        console.log("sending query...\n" + query);
        connection.query(query, function (error, results, fields) {
            if (error) throw error;
            if(results.length == 0) {
                alert("No pending officials found.");
            } else {
                for(i of results) {
                    row = '<select>'
                    row += '<option>' + i.state + '</td>';
                    row += '</select>';
                    $('#state2').append(row);

                }
                console.log(results);
            }
        });
    }