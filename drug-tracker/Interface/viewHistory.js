'use strict';

/**
 * This is a Node.JS application to view the history of the drug asset on the network.
 */

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const helper = require('./contractHelper');

//This is the main function of the module which calls the smart contract function
async function main(drugName, serialNo, organization) {
	try {
		const pharmanetContract = await helper.getContractInstance(organization);
		// Update a shipment 
		console.log('.....The History of the Drug is as follows');
		const historyBuffer = await pharmanetContract.submitTransaction('viewHistory', drugName, serialNo);
		// process response
		console.log('.....Processing the request \n\n');
		let historyObject = JSON.parse(historyBuffer.toString());
		console.log(historyObject);
		console.log('\n\n....Drug history successfully displayed!');
		return historyObject;
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