"use strict";

class Shipment {
  /**
   * Constructor function
   * @param shipObject {Object}
   */
  constructor(shipObject) {
    this.key = Shipment.makeKey([shipObject.shipmentId.buyerCRN, shipObject.shipmentId.drugName]);
    Object.assign(this, shipObject);
  }

  /**
   * Get class of this model
   * @returns {string}
   */
  static getClass() {
    return "org.pharma-network.pharmanet.models.shipment";
  }

  /**
   * Create a key string joined from different key parts
   * @param keyParts {Array}
   * @returns {*}
   */
  static makeKey(keyParts) {
    return keyParts.join(":");
  }

  /**
   * Create an array of key parts for this model instance
   * @returns {Array}
   */
  getKeyArray() {
    return this.key.split(":");
  }

  /**
   * Convert the buffer stream received from blockchain into an object of this model
   * @param buffer {Buffer}
   */
  static fromBuffer(buffer) {
    let json = JSON.parse(buffer.toString());
    return new Shipment(json);
  }

  /**
   * Convert the object of this model to a buffer stream
   * @returns {Buffer}
   */
  toBuffer() {
    return Buffer.from(JSON.stringify(this));
  }

  /**
   * Create a new instance of this model
   * @returns {Shipment}
   * @param shipObject {Object}
   */
  static createInstance(shipObject) {
    return new Shipment(shipObject);
  }
}

module.exports = Shipment;
