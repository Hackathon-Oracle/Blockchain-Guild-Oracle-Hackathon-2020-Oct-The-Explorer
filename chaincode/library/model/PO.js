"use strict";

class PO {
  /**
   * Constructor function
   * @param poObject {Object}
   */
  constructor(poObject) {
    this.key = PO.makeKey([poObject.poId.buyerCRN, poObject.poId.drugName]);
    Object.assign(this, poObject);
  }

  /**
   * Get class of this model
   * @returns {string}
   */
  static getClass() {
    return "org.pharma-network.pharmanet.models.po";
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
    return new PO(json);
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
   * @returns {PO}
   * @param poObject {Object}
   */
  static createInstance(poObject) {
    return new PO(poObject);
  }
}

module.exports = PO;
