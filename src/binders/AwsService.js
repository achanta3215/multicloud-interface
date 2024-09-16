const { S3 } = require('@aws-sdk/client-s3');
const { Lambda } = require('@aws-sdk/client-lambda');
const CloudService = require('./CloudService');

/**
 * AwsService class extending CloudService.
 * Provides AWS services like S3 and Lambda without enforcing singleton or tracking logic.
 * @extends CloudService
 */
class AwsService extends CloudService {

  /**
   * Constructs a new AwsService instance.
   * No singleton pattern, each instance can be created freely.
   */
  constructor() {
    super();
  }

  /**
   * Validates required environment variables and throws an error if any are missing.
   * @throws {Error} If any required environment variable is missing.
   */
  validateAwsEnvVars() {
    const requiredVars = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION'];
    const missingVars = requiredVars.filter(envVar => !process.env[envVar]);

    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
  }

  /**
   * Creates and returns a new AWS S3 client instance.
   * @returns {S3} A new S3 client instance.
   * @throws {Error} If any required environment variable is missing.
   */
  getS3Instance() {
    this.validateAwsEnvVars();

    return new S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
      endpoint: process.env.AWS_S3_ENDPOINT,
      region: process.env.AWS_REGION,
    });
  }

  /**
   * Creates and returns a new AWS Lambda client instance.
   * @returns {Lambda} A new Lambda client instance.
   * @throws {Error} If any required environment variable is missing.
   */
  getLambdaInstance() {
    this.validateAwsEnvVars();

    return new Lambda({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
      region: process.env.AWS_REGION,
    });
  }
}

module.exports = AwsService;
