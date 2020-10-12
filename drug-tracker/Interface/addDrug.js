'use strict';

/**
 * This is a Node.JS application to add a new Drug on the network.
 */

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const helper = require('./contractHelper');

//This is the main function of the module which calls the smart contract function
async function main(drugName, serialNo, mfgDate, expDate, companyCRN, organization) {
	try {
		const pharmanetContract = await helper.getContractInstance(organization);
		// Create a new Drug
		console.log('.....Create a new Drug');
		const drugBuffer = await pharmanetContract.submitTransaction('addDrug', drugName, serialNo, mfgDate, expDate, companyCRN);
		// process response
		console.log('.....Processing Create Drug Transaction Response \n\n');
		let newDrug = JSON.parse(drugBuffer.toString());
		console.log(newDrug);
		console.log('\n\n.....Create Drug Transaction Complete!');
		return newDrug;
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