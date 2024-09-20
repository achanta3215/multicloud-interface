
const CloudClient = require('../../client/CloudClient.js');
const AwsStorageService = require('./AWSStorageService.js');

/**
 * @param {keyof CloudClient.CloudClients} service - The cloud storage service to use.
 * @param {string} bucketName - The name of the S3 bucket (for AWS and Minio).
 * @returns {Promise<object>} - The storage client for the specified service.
 * @throws {Error} - If the service is unsupported.
 */
async function useStorageService(service, bucketName) {
  let storageClient;

  switch (service) {
    case 'AZURE':
      const { BlobServiceClient } = await import('@azure/storage-blob');
      storageClient = BlobServiceClient;
      break;
    case 'GCP':
      const { Storage } = await import('@google-cloud/storage');
      storageClient = Storage;
      break;
    case 'AWS':
    case 'MINIO':
      storageClient = new AwsStorageService(bucketName);
      break;
    default:
      throw new Error('Unsupported service');
  }
  return storageClient;
}

module.exports = useStorageService;