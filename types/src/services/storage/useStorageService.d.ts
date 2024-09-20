export = useStorageService;
/**
 * @param {keyof CloudClient.CloudClients} service - The cloud storage service to use.
 * @param {string} bucketName - The name of the S3 bucket (for AWS and Minio).
 * @returns {Promise<object>} - The storage client for the specified service.
 * @throws {Error} - If the service is unsupported.
 */
declare function useStorageService(service: "AWS" | "GCP" | "AZURE" | "MINIO", bucketName: string): Promise<object>;
