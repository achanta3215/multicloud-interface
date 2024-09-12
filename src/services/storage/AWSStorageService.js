const ObjectStorage = require('./StorageInterface');
const AwsService = require('../../binders/AwsService');

class AwsStorageService extends ObjectStorage {
  /**
   * Map to hold instances of AwsStorageService keyed by bucket name.
   * @type {Map<string, AwsStorageService>}
   */
  static instances = new Map();

  /**
   * @param {string} bucketName - The name of the S3 bucket.
   */
  constructor(bucketName) {
    if (AwsStorageService.instances.has(bucketName)) {
      throw new Error(`Instance already exists for bucket: ${bucketName}. Use AwsStorageService.getInstance() to get the existing instance.`);
    }
    super();
    this.bucketName = bucketName;
    this.s3 = new AwsClient().getS3Instance();
    AwsStorageService.instances.set(bucketName, this);
  }

  /**
   * Gets the singleton instance of AwsStorageService for a specific bucket.
   * If an instance does not exist for the given bucket, it creates one.
   * @param {string} bucketName - The name of the S3 bucket.
   * @returns {AwsStorageService} The instance of AwsStorageService for the given bucket.
   */
  static getInstance(bucketName) {
    if (!AwsStorageService.instances.has(bucketName)) {
      AwsStorageService.instances.set(bucketName, new AwsStorageService(bucketName));
    }
    return AwsStorageService.instances.get(bucketName);
  }

  async upload(filePath, fileContent) {
    const params = {
      Bucket: this.bucketName,
      Key: filePath,
      Body: fileContent,
    };
    const data = await this.s3.upload(params).promise();
    return data.Location;
  }

  async retrieve(filePath) {
    const params = {
      Bucket: this.bucketName,
      Key: filePath,
    };
    const data = await this.s3.getObject(params).promise();
    return data.Body;
  }

  async delete(filePath) {
    const params = {
      Bucket: this.bucketName,
      Key: filePath,
    };
    await this.s3.deleteObject(params).promise();
  }

  async replace(filePath, fileContent) {
    await this.delete(filePath);
    return this.upload(filePath, fileContent);
  }
}

module.exports = AwsStorageService;