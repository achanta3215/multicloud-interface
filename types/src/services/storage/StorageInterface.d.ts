export = StorageInterface;
declare class StorageInterface {
    /**
     * Upload a file.
     * @param {string} filePath - The path to the file to upload.
     * @param {Buffer} fileContent - The content of the file.
     * @returns {Promise<void>} - The URL of the uploaded file.
     */
    upload(filePath: string, fileContent: Buffer): Promise<void>;
    /**
     * Retrieve a file.
     * @param {string} filePath - The path to the file to retrieve.
     * @returns {Promise<string>} - The URL of the retrieved file.
     */
    retrieve(filePath: string): Promise<string>;
    /**
     * Delete a file.
     * @param {string} filePath - The path to the file to delete.
     * @returns {Promise<void>}
     */
    delete(filePath: string): Promise<void>;
    /**
     * Replace a file.
     * @param {string} filePath - The path to the file to replace.
     * @param {Buffer} fileContent - The new content of the file.
     * @returns {Promise<void>}
     */
    replace(filePath: string, fileContent: Buffer): Promise<void>;
}
