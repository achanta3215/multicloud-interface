const ObjectStorage = require('./StorageInterface');
const MinioService = require('../../binders/MinioService');
const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

class MinioStorageService extends ObjectStorage {
  /**
   * @param {string} bucketName - The name of the S3 bucket.
   * @param {string} [endpoint] - The endpoint.
   */
  constructor(bucketName, endpoint) {
    super();
    this.bucketName = bucketName;
    this.endpoint = endpoint;
    // Create a new S3 client using AwsService
    this.s3 = new MinioService().getS3Instance(endpoint);
  }

  /**
   * Upload a file to the S3 bucket.
   * @param {string} filePath - The path in the S3 bucket where the file will be uploaded.
   * @param {Buffer|string|Uint8Array|Blob} fileContent - The content of the file to upload.
   */
  async upload(filePath, fileContent) {
    const params = {
      Bucket: this.bucketName,
      Key: filePath,
      Body: fileContent,
    };
    const command = new PutObjectCommand(params);
    await this.s3.send(command);
  }

  /**
   * Retrieve a file from the S3 bucket with a signed URL.
   * @param {string} filePath - The path of the file in the S3 bucket.
   * @returns {Promise<string>} - A signed URL to access the file.
   */
  async retrieve(filePath) {
    const params = {
      Bucket: this.bucketName,
      Key: filePath,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 }); // URL valid for 1 hour
    return url;
  }

  /**
   * Delete a file from the S3 bucket.
   * @param {string} filePath - The path of the file to delete in the S3 bucket.
   */
  async delete(filePath) {
    const params = {
      Bucket: this.bucketName,
      Key: filePath,
    };
    const command = new DeleteObjectCommand(params);
    await this.s3.send(command);
  }

  /**
   * Replace a file in the S3 bucket by deleting the old file and uploading a new one.
   * @param {string} filePath - The path of the file in the S3 bucket.
   * @param {Buffer|string|Uint8Array|Blob} fileContent - The content of the new file.
   */
  async replace(filePath, fileContent) {
    await this.delete(filePath);
    await this.upload(filePath, fileContent);
  }
}

module.exports = MinioStorageService;
