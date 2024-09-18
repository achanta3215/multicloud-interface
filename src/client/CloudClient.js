const StorageClient = require("../services/storage/StorageClient");
const StorageInterface = require("../services/storage/StorageInterface");

/**
 * CloudClient class representing cloud providers.
 */
class CloudClient {
  /**
   * @param {keyof typeof CloudClient.CloudClients} clientType - The cloud client type (e.g., 'AZURE', 'AWS').
   */
  constructor(clientType) {
    this.clientType = clientType;
  }

  /**
   * Cloud client types.
   * @type {{ AZURE: 'AZURE', AWS: 'AWS', GCP: 'GCP', MINIO: 'MINIO' }}
   */
  static CloudClients = {
    AZURE: 'AZURE',
    AWS: 'AWS',
    GCP: 'GCP',
    MINIO: 'MINIO',
  };

  /**
   * Cloud services types.
   * @type {{ ObjectStorage: 'ObjectStorage' }}
   */
  static Services = {
    ObjectStorage: 'ObjectStorage',
  };
}

/**
 * Builder class for creating CloudClient instances and managing StorageClient instances.
 */
class Builder {
  constructor() {
    /**
     * @typedef {Object} BuilderProperties
     * @property {keyof typeof CloudClient.CloudClients} [clientType] - The cloud client type.
     * @property {keyof typeof CloudClient.Services} [serviceType] - The cloud service type.
     * @property {string} [bucketName] - The bucket name.
     * @property {string} [endpoint] - The endpoint name.
     */
    /** @type {BuilderProperties} */
    this.properties = {};
  }

  /**
   * Sets the cloud client type.
   * @param {keyof typeof CloudClient.CloudClients} clientType - The client type (e.g., 'AZURE', 'AWS', 'GCP').
   * @returns {Builder} - Returns the Builder instance for chaining.
   */
  setClient(clientType) {
    if (!(clientType in CloudClient.CloudClients)) {
      throw new Error(`Invalid client type: ${clientType}`);
    }
    this.properties.clientType = clientType;
    return this;
  }

  /**
   * Sets the cloud service type.
   * @param {keyof typeof CloudClient.Services} serviceType - The service type (e.g., 'ObjectStorage').
   * @returns {Builder} - Returns the Builder instance for chaining.
   */
  setService(serviceType) {
    if (!(serviceType in CloudClient.Services)) {
      throw new Error(`Unsupported service type: ${serviceType}`);
    }
    this.properties.serviceType = serviceType;
    return this;
  }

  /**
   * Sets the bucket name for object storage.
   * @param {string} bucketName - The bucket name.
   * @returns {Builder} - Returns the Builder instance for chaining.
   */
  setBucket(bucketName) {
    this.properties.bucketName = bucketName;
    return this;
  }

  /**
   * Sets the bucket name for object storage.
   * @param {string} endpoint - The bucket name.
   * @returns {Builder} - Returns the Builder instance for chaining.
   */
  setEndpoint(endpoint) {
    this.properties.endpoint = endpoint;
    return this;
  }

  /**
   * Generates a unique key based on the properties of the builder.
   * @returns {string} - The unique key used for instance storage.
   */
  generateKey() {
    const keyParts = Object.entries(this.properties)
      .filter(([_, value]) => value !== undefined)
      .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
      .map(([key, value]) => `${key}:${value}`)
      .join('|');
    return keyParts;
  }

  /**
   * Map to store created StorageInterface instances.
   * @type {Map<string, StorageInterface>}
   */
  static instanceRegistry = new Map();

  /**
   * Builds and returns a StorageInterface instance. If an instance already exists, it returns the cached one.
   * @returns {StorageInterface} - Returns the StorageInterface instance.
   * @throws {Error} - Throws an error if required properties are missing.
   */
  build() {
    if (!this.properties.clientType || !this.properties.serviceType) {
      throw new Error("Client type and service type must be specified");
    }

    const instanceKey = this.generateKey();

    // Return the existing instance if found
    if (Builder.instanceRegistry.has(instanceKey)) {      
      // @ts-ignore
      return Builder.instanceRegistry.get(instanceKey);
    }

    // Create a new instance and store it in the registry
    if (this.properties.serviceType === CloudClient.Services.ObjectStorage && this.properties.bucketName) {
      const newClient = StorageClient.create(this.properties.clientType, this.properties.bucketName, this.properties.endpoint);
      Builder.instanceRegistry.set(instanceKey, newClient);
      return newClient;
    }

    throw new Error("Bucket name & Endpoint must be specified for ObjectStorage service");
  }
}

CloudClient.Builder = Builder;

module.exports = { CloudClient };
