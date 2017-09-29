'use strict';
const user = require('../models/user');

exports.edit=(FirstName,LastName,Address) =>{
 return    new Promise((resolve, reject) => {

        user.findOneAndUpdate({
            "rapidID":rapidID
        }, {
            $push: {
                "registerObj.FirstName": Firstname
            }
        })
        .then((users) =>{
            console.log(users)
        })
            .then(() => resolve({
                status: 201,
                message: 'profile edited completed Sucessfully !'
            }))

            .catch(err => {

                    reject({
                        status: 500,
                        message: 'Internal Server Error !'
                    });
            });

        })
    }