'use strict';
const report = require('../models/report');
var record = [];
exports.reports=(rapidID) =>{
 return    new Promise((resolve, reject) => {

        report.find({
            "rapidID":rapidID
        })
        .then((reports) =>{
            console.log("report",reports)
            for(let i=0;i<reports.length;i++){
              record.push(reports[i]._doc.profileObj)
              console.log(record)
                            }
        })
        .then(() =>resolve({

           
                status: 201,
                message:record
            }))
       

            .catch(err => {

                    reject({
                        status: 500,
                        message: 'Internal Server Error !'
                    });
            });

        })
    }