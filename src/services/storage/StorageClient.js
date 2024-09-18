const AwsStorageService = require('./AWSStorageService.js');
const StorageInterface = require('./StorageInterface.js');

class StorageClient {
  
  /**
   * Creates an instance of the storage service based on the provided service name.
   * @param {keyof StorageClient.Client} client - The cloud storage service to use.
   * @param {string} bucketName - The name of the S3 bucket (for AWS and Minio).
   * @param {string} endpoint - The endpoint.
   * @returns {StorageInterface} - The storage service instance.
   * @throws {Error} - If the service is unsupported.
   */
  static create(client, bucketName, endpoint) {
    switch (client) {
      case 'AZURE':
        // Assuming AzureStorageService exists and implements StorageService
        // return new AzureStorageService();
        throw new Error('Azure storage service is not yet implemented');
      case 'GCP':
        // Assuming GcpStorageService exists and implements StorageService
        // return new GcpStorageService();
        throw new Error('GCP storage service is not yet implemented');
      case 'AWS':
        return new AwsStorageService(bucketName, endpoint);
      case 'MINIO':
        // Assuming Minio would be handled similarly to AWS
        return new AwsStorageService(bucketName, endpoint);
      default:
        throw new Error('Unsupported service');
    }
  }

  static Client = Object.freeze({
    AWS: 'aws',
    GCP: 'gcp',
    AZURE: 'azure',
    MINIO: 'minio'
  });
}

module.exports = StorageClient;