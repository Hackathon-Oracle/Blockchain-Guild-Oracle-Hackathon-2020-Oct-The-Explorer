'use strict';

/**
 * This is a Node.JS application to update the current shipment details on the network.
 */
const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const helper = require('./contractHelper');

//This is the main function of the module which calls the smart contract function
async function main(buyerCRN, drugName, transporterCRN,organization) {
	try {
		const pharmanetContract = await helper.getContractInstance(organization);
		// Update a shipment 
		console.log('.....Update Shipment');
		const shipmentBuffer = await pharmanetContract.submitTransaction('updateShipment',buyerCRN, drugName, transporterCRN);
		// process response
		console.log('.....Processing Update Shipment Transaction Response \n\n');
		let newShipment = JSON.parse(shipmentBuffer.toString());
		console.log(newShipment);
		console.log('\n\n....Update Shipment Transaction Complete!');
		return newShipment;
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