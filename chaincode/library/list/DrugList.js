"use strict";

const Drug = require("../model/Drug.js");

class DrugList {
  constructor(ctx) {
    this.ctx = ctx;
    this.name = "org.pharma-network.pharmanet.lists.drug";
  }
  /**
   * Returns the Drug model stored in blockchain identified by this key
   * @param drugKey
   * @returns {Promise<Drug>}
   */
  async getDrug(drugKey) {
    let drugCompositeKey = this.ctx.stub.createCompositeKey(
      this.name,
      drugKey.split(":")
    );
    let drugBuffer = await this.ctx.stub.getState(drugCompositeKey);
    try {
      return Drug.fromBuffer(drugBuffer);
    } catch (exe) {
      console.log("Drug doesnot exists");
    }
  }

  /**
   * Adds a Drug model to the blockchain
   * @param drugObject {Drug}
   * @returns {Promise<void>}
   */
  async addDrug(drugObject) {
    let drugCompositeKey = this.ctx.stub.createCompositeKey(
      this.name,
      drugObject.getKeyArray()
    );
    let drugBuffer = drugObject.toBuffer();
    await this.ctx.stub.putState(drugCompositeKey, drugBuffer);
  }

  /**
   * Updates a Drug model on the blockchain
   * @param  drugObject{drug}
   * @returns {Promise<void>}
   */
  async updateDrug(drugObject) {
    let drugCompositeKey = this.ctx.stub.createCompositeKey(
      this.name,
      drugObject.getKeyArray()
    );
    let drugBuffer = drugObject.toBuffer();
    await this.ctx.stub.putState(drugCompositeKey, drugBuffer);
  }
}

module.exports = DrugList;
