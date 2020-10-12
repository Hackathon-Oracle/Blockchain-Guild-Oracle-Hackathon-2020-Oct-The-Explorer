'use strict';

/**
 * This is a Node.JS application to Query the Drug details on the network.
 */

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const helper = require('./contractHelper');
let gateway;

//This is the main function of the module which calls the smart contract function
async function main(drugName, serialNo, organisationRole) {
	try {
		const pharmanetContract = await helper.getContractInstance(organisationRole);
		// Fetch drug Details
		console.log('.....Fetching the drug details');
		const drugBuffer = await pharmanetContract.submitTransaction('viewDrugCurrentState', drugName, serialNo);
		// process response
		console.log('.....Processing get drug details Response \n\n');
		let drugObject = JSON.parse(drugBuffer.toString());
		console.log(drugObject);
		console.log('\n\n.....Fetched the drug details successfully!');
		return drugObject;
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