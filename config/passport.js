const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const db = require('../database/schema')
const passport = require('passport');

const google_strat = require('passport-google-oauth20');

passport.use(new LocalStrategy(
    function (username, password, done) {
        db.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));




passport.use(new google_strat({
    callbackURL: "/homepage/",
    clientID: "621875633743-fc6eer3mcrf85ch4ssj3mo6gh1nmt2mi.apps.googleusercontent.com",
    clientSecret: "cOIVP-BSK9A5OK0fot0MiGsu"

}
    , (accessstoken, refreshtoken, profile, done) => {

        const data = {
            username: profile.displayName,
            email: "googleuser",
            password: profile.id,
            confirm_password: profile.id
        }

        db.findOne({ username: data.username }).then((database) => {
            if (database) {
                done(null, database)
            }
            else {
                db.create(data).then(() => {
                    done(null, data)
                })


                    .catch((err) => {
                        console.log(err);
                    })
            }
        })
            .catch((err) => {
                console.log(err);
            })


    })
)


