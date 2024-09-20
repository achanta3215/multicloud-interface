export = MinioService;
/**
 * MinioService class extending CloudService.
 * Provides AWS services like S3 and Lambda without enforcing singleton or tracking logic.
 * @extends CloudService
 */
declare class MinioService extends CloudService {
    /**
     * Validates required environment variables and throws an error if any are missing.
     * @throws {Error} If any required environment variable is missing.
     */
    validateAwsEnvVars(): void;
    /**
     * Creates and returns a new AWS S3 client instance.
     * @param {string} [endpoint] - The endpoint.
     * @returns {S3Client} A new S3 client instance.
     * @throws {Error} If any required environment variable is missing.
     */
    getS3Instance(endpoint?: string | undefined): S3Client;
    /**
     * Creates and returns a new AWS Lambda client instance.
     * @returns {Lambda} A new Lambda client instance.
     * @throws {Error} If any required environment variable is missing.
     */
    getLambdaInstance(): Lambda;
}
import CloudService = require("./CloudService");
import { S3Client } from "@aws-sdk/client-s3/dist-types/S3Client";
import { Lambda } from "@aws-sdk/client-lambda/dist-types/Lambda";
