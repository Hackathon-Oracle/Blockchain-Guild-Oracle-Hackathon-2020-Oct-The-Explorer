"use strict";

const PO = require("../model/PO.js");

class POList {
  constructor(ctx) {
    this.ctx = ctx;
    this.name = "org.pharma-network.pharmanet.lists.po";
  }

  /**
   * Returns the PO model stored in blockchain identified by this key
   * @param poKey
   * @returns {Promise<PO>}
   */
  async getPO(poKey) {
    let poCompositeKey = this.ctx.stub.createCompositeKey(
      this.name,
      poKey.split(":")
    );
    let poBuffer = await this.ctx.stub.getState(poCompositeKey);
    try {
      return PO.fromBuffer(poBuffer);
    } catch (exe) {
      console.log("PO doesnot exists");
    }
  }

  /**
   * Adds a PO model to the blockchain
   * @param poObject {PO}
   * @returns {Promise<void>}
   */
  async addPO(poObject) {
    let poCompositeKey = this.ctx.stub.createCompositeKey(
      this.name,
      poObject.getKeyArray()
    );
    let poBuffer = poObject.toBuffer();
    await this.ctx.stub.putState(poCompositeKey, poBuffer);
  }

  /**
   * Updates a PO model on the blockchain
   * @param  poObject{PO}
   * @returns {Promise<void>}
   */
  async updatePO(poObject) {
    let poCompositeKey = this.ctx.stub.createCompositeKey(
      this.name,
      poObject.getKeyArray()
    );
    let poBuffer = poObject.toBuffer();
    await this.ctx.stub.putState(poCompositeKey, poBuffer);
  }
}

module.exports = POList;
