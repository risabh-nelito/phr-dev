'use strict';


const user = require('../models/user');
const report = require('../models/report');

const nem = require("nem-sdk").default;
var decoded= [];
exports.getProfile = ((address) =>{

   return new Promise((resolve, reject) => {
       // create an endpoint
        var endpoint =nem.model.objects.create("endpoint")("http://b1.nem.foundation", "7895");
      //call for getting account data of a particular user
        nem.com.requests.account.transactions.all(endpoint, address)
        .then(function(res) {
	console.log("\nAll transactions of the account:");
	for (let i=0;i<res.data.length;i++){
		if(!res.data[i].transaction.message)
			{
    console.log("error");
	}
	else{
		var message= (res.data[i].transaction.message.payload);
      decoded.push(nem.utils.format.hexToUtf8(message));
	    console.log(decoded)
		
		report.find({"referenceid":decoded})

		.then(reports => {
		
			if(reports.length!=0){

			resolve({
                        status: 200,
                        reports: reports
                    });

                 }else {

                    reject({
                        status: 402,
                        message: 'profile not built yet'
                    });
                }
            })

            
            .catch(err => reject({
                status: 500,
                message: 'internal server error!'
            }));

	}
	}
}, function(err) {
	console.error(err);
});
   })
});