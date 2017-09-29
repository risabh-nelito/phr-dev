'use strict';

const user = require('../models/user');

exports.loginUser = (Email, Password) =>

    new Promise((resolve, reject) => {



        user.find({
                "Email": Email
            })
            .then(users => {

                const dbpin = users[0].Password;

                if (String(Password) === String(dbpin)) {

                    resolve({
                        status: 200,
                        users: users[0]
                    });

                } else {

                    reject({
                        status: 402,
                        message: ' email or password wrong!'
                    });
                }
            })

            .then(users => {
                console.log(users)
                console.log(users.length == 0)
                if (users.length == 0) {

                    reject({
                        status: 404,
                        message: 'User Not Found !'
                    });

                } else {

                    return users[0];

                }
            })


            .catch(err => reject({
                status: 500,
                message: 'internal server error!'
            }));


    });