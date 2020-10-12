'use strict';

/**
 * This is a Node.JS application to add a Purchase Order on the network.
 */

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const helper = require('./contractHelper');

//This is the main function of the module which calls the smart contract function
async function main(buyerCRN, sellerCRN, drugName, quantity, organization) {
	try {
		const pharmanetContract = await helper.getContractInstance(organization);
		// Create a new Purchase Order
		console.log('.....Create a new Purchase Order');
		const poBuffer = await pharmanetContract.submitTransaction('createPO', buyerCRN, sellerCRN, drugName, quantity);
		// process response
		console.log('.....Processing Purchase Order Transaction Response \n\n');
		let newPO = JSON.parse(poBuffer.toString());
		console.log(newPO);
		console.log('\n\n.....Purchase Order Transaction Complete!');
		return newPO;
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