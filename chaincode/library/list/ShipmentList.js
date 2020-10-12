"use strict";

const Shipment = require("../model/Shipment.js");

class ShipmentList {
  constructor(ctx) {
    this.ctx = ctx;
    this.name = "org.pharma-network.pharmanet.lists.shipment";
  }

  /**
   * Returns the Shipment model stored in blockchain identified by this key
   * @param shipKey
   * @returns {Promise<Shipment>}
   */
  async getShipment(shipKey) {
    let shipCompositeKey = this.ctx.stub.createCompositeKey(
      this.name,
      shipKey.split(":")
    );
    let shipmentBuffer = await this.ctx.stub.getState(shipCompositeKey);
    try {
      return Shipment.fromBuffer(shipmentBuffer);
    } catch (exe) {
      console.log("Shipment doesnot exists");
    }
  }

  /**
   * Adds a Shipment model to the blockchain
   * @param shipmentObject {Shipment}
   * @returns {Promise<void>}
   */
  async addShipment(shipObject) {
    let shipCompositeKey = this.ctx.stub.createCompositeKey(
      this.name,
      shipObject.getKeyArray()
    );
    let shipBuffer = shipObject.toBuffer();
    await this.ctx.stub.putState(shipCompositeKey, shipBuffer);
  }

  /**
   * Updates a Shipment model on the blockchain
   * @param  shipObject{Shipment}
   * @returns {Promise<void>}
   */
  async updateShipment(shipObject) {
    let shipCompositeKey = this.ctx.stub.createCompositeKey(
      this.name,
      shipObject.getKeyArray()
    );
    let shipBuffer = shipObject.toBuffer();
    await this.ctx.stub.putState(shipCompositeKey, shipBuffer);
  }
}

module.exports = ShipmentList;
