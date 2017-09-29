'use strict';

const user = require('../models/user');

exports.phoneverification = (otp, phone) => {

    return new Promise((resolve, reject) => {

        console.log(phone)
        user.findOneAndUpdate({
            otp: otp
        }, {
            $push: {
                status: "phone"
            }
        }, {new: true}).then((users) => {
            console.log(users)
            let userPhone = users._doc.registerObj.Phone;
            if (userPhone === phone) 
                resolve({status: 201, usr: users,message:"otp verified"})
            else 
                resolve({status: 402, message: "not a valid phone no"})

        }).catch(err => {

            if (err.code == 11000) {

                return reject({status: 409, message: 'cant fetch !'});

            } else {
                console.log("error occurred" + err);

                return reject({status: 500, message: 'Please enter a valid otp'});
            }
        })
    })
};
