
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const body_parser = require("body-parser");
const session = require('express-session');
const passport = require('passport');
const mongo = require('mongoose');
const url = require('./database/key').url;


app.set("view engine", "ejs");
app.use(body_parser.urlencoded({ extended: true }));


mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("the database is connected successfully...");
}).catch(err => {
    console.log(err);
})
app.use(passport.initialize());
app.use(passport.session());





app.use(express.static(path.join(__dirname, 'public')));
app.use("/bookmytaxi", require('./routes/homepage'));
app.use("/bookmytaxi/auth", require('./routes/authentication'))

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
    if (err) console.log(err);
    else console.log("server is running on 5000..........");
})
