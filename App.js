var express = require("express");
var mysql = require("mysql");
var bodyParser = require('body-parser')

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }))



var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_js",
});

con.connect();

app.get('/ejs', function (req, res) {

    var select_query = "select * from todo_table where status NOT in('decline' , 'completed')";

    con.query(select_query, function (error, result, field) {
        if (error) throw error;
        res.render("index", { result });
    })

});

app.post('/ejs', function (req, res) {


    var name = req.body.name;

    var insert_query = "insert into todo_table(name)values('" + name + "')";

    con.query(insert_query, function (error, result, field) {
        if (error) throw error;
        res.redirect("/ejs");
    })
});
app.post('/up/:id', function (req, res) {

    var id = req.params.id;
    
    var id = req.body.id;
    var name = req.body.name;

    var update_query = "update todo_table set name = '" + name + "' where id = '" + id + "' ";

    console.log(id);

    con.query(update_query, function (error, result, field) {
        if (error) throw error;
        res.redirect("/ejs");
    })
});


app.get('/delete/:id', function (req, res) {

    var id = req.params.id;

    var delete_query = "delete from todo_table where id = " + id;

    con.query(delete_query, function (error, result, field) {
        if (error) throw error;
        res.redirect('/ejs');
    })
});

app.get('/edit/:id', function (req, res) {
    var id = req.params.id;

    var edit_query = "select * from todo_table where id = " + id;

    con.query(edit_query, function (error, result, field) {
        if (error) throw error;
        res.render("form", { result });

    })
});
// ....................................

app.get('/decline/:id', function (req, res) {
    var id = req.params.id;

    var edit_query = "update todo_table set status='Decline' where id = " + id;

    con.query(edit_query, function (error, result, field) {
        if (error) throw error;
        res.redirect('/ejs');

    })
});
app.get('/running/:id', function (req, res) {
    var id = req.params.id;

    var edit_query = "update todo_table set status='running' where id = " + id;

    con.query(edit_query, function (error, result, field) {
        if (error) throw error;
        res.redirect('/ejs');

    })
});
app.get('/pending/:id', function (req, res) {
    var id = req.params.id;

    var edit_query = "update todo_table set status='pending' where id = " + id;

    con.query(edit_query, function (error, result, field) {
        if (error) throw error;
        res.redirect('/ejs');

    })
});
app.get('/completed/:id', function (req, res) {
    var id = req.params.id;

    var edit_query = "update todo_table set status='completed' where id = " + id;

    con.query(edit_query, function (error, result, field) {
        if (error) throw error;
        res.redirect('/ejs');

    })
});

app.get('/viewall', function (req, res) {

    var viewall_query = "select * from todo_table";

    con.query(viewall_query, function (error, result, field) {
        if (error) throw error;
        res.render("viewall", {result});

    })
});
app.get('/declinetask', function (req, res) {

    var viewall_query = "select * from todo_table where status = 'decline'";

    con.query(viewall_query, function (error, result, field) {
        if (error) throw error;
        res.render("decline", {result});

    })
});
app.get('/runningtask', function (req, res) {

    var viewall_query = "select * from todo_table where status = 'running'";

    con.query(viewall_query, function (error, result, field) {
        if (error) throw error;
        res.render("running", {result});

    })
});
app.get('/pendingtask', function (req, res) {

    var viewall_query = "select * from todo_table where status = 'pending'";

    con.query(viewall_query, function (error, result, field) {
        if (error) throw error;
        res.render("pending", {result});

    })
});
app.get('/completedtask', function (req, res) {

    var viewall_query = "select * from todo_table where status = 'completed'";

    con.query(viewall_query, function (error, result, field) {
        if (error) throw error;
        res.render("completed", {result});

    })
});




app.listen(3000);