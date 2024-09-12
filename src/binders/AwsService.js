const { S3 } = require('@aws-sdk/client-s3');
const { Lambda } = require('@aws-sdk/client-lambda');
const CloudService = require('./CloudService');

/**
 * AwsService class extending CloudClient.
 * Provides singleton instances for AWS services like S3 and Lambda.
 * @extends CloudClient
 */
class AwsService extends CloudService {

  /**
   * Singleton instance of AwsService.
   * @type {AwsService|null}
   */
  static instance = null;

  /**
   * Constructs a new AwsService instance.
   * Throws an error if an instance already exists.
   * Use AwsService.getInstance() to get the singleton instance.
   */
  constructor() {
    if (AwsService.instance) {
      throw new Error("Use AwsService.getInstance() to get an instance of this class.");
    }
    super();
  }

  /**
   * Gets the singleton instance of AwsService.
   * @returns {AwsService} The singleton instance of AwsService.
   */
  static getInstance() {
    if (!AwsService.instance) {
      AwsService.instance = new AwsService();
    }
    return AwsService.instance;
  }

  /**
   * Gets the singleton instance of AWS S3 client.
   * @returns {S3} The singleton instance of AWS S3 client.
   */
  getS3Instance() {
    if (!this.s3Instance) {
      this.s3Instance = new S3({
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        region: process.env.AWS_REGION,
      });
    }
    return this.s3Instance;
  }

  /**
   * Gets the singleton instance of AWS Lambda client.
   * @returns {Lambda} The singleton instance of AWS Lambda client.
   */
  getLambdaInstance() {
    if (!this.lambdaInstance) {
      this.lambdaInstance = new Lambda({
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        region: process.env.AWS_REGION,
      });
    }
    return this.lambdaInstance;
  }
}

module.exports = AwsService;