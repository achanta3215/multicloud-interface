export = StorageClient;
declare class StorageClient {
    /**
     * Creates an instance of the storage service based on the provided service name.
     * @param {keyof StorageClient.Client} client - The cloud storage service to use.
     * @param {string} bucketName - The name of the S3 bucket (for AWS and Minio).
     * @param {string} [endpoint] - The endpoint.
     * @returns {StorageInterface} - The storage service instance.
     * @throws {Error} - If the service is unsupported.
     */
    static create(client: "AWS" | "GCP" | "AZURE" | "MINIO", bucketName: string, endpoint?: string | undefined): StorageInterface;
    static Client: Readonly<{
        AWS: "aws";
        GCP: "gcp";
        AZURE: "azure";
        MINIO: "minio";
    }>;
}
import StorageInterface = require("./StorageInterface.js");
