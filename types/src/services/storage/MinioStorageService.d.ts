export = MinioStorageService;
declare class MinioStorageService extends ObjectStorage {
    /**
     * @param {string} bucketName - The name of the S3 bucket.
     * @param {string} [endpoint] - The endpoint.
     */
    constructor(bucketName: string, endpoint?: string | undefined);
    bucketName: string;
    endpoint: string | undefined;
    s3: import("@aws-sdk/client-s3").S3Client;
    /**
     * Upload a file to the S3 bucket.
     * @param {string} filePath - The path in the S3 bucket where the file will be uploaded.
     * @param {Buffer|string|Uint8Array|Blob} fileContent - The content of the file to upload.
     */
    upload(filePath: string, fileContent: Buffer | string | Uint8Array | Blob): Promise<void>;
    /**
     * Replace a file in the S3 bucket by deleting the old file and uploading a new one.
     * @param {string} filePath - The path of the file in the S3 bucket.
     * @param {Buffer|string|Uint8Array|Blob} fileContent - The content of the new file.
     */
    replace(filePath: string, fileContent: Buffer | string | Uint8Array | Blob): Promise<void>;
}
import ObjectStorage = require("./StorageInterface");
