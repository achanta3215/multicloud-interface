export = CloudService;
declare class CloudService {
    /**
     * Creates and returns a new object storage client instance.
     * @param {string} endpoint - The endpoint.
     * @throws {Error} If any required environment variable is missing.
     */
    getS3Instance(endpoint: string): void;
    getLambdaInstance(): void;
}
