const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

// Import all function modules
const addToWallet = require('./addToWallet');
const registerCompany = require('./registerCompany');
const addDrug = require('./addDrug');
const viewDrugCurrentState = require('./viewDrugCurrentState');
const createPO = require('./createPO');
const createShipment = require('./createShipment');
const updateShipment = require('./updateShipment');
const retailDrug = require('./retailDrug');
const viewHistory = require('./viewHistory');

// Define Express app settings
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('title', 'Pharmacy App');

//The api to display the message for the endpoint
app.get('/', (req, res) => res.send('Welcome to Pharmanet'));

//This api is to call the addToWallet module to add the certifiactes for accessing the functions
app.post('/addToWallet', (req, res) => {
	addToWallet.execute(req.body.certificatePath, req.body.privateKeyPath, req.body.organization)
		.then(() => {
			console.log('User credentials added to wallet');
			const result = {
				status: 'success',
				message: 'User credentials added to wallet'
			};
			res.json(result);
		})
		.catch((e) => {
			const result = {
				status: 'error',
				message: 'Failed',
				error: e
			};
			res.status(500).send(result);
		});
});

//post api request to call the registerCompany module to register a new organization
app.post('/registerCompany', (req, res) => {
	registerCompany.execute(req.body.companyCRN,
		req.body.companyName,
		req.body.location,
		req.body.organisationRole,
		req.body.organisationName)
		.then((newCompany) => {
			console.log('New Company created');
			const result = {
				status: 'success',
				message: 'New Company created',
				newCompany: newCompany
			};
			res.json(result);
		})
		.catch((e) => {
			const result = {
				status: 'error',
				message: 'Failed',
				error: e
			};
			res.status(500).send(result);
		});
});

//post request to call addDrug module to post the drug details in blockchain
app.post('/addDrug', (req, res) => {
	addDrug.execute(req.body.drugName, req.body.serialNo, req.body.mfgDate, req.body.expDate, req.body.companyCRN, req.body.organization)
		.then((drug) => {
			console.log('New Drug is created');
			const result = {
				status: 'success',
				message: 'New Drug is registered on the Network',
				drug: drug
			};
			res.json(result);
		})
		.catch((e) => {
			const result = {
				status: 'error',
				message: '"Only registered Manufacturer can add the drug"',
			};
			res.json(result);
		});
});

//post request to add the purchase order details in blockchain
app.post('/createPO', (req, res) => {
	createPO.execute(req.body.buyerCRN,
		req.body.sellerCRN,
		req.body.drugName,
		req.body.quantity,
		req.body.organization)
		.then((createPO) => {
			const result = {
				createPO: createPO
			};
			res.json(result);
		})
		.catch((e) => {
			console.log("the error received is " + e);
			const result = {
				status: 'error',
				message: 'Failed',
				error: e
			};
			res.status(500).send(result);
		});
});

//post request to add the shipment details in blockchain
app.post('/createShipment', (req, res) => {
	createShipment.execute(req.body.buyerCRN,
		req.body.drugName,
		req.body.listOfAssets,
		req.body.transporterCRN,
		req.body.organization)
		.then((createShipment) => {
			const result = {
				createShipment: createShipment
			};
			res.json(result);
		})
		.catch((e) => {
			const result = {
				status: 'error',
				message: 'Failed',
				error: e
			};
			res.status(500).send(result);
		});
});

//post request to update shipment details in blockchain
app.post('/updateShipment', (req, res) => {
	updateShipment.execute(req.body.buyerCRN,
		req.body.drugName,
		req.body.transporterCRN,
		req.body.organization)
		.then((updateShipment) => {
			const result = {
				updateShipment: updateShipment
			};
			res.json(result);
		})
		.catch((e) => {
			const result = {
				status: 'error',
				message: 'Failed',
				error: e
			};
			res.status(500).send(result);
		});
});

//get request to get the current state of a drug from blockchain
app.get('/viewDrugCurrentState', (req, res) => {
	viewDrugCurrentState.execute(req.body.name, req.body.serialNo, req.body.organization)
		.then((currentDrugState) => {
			const result = {
				currentState: currentDrugState
			};
			res.json(result);
		})
		.catch((e) => {
			const result = {
				status: 'error',
				message: 'Failed',
				error: e
			};
			res.status(500).send(result);
		});
});

//post request to add the drug sold by retailer into the blockchain
app.post('/retailDrug', (req, res) => {
	retailDrug.execute(req.body.drugName, req.body.serialNo, req.body.retailerCRN, req.body.customerAadhar, req.body.organization)
		.then((retailDrug) => {
			const result = {
				retailDrug: retailDrug
			};
			res.json(result);
		})
		.catch((e) => {
			const result = {
				status: 'error',
				message: 'Failed',
				error: e
			};
			res.status(500).send(result);
		});
});

//get request to get the history of the drug assert  from blockchain
app.get('/viewHistory', (req, res) => {
	viewHistory.execute(req.body.drugName, req.body.serialNo, req.body.organization)
		.then((getHistory) => {
			console.log('Drug history details');
			const result = {
				getHistory: getHistory
			};
			res.json(result);
		})
		.catch((e) => {
			const result = {
				status: 'error',
				message: 'Failed',
				error: e
			};
			res.status(500).send(result);
		});
});

app.listen(port, () => console.log(`Distributed Pharmanet App listening on port ${port}!`));