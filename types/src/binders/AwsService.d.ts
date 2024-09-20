export = AwsService;
/**
 * AwsService class extending CloudService.
 * Provides AWS services like S3 and Lambda without enforcing singleton or tracking logic.
 * @extends CloudService
 */
declare class AwsService extends CloudService {
    /**
     * Validates required environment variables and throws an error if any are missing.
     * @throws {Error} If any required environment variable is missing.
     */
    validateAwsEnvVars(): void;
    /**
     * Creates and returns a new AWS S3 client instance.
     * @param {string} [endpoint] - The endpoint.
     * @returns {S3} A new S3 client instance.
     * @throws {Error} If any required environment variable is missing.
     */
    getS3Instance(endpoint?: string | undefined): S3;
    /**
     * Creates and returns a new AWS Lambda client instance.
     * @returns {Lambda} A new Lambda client instance.
     * @throws {Error} If any required environment variable is missing.
     */
    getLambdaInstance(): Lambda;
}
import CloudService = require("./CloudService");
import { S3 } from "@aws-sdk/client-s3/dist-types/S3";
import { Lambda } from "@aws-sdk/client-lambda/dist-types/Lambda";
