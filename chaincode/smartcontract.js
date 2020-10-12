"use strict";

const { Contract, Context } = require("fabric-contract-api");
const clientIdentity = require('fabric-shim').ClientIdentity;

//Importing the files from List and model folder
const Company = require('./library/model/Company.js');
const Drug = require("./library/model/Drug.js");
const PO = require("./library/model/PO.js");
const Shipment = require("./library/model/Shipment.js");
const CompanyList = require("./library/list/CompanyList.js");
const DrugList = require("./library/list/DrugList.js");
const POList = require("./library/list/POList.js");
const ShipmentList = require("./library/list/ShipmentList.js");

//Creating a map to story the organizational values with Hierarchy
const list = new Map();
list.set('manufacturer', 1);
list.set('distributor', 2);
list.set('retailer', 3);

//Context class extended to override the creation of context
class SmartContext extends Context {
  constructor() {
    super();
    // Add various model lists to the context class object
    // this : the context instance
    this.companyList = new CompanyList(this);
    this.drugList = new DrugList(this);
    this.poList = new POList(this);
    this.shipmentList = new ShipmentList(this);
  }
}

//Smart Contract class with all the functions
class SmartContract extends Contract {
  constructor() {
    //Custom name to refer the Smart Contract
    super("org.pharma-network.pharmanet");
  }

  // Built in method used to build and return the context for this smart contract on every transaction invoke
  createContext() {
    return new SmartContext();
  }

  /* * All custom functions are defined below ** */
  // This is a basic user defined function used at the time of instantiating the smart contract
  // to print the success message on console
  async instantiate(ctx) {
    console.log("Smart Contract Instantiated");
  }

  /**
   * Create a new Request for registartion of Company on the network
   * @param ctx - The transaction context object
   * @param companyCRN - Company registration Number to be registered on the network
   * @param companyName - Name of the company
   * @param location - Location of the company
   * @param organisationRole - Role of the company
   * @returns-returns the request object in Jason format
   */
  async registerCompany(ctx, companyCRN, companyName, location, organisationRole) {
    //Create a new Rquest object to add in the Blockchain
    organisationRole = organisationRole.toLowerCase();
    let registerCompany = {
      companyId: {
        companyCRN: companyCRN,
        companyName: companyName
      },
      name: companyName,
      location: location,
      organisationRole: organisationRole,
      hierarchyKey: list.get(organisationRole)
    };
    //Create the instance of the model class to save it to blockchain
    let requestObject = Company.createInstance(registerCompany);
    await ctx.companyList.addCompany(requestObject);
    //returns the Jason object
    return requestObject;
  }

  /**
   * Function to retrieve the array with partial composite key
   * @param ctx - The transaction context object
   * @param indexName - index against which the database needs to be queried
   * @param partialKey - key against which the database needs to be queried
   * @returns-returns the array
   */
  async getPartialKeyArray(ctx, indexName, partialKey) {
    //Calling ing the function with the partial key and storing the iterator
    let iterator = await ctx.stub.getStateByPartialCompositeKey(indexName, [partialKey]);
    //declaring an empty array
    let array = [];
    //while condtion to iterate over the itertaor
    while (true) {
      var data = await iterator.next();
      //If iterator has a value
      if (data.value) {
        array.push(data.value.value.toString('utf8'));
      }
      if (data.done) {
        await iterator.close();
        //return array
        return array;
      }
    }
  }

  /**
   * Create a new Request to add drug on the network
   * @param ctx - The transaction context object
   * @param drugName - Drug name to be registered on the network
   * @param serialNo - Serial Number of the drug
   * @param mfgDate - manufacturing date of the drug
   * @param expDate - expiry date of the drug
   * @param companyCRN - Company serail number
   * @returns-returns the request object in Jason format
   */
  async addDrug(ctx, drugName, serialNo, mfgDate, expDate, companyCRN) {
    //Verifying the identity of the function caller
    let verifyManufacturer = ctx.clientIdentity.getMSPID();
    let arrayList = await this.getPartialKeyArray(ctx, 'org.pharma-network.pharmanet.lists.company', companyCRN);
    //Verify if the function is called by registered manufacturer
    if (verifyManufacturer === 'manufacturerMSP' && arrayList.length !== 0) {
      //converting array into jason object
      let jasonObject = JSON.parse(arrayList[0]);
      let companyName = jasonObject.companyId.companyName;
      //Create a new Request to add it in the blockchain
      let drugObject = {
        productId: {
          drugName: drugName,
          serialNo: serialNo
        },
        name: drugName,
        manufacturer: {
          comapnyCRN: companyCRN,
          companyName: companyName
        },
        manufacturingDate: mfgDate,
        expiryDate: expDate,
        owner: companyCRN,
        shipment: "",
      };
      //Create the instance of the model class to save it to blockchain
      let drugObj = Drug.createInstance(drugObject);
      await ctx.drugList.addDrug(drugObj);
      //returns the Jason object
      return drugObj;
    }
  }

  /**
   * Create a new Request to create a PO on the network
   * @param ctx - The transaction context object
   * @param buyerCRN - Serial Number of the buyer
   * @param sellerCRN - Serial Number of the seller
   * @param drugName - name of the drug
   * @param quantity - Qunatity of the drug required
   * @returns-returns the request object in Jason format
   */
  async createPO(ctx, buyerCRN, sellerCRN, drugName, quantity) {
    let errorMessage;
    let verifyBuyerOrRetailer = ctx.clientIdentity.getMSPID();
    //Verify if the function is called by either Buyer or Retailer.
    if (verifyBuyerOrRetailer === 'distributorMSP' || verifyBuyerOrRetailer === 'retailerMSP') {
      //Retrieving the buyer and seller details in an Array.
      let buyerDetails = await this.getPartialKeyArray(ctx, 'org.pharma-network.pharmanet.lists.company', buyerCRN);
      let sellerDetails = await this.getPartialKeyArray(ctx, 'org.pharma-network.pharmanet.lists.company', sellerCRN);
      let drugDetails = await this.getPartialKeyArray(ctx, 'org.pharma-network.pharmanet.lists.drug', drugName);
      //verifying if the Buyer and  Seller and Drug are registered on the network
      if (buyerDetails.length !== 0 && sellerDetails.length !== 0 && drugDetails.length !== 0) {
        //converting the arrays into Json objects
        let buyerJsonObject = JSON.parse(buyerDetails[0]);
        let buyerName = buyerJsonObject.name;
        let sellerJsonObject = JSON.parse(sellerDetails[0]);
        let sellerName = sellerJsonObject.name;
        let buyerRole = buyerJsonObject.organisationRole;
        let sellerRole = sellerJsonObject.organisationRole;
        //Verifying the hirerachy of the Organisation
        if ((buyerRole === 'distributor' && sellerRole === 'manufacturer') || (buyerRole === 'retailer' && sellerRole === 'distributor')) {
          //Create a Request object to add the details of the PO on the blockchain
          let requestObject = {
            poId: {
              buyerCRN: buyerCRN,
              drugName: drugName
            },
            drugName: drugName,
            quantity: quantity,
            buyer: {
              buyerCRN: buyerCRN,
              buyerName: buyerName
            },
            seller: {
              sellerCRN: sellerCRN,
              sellerName: sellerName
            }
          };
          //Create the instance of the model class to save it to blockchain
          let poObj = PO.createInstance(requestObject);
          await ctx.poList.addPO(poObj);
          //returns the Jason object
          return poObj;
        } else {
          errorMessage = {
            message: 'Hierarchy of the organisation is not satisfied'
          }
          return errorMessage;
        }
      } else {
        errorMessage = {
          message: 'Please enter valid buyer and seller details'
        }
        return errorMessage;
      }
    } else {
      errorMessage = {
        message: 'Only Retailer or Distributor can create a Purchase Order'
      }
      return errorMessage;
    }
  }

  /**
   * Create a new Request to create a Shipment on the network
   * @param ctx - The transaction context object
   * @param buyerCRN - Serial Number of the buyer
   * @param drugName - name of the drug
   * @param listOfAssets - Qunatity of the Drug
   * @param transporterCRN -serial number of the transaporter
   * @returns-returns the request object in Jason format
   */
  async createShipment(ctx, buyerCRN, drugName, listOfAssets, transporterCRN) {
    /*Verify if all asserts are valid
     Retrieving the buyer,drug and transporter details in an Array.*/
    let errorMessage;
    let buyerDetails = await this.getPartialKeyArray(ctx, 'org.pharma-network.pharmanet.lists.company', buyerCRN);
    let transporterDetails = await this.getPartialKeyArray(ctx, 'org.pharma-network.pharmanet.lists.company', transporterCRN);
    let drugDetails = await this.getPartialKeyArray(ctx, 'org.pharma-network.pharmanet.lists.drug', drugName);
    if (buyerDetails.length !== 0 && transporterDetails.length !== 0 && drugDetails !== 0) {
      //This condition will verify the Buyer drug details against the PO
      let poKey = PO.makeKey([buyerCRN, drugName]);
      let poObject = await ctx.poList.getPO(poKey);
      //Verify if the function id invoked by the seller.
      let sellerCRN = poObject.seller.sellerCRN;
      let sellerName = poObject.seller.sellerName;
      let verifySeller = ctx.clientIdentity.getMSPID();
      let transporterObject = JSON.parse(transporterDetails);
      let transporterName = transporterObject.name;
      //The seller can only be manufacturer or distributor
      if (verifySeller === 'manufacturerMSP' || verifySeller === 'distributorMSP') {
        //Callling the function to get the serial number of the drug to be sent
        let arrayOfSerialNumber = await this.drugSerialNumberByOwner(ctx, drugDetails, listOfAssets, sellerCRN, poObject.drugName);        //Verify if the quantity mentioned in PO matches the listOfAsserts passed and also if the seller has enough stock
        if (poObject.quantity == listOfAssets && poObject.quantity == arrayOfSerialNumber.length) {
          //creating the shipment object
          let shipmentObject = {
            shipmentId: {
              buyerCRN: buyerCRN,
              drugName: drugName
            },
            creator: {
              sellerCRN: sellerCRN,
              sellerName: sellerName
            },
            assets: arrayOfSerialNumber,
            transporter: {
              transporterCRN: transporterCRN,
              transporterName: transporterName
            },
            status: 'in-transit'
          };
          //Create the instance of the model class to save it to blockchain
          let shipObj = Shipment.createInstance(shipmentObject);
          await ctx.shipmentList.addShipment(shipObj);
          //update the owner details of the drug
          await this.updateOwnerForShipment(ctx, shipObj, transporterCRN);
          //returns the Jason object
          return shipObj;
        } else {
          errorMessage = {
            message: 'The PO quantity doesnot match the list of asserts or seller doesnot have sufficient stock'
          }
          return errorMessage;
        }
      } else {
        errorMessage = {
          message: 'Only Manufacturer and distributor can create a shipment'
        }
        return errorMessage;
      }
    } else {
      errorMessage = {
        message: 'The assert details are mentioned incorrectly'
      }
      return errorMessage;
    }
  }

  /**
   * Function to retrieve the serial numbers of a drug belonging to a seller
   * @param ctx - The transaction context object
   * @param buyerCRN - Serial Number of the buyer
   * @param drugName - name of the drug
   * @param listOfAssets - Qunatity of the Drug
   * @param transporterCRN -serial number of the transaporter
   * @returns-returns the request object in Jason format
   */
  async drugSerialNumberByOwner(ctx, drugDetails, listOfAssets, sellerCRN, drugName) {
    //creating the map to store the serial numbers valid for the seller.
    let array = [];
    //Iterating over the array
    for (let i = 0; i < drugDetails.length; i++) {
      //converting the array to Json object
      let drugDetailsObject = JSON.parse(drugDetails[i]);
      //Retrieving all the drugs for which seller is the owner.
      if (drugDetailsObject.owner == sellerCRN && drugName == drugDetailsObject.name) {
        //creating the Json object to store the drugnames with the serial numbers
        let drug = {
          drugName: drugDetailsObject.name,
          serialNo: drugDetailsObject.productId.serialNo
        };
        //Storing all the serial numbers of the drug belonging to the seller  in a map
        array.push(drug);
      }
      if (array.length == listOfAssets) {
        //returning if we get the desired number of serial numbers
        return array;
      }
    }
    return array;
  }

  /**
   * Function to update the status of teh shipment to delivered
   * @param ctx - The transaction context object
   * @param buyerCRN - Serial Number of the buyer
   * @param drugName - name of the drug
   * @param transporterCRN -serial number of the transaporter
   * @returns-returns the request object in Jason format
   */
  async updateShipment(ctx, buyerCRN, drugName, transporterCRN) {
    //declaring error message variable
    let errorMessage;
    //Retrieve the details of the shipment to verify the transporter.
    let shipmentKey = Shipment.makeKey([buyerCRN, drugName]);
    let shipObject = await ctx.shipmentList.getShipment(shipmentKey);
    let shipTransporterCRN = shipObject.transporter.transporterCRN;
    let transporterIdentity=ctx.clientIdentity.getMSPID();
    //Verify the the serial number matches with the transporter of the Shipment
    if (shipTransporterCRN === transporterCRN && transporterIdentity==='transporterMSP') {
      //calling the UpdateOwner function to Update the Owner and shipments Details  of drug object in Blockchain
      await this.updateOwner(ctx, shipObject, buyerCRN);
      //Updating the shipment object and setting the status as delivered.
      shipObject.status = 'delivered';
      //Create the instance of the model class to save it to blockchain
      let obj = Shipment.createInstance(shipObject);
      await ctx.shipmentList.updateShipment(obj);
      //returns the Jason object
      return obj;
    } else {
      errorMessage = {
        message: 'Verify the Transporter details'
      }
      return errorMessage;
    }
  }

  /**
   * Function to update the owner and drug Object of the shipment to delivered
   * @param ctx - The transaction context object
   * @param shipmentObject -Object carrying the details of the shipment
   * @param buyerCRN - serial number of the buyer
   * @returns-returns the request object in Jason format
   */
  async updateOwner(ctx, shipmentObject, buyerCRN) {
    //create an empty array to store the list of all the assets
    var list = [];
    list = shipmentObject.assets;
  
    let drugObj;
    //Iterating over the array to retrieve the asserts
    for (var i = 0; i < list.length; i++) {
      //Making the key to retrive the details of the drug
      const drugkey = Drug.makeKey([list[i].drugName, list[i].serialNo]);
      drugObj = await ctx.drugList.getDrug(drugkey);
     //Adding the existing shipment lists 
     var shipmentArray = [];
     shipmentArray.push(drugObj.shipment);
      //create a json object to store the details
      let shipments = {
        buyerCRN: buyerCRN,
        drugName: drugObj.name
      };
      shipmentArray.push(shipments);
      drugObj.owner = buyerCRN;
      drugObj.shipment=shipmentArray;
      //Create the instance of the model class to save it to blockchain
      let obj = Drug.createInstance(drugObj);
       await ctx.drugList.updateDrug(obj);
    }
  }

  /**
   * Function to update the owner and drug Object of the shipment to delivered
   * @param ctx - The transaction context object
   * @param shipmentObject -Object carrying the details of the shipment
   * @param buyerCRN - serial number of the buyer
   * @returns-returns the request object in Jason format
   */
  async updateOwnerForShipment(ctx, shipmentObject, transporterCRN) {
    //create an empty array to store the list of all the assets
    var list = [];
    list = shipmentObject.assets;
    var shipmentArray = [];
    let obj;
    //Iterating over the array to retrieve the asserts
    for (var i = 0; i < list.length; i++) {
      //Making the key to retrive the details of the drug
      const drugkey = Drug.makeKey([list[i].drugName, list[i].serialNo]);
      let drugObj = await ctx.drugList.getDrug(drugkey);
      //updating the owner of the drug
      drugObj.owner = transporterCRN;
      //Create the instance of the model class to save it to blockchain
      let obj = Drug.createInstance(drugObj);
      await ctx.drugList.updateDrug(obj);
    }
  }

  /**
   * Function called by Retailer to sell the drugs to the Consumer
   * @param ctx - The transaction context object
   * @param drugName - name of the drug
   * @param serialNo - Serial Number of the drug
   * @param retailerCRN - Serial Number of the retailer
   * @param customerAadhar-Adhaar Number of the Customer
   * @returns-returns the request object in Jason format
   */
  async retailDrug(ctx, drugName, serialNo, retailerCRN, customerAadhar) {
    //declaring the eeror message variable
    let errorMessage;
    //Retrieve the details of the Retailer.
    let verifyRetailer = ctx.clientIdentity.getMSPID();
    let retailerDetails = await this.getPartialKeyArray(ctx, 'org.pharma-network.pharmanet.lists.company', retailerCRN);
    //Verify if the Retailer is calling the function.
    if (verifyRetailer === 'retailerMSP' && retailerDetails.length !== 0) {
      //Making the key to retrive the details of the drug
      const drugkey = Drug.makeKey([drugName, serialNo]);
      let drugObj = await ctx.drugList.getDrug(drugkey);
      //Verify if the Retailer is the owner of the drug
      if (drugObj.owner === retailerCRN) {
        //updating the owner of the drug after validation
        drugObj.owner = customerAadhar;
        //Create the instance of the model class to save it to blockchain
        let obj = Drug.createInstance(drugObj);
        await ctx.drugList.updateDrug(obj);
        return obj;
      } else {
        errorMessage = {
          message: 'The retailer is not the owner of the drug'
        }
        return errorMessage;
      }
    } else {
      errorMessage = {
        message: 'Only registered Retailer is permitted to sell the drugs to Consumers'
      }
      return errorMessage;
    }
  }

  /**
   * Function is called to View the history related to the Drug assert
   * @param ctx - The transaction context object
   * @param drugName - name of the drug
   * @param serialNo - Serial Number of the drug
   * @returns-returns the request object in Jason format
   */
  async viewHistory(ctx, drugName, serialNo) {
    //Making the key to retrive the details of the drug
    const drugKey = await ctx.stub.createCompositeKey('org.pharma-network.pharmanet.lists.drug', [drugName, serialNo]);
    let historyResult = await ctx.stub.getHistoryForKey(drugKey).catch(err => console.log(err));
    //declaring an empty array
    let array = [];
    //while condtion to iterate over the itertaor
    while (true) {
      var data = await historyResult.next();
      //If iterator has a value
      if (data.value) {
        let historyResultObject = {
          transactionId: data.value.tx_id,
          history: data.value.value.toString('utf8')
        };
        array.push(historyResultObject);
      }
      if (data.done) {
        await historyResult.close();
        //return array
        return array;
      }
    }

  }

  /**
   * Function is called to View the current state of the assert
   * @param ctx - The transaction context object
   * @param drugName - name of the drug
   * @param serialNo - Serial Number of the drug
   * @returns-returns the request object in Jason format
   */
  async viewDrugCurrentState(ctx, drugName, serialNo) {
    const key = Drug.makeKey([drugName, serialNo]);
    let drugObject = await ctx.drugList.getDrug(key);
    return drugObject;
  }

}

module.exports = SmartContract;