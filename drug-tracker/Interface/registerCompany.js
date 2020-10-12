'use strict';

/**
 * This is a Node.JS application to Register a new Company on the network.
 */

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
const helper = require('./contractHelper');

//This is the main function of the module which calls the smart contract function
async function main(companyCRN, companyName, location, organisationRole, organisationName) {
	try {
		const pharmanetContract = await helper.getContractInstance(organisationName);
		// Create a new Organization
		console.log('.....Create a new Organization');
		const companyBuffer = await pharmanetContract.submitTransaction('registerCompany', companyCRN, companyName, location, organisationRole);
		// process response
		console.log('.....Processing Register Company Transaction Response \n\n');
		let newCompany = JSON.parse(companyBuffer.toString());
		console.log(newCompany);
		console.log('\n\n.....Register Company Transaction Complete!');
		return newCompany;
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