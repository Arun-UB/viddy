module.exports = function () {
    'use strict';
    /*var mongoose = require('mongoose');
    var connectionString = 'mongodb://localhost/viddy';
    if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }
     mongoose.connect(connectionString);*/
    var firebase = require('firebase');
    firebase.initializeApp({
        serviceAccount: process.env.FIREBASE_KEYS,
        databaseURL: 'https://viddy-3d0f0.firebaseio.com'
    });
    // As an admin, the app has access to read and write all data, regardless of Security Rules
    var db = firebase.database();
    var ref = db.ref('/user');
    ref.once('value', function (snapshot) {
        console.log(snapshot.val());
    });

    var models = {
        userModel: require('./user/user.model')(),
        postModel: require('./post/post.model')(),
        commentModel: require('./comment/comment.model')(),
    };
    return models;
};