/**This is teh helper file created for getCintractInstance whick is used in all
modules while gettig the instance of teh smart contract*/

const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');
let gateway;

//This function helps to get access to the smart contract installed.
async function getContractInstance(organisationName) {
	//To retrieve the lower and the upper case value.
	const lowerCaseParam = organisationName.toLowerCase();
	const upperCaseParam = organisationName.toUpperCase();
	// A gateway defines which peer is used to access Fabric network
	// It uses a common connection profile (CCP) to connect to a Fabric Peer
	gateway = new Gateway();
	// A wallet is where the credentials to be used for this transaction exist
	// Credentials for user ORGANIZATION_ADMIN was initially added to this wallet.
	const wallet = new FileSystemWallet(`./identity/${lowerCaseParam}`);
	// What is the username of this Client user accessing the network?
	const fabricUserName = `${upperCaseParam}_ADMIN`;
	// Load connection profile; will be used to locate a gateway; The CCP is converted from YAML to JSON.
	let connectionProfile = yaml.safeLoad(fs.readFileSync(`./connection-profile-${lowerCaseParam}.yaml`, 'utf8'));
	// Set connection options; identity and wallet
	let connectionOptions = {
		wallet: wallet,
		identity: fabricUserName,
		discovery: { enabled: false, asLocalhost: true }
	};

	// Connect to gateway using specified parameters
	console.log('.....Connecting to Fabric Gateway');
	await gateway.connect(connectionProfile, connectionOptions);
	// Access certification channel
	console.log('.....Connecting to channel - pharmachannel');
	const channel = await gateway.getNetwork('pharmachannel');
	// Get instance of deployed Certnet contract
	// @param Name of chaincode
	// @param Name of smart contract
	console.log('.....Connecting to Pharmanet Smart Contract');
	return channel.getContract('pharmanet', 'org.pharma-network.pharmanet');
}

function disconnect() {
	console.log('.....Disconnecting from Fabric Gateway');
	gateway.disconnect();
}

module.exports.getContractInstance = getContractInstance;
module.exports.disconnect = disconnect;