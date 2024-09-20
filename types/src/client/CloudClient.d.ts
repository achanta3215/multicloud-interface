export = CloudClient;
/**
 * CloudClient class representing cloud providers.
 */
declare class CloudClient {
    /**
     * Cloud client types.
     * @type {{ AZURE: 'AZURE', AWS: 'AWS', GCP: 'GCP', MINIO: 'MINIO' }}
     */
    static CloudClients: {
        AZURE: "AZURE";
        AWS: "AWS";
        GCP: "GCP";
        MINIO: "MINIO";
    };
    /**
     * Cloud services types.
     * @type {{ ObjectStorage: 'ObjectStorage' }}
     */
    static Services: {
        ObjectStorage: "ObjectStorage";
    };
    /**
     * @param {keyof typeof CloudClient.CloudClients} clientType - The cloud client type (e.g., 'AZURE', 'AWS').
     */
    constructor(clientType: keyof typeof CloudClient.CloudClients);
    clientType: "AWS" | "GCP" | "AZURE" | "MINIO";
}
declare namespace CloudClient {
    export { Builder };
}
/**
 * Builder class for creating CloudClient instances and managing StorageClient instances.
 */
declare class Builder {
    /**
     * Map to store created StorageInterface instances.
     * @type {Map<string, StorageInterface>}
     */
    static instanceRegistry: Map<string, StorageInterface>;
    /**
     * @typedef {Object} BuilderProperties
     * @property {keyof typeof CloudClient.CloudClients} [clientType] - The cloud client type.
     * @property {keyof typeof CloudClient.Services} [serviceType] - The cloud service type.
     * @property {string} [bucketName] - The bucket name.
     * @property {string} [endpoint] - The endpoint name.
     */
    /** @type {BuilderProperties} */
    properties: {
        /**
         * - The cloud client type.
         */
        clientType?: "AWS" | "GCP" | "AZURE" | "MINIO" | undefined;
        /**
         * - The cloud service type.
         */
        serviceType?: "ObjectStorage" | undefined;
        /**
         * - The bucket name.
         */
        bucketName?: string | undefined;
        /**
         * - The endpoint name.
         */
        endpoint?: string | undefined;
    };
    /**
     * Sets the cloud client type.
     * @param {keyof typeof CloudClient.CloudClients} clientType - The client type (e.g., 'AZURE', 'AWS', 'GCP').
     * @returns {Builder} - Returns the Builder instance for chaining.
     */
    setClient(clientType: keyof typeof CloudClient.CloudClients): Builder;
    /**
     * Sets the cloud service type.
     * @param {keyof typeof CloudClient.Services} serviceType - The service type (e.g., 'ObjectStorage').
     * @returns {Builder} - Returns the Builder instance for chaining.
     */
    setService(serviceType: keyof typeof CloudClient.Services): Builder;
    /**
     * Sets the bucket name for object storage.
     * @param {string} bucketName - The bucket name.
     * @returns {Builder} - Returns the Builder instance for chaining.
     */
    setBucket(bucketName: string): Builder;
    /**
     * Sets the bucket name for object storage.
     * @param {string} endpoint - The bucket name.
     * @returns {Builder} - Returns the Builder instance for chaining.
     */
    setEndpoint(endpoint: string): Builder;
    /**
     * Generates a unique key based on the properties of the builder.
     * @returns {string} - The unique key used for instance storage.
     */
    generateKey(): string;
    /**
     * Builds and returns a StorageInterface instance. If an instance already exists, it returns the cached one.
     * @returns {StorageInterface} - Returns the StorageInterface instance.
     * @throws {Error} - Throws an error if required properties are missing.
     */
    build(): StorageInterface;
}
import StorageInterface = require("../services/storage/StorageInterface");
