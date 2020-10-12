'use strict';

/**
 * This is a Node.JS application to sell the Drug by retailers to consumers on the network.
 */

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const helper = require('./contractHelper');

//This is the main function of the module which calls the smart contract function
async function main(drugName, serialNo, retailerCRN, customerAadhar, organization) {
	try {
		const pharmanetContract = await helper.getContractInstance(organization);
		// Update a shipment 
		console.log('.....Selling drugs by Retailer');
		const retailDrugBuffer = await pharmanetContract.submitTransaction('retailDrug', drugName, serialNo, retailerCRN, customerAadhar);
		// process response
		console.log('.....Processing the request \n\n');
		let retailDrugObject = JSON.parse(retailDrugBuffer.toString());
		console.log(retailDrugObject);
		console.log('\n\n....Drug successfully sold to the customer!');
		return retailDrugObject;
	} catch (error) {
		console.log(`\n\n ${error} \n\n`);
		throw new Error(error);
	} finally {
		// Disconnect from the fabric gateway
		console.log('.....Disconnecting from Fabric Gateway');
		helper.disconnect();
	}
}

module.exports.execute = main;