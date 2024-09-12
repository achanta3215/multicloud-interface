class StorageInterface {
  /**
   * Upload a file.
   * @param {string} filePath - The path to the file to upload.
   * @param {Buffer} fileContent - The content of the file.
   * @returns {Promise<string>} - The URL of the uploaded file.
   */
  async upload(filePath, fileContent) {
    throw new Error('Method not implemented');
  }

  /**
   * Retrieve a file.
   * @param {string} filePath - The path to the file to retrieve.
   * @returns {Promise<Buffer>} - The content of the retrieved file.
   */
  async retrieve(filePath) {
    throw new Error('Method not implemented');
  }

  /**
   * Delete a file.
   * @param {string} filePath - The path to the file to delete.
   * @returns {Promise<void>}
   */
  async delete(filePath) {
    throw new Error('Method not implemented');
  }

  /**
   * Replace a file.
   * @param {string} filePath - The path to the file to replace.
   * @param {Buffer} fileContent - The new content of the file.
   * @returns {Promise<string>} - The URL of the replaced file.
   */
  async replace(filePath, fileContent) {
    throw new Error('Method not implemented');
  }
}

module.exports = StorageInterface;