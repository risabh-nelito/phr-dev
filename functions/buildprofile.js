'use strict';
const user = require('../models/user');
const report = require('../models/report');
var nem = require("nem-sdk").default;


exports.dotx =(rAddress,address,profileObj,password,privateKey,referenceid,rapidID) =>{
 return    new Promise((resolve, reject) => {
     console.log("rapidID",rapidID);
        // Create an NIS endpoint object
var endpoint =nem.model.objects.create("endpoint")("http://b1.nem.foundation", "7895");

// Create a common object holding key
var common = nem.model.objects.create("common")(password,privateKey);

// Create an un-prepared transfer transaction object
var transferTransaction = nem.model.objects.create("transferTransaction")(rAddress, 0,referenceid );

// Prepare the transfer transaction object
var transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.mijin.id);

//Serialize transfer transaction and announce
    nem.model.transactions.send(common, transactionEntity, endpoint)
    .then(function(res) {
    
            const newReport = new report({
                
                  profileObj : profileObj,
                  rapidID: rapidID,
                  referenceid : referenceid,
                  created_at: new Date(),
                });
              
                newReport.save()
                console.log(newReport)
            })
    
            .then(() => resolve({
                status: 201,
                message: 'profile building completed Sucessfully !'
            }))

            .catch(err => {

                    reject({
                        status: 500,
                        message: 'Internal Server Error !'
                    });
            });

        })
    }