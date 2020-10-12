"use strict";

const Company = require("../model/Company.js");

class CompanyList {
  constructor(ctx) {
    this.ctx = ctx;
    this.name = "org.pharma-network.pharmanet.lists.company";
  }

  /**
   * Returns the Company model stored in blockchain identified by this key
   * @param companyKey
   * @returns {Promise<Company>}
   */
  async getCompany(companyKey) {
    let companyCompositeKey = this.ctx.stub.createCompositeKey(this.name, companyKey.split(':'));
    let companyBuffer = await this.ctx.stub.getState(companyCompositeKey);
    try {
      return Company.fromBuffer(companyBuffer);
    }
    catch (exe) {
      console.log('The company doesnot exist');
    }
  }

  /**
   * Adds a Company model to the blockchain
   * @param companyObject {Company}
   * @returns {Promise<void>}
   */
  async addCompany(companyObject) {
    let companyCompositeKey = this.ctx.stub.createCompositeKey(this.name, companyObject.getKeyArray());
    let companyBuffer = companyObject.toBuffer();
    await this.ctx.stub.putState(companyCompositeKey, companyBuffer);
  }

  /**
   * Updates a Company model on the blockchain
   * @param  companyObject{Company}
   * @returns {Promise<void>}
   */
  async updateCompany(companyObject) {
    let companyCompositeKey = this.ctx.stub.createCompositeKey(
      this.name,
      companyObject.getKeyArray()
    );
    let companyBuffer = companyObject.toBuffer();
    await this.ctx.stub.putState(companyCompositeKey, companyBuffer);
  }
}

module.exports = CompanyList;
