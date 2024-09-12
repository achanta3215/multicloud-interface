const StorageClient = require("../services/storage/StorageClient");

class CloudClient {
  static Clients = {
    AZURE: 'azure',
    AWS: 'aws',
    GCP: 'gcp',
  };

  static Services = {
    ObjectStorage: 'objectStorage',
  };

  /**
   * Map to hold instances of CloudClient keyed by `clientType` and `service`.
   * @type {Map<string, Map<string, CloudClient>}
   */
  static instances = new Map();

  constructor(clientType) {
    this.clientType = clientType;
    CloudClient.instances[clientType]["new"] = this;
  }

  getService(serviceType) {
    const client = this.createClient();
    return this.createService(client, serviceType);
  }

  /**
   * Creates an instance of the Cloud Client service based on the provided client name.
   * @param {keyof CloudClient.Clients} clientType
   * @returns
   */
  static getClient(clientType) {
    if (CloudClient.instances[clientType]["new"]) {
      throw new Error("Client Already triggered");
    }
    const client = new CloudClient(clientType);
    return client;
  }

  /**
   * Creates an instance of the Cloud Client service based on the provided client name.
   * @param {keyof CloudClient.Services} serviceType
   * @returns
   */
  service(serviceType) {
    if (serviceType === 'ObjectStorage') {
      return StorageClient.create(this.clientType, this.bucketName);
    }
    throw new Error('Unsupported service');
  }
}

module.exports = CloudClient;