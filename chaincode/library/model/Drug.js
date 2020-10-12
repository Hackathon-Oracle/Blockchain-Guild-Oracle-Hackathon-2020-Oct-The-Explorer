"use strict";

class Drug {
  /**
   * Constructor function
   * @param drugObject {Object}
   */
  constructor(drugObject) {
    this.key = Drug.makeKey([drugObject.productId.drugName, drugObject.productId.serialNo]);
    Object.assign(this, drugObject);
  }

  /**
   * Get class of this model
   * @returns {string}
   */
  static getClass() {
    return "org.pharma-network.pharmanet.models.drug";
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
    return new Drug(json);
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
   * @returns {Drug}
   * @param drugObject {Object}
   */
  static createInstance(drugObject) {
    return new Drug(drugObject);
  }
}

module.exports = Drug;
