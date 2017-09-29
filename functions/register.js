'use strict';


const user = require('../models/user');

exports.registerUser = (registerObj,Email,Password,Type,nem_id,rapidID,privateKey,otp,encodedMail) =>

    new Promise((resolve, reject) => {
    
 

        const newUser = new user({
           registerObj: registerObj,
           nem_id:nem_id,
           Email:Email,
           Password:Password,
           Type:Type,
           rapidID :rapidID,
           privateKey:privateKey,
           otp:otp,
           encodedMail:encodedMail,
          created_at: new Date(),
           });
      
        newUser.save()




            .then(() => resolve({
                status: 201,
                message: 'please verify your mobile no and email id!'
            }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({
                        status: 409,
                        message: 'User Already Registered !'
                    });

                } else {

                    reject({
                        status: 500,
                        message: 'Internal Server Error !'
                    });
                }
            });
    });
    