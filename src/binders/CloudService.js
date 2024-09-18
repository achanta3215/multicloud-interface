class CloudService {
  
  /**
   * Creates and returns a new object storage client instance.
   * @param {string} endpoint - The endpoint.
   * @throws {Error} If any required environment variable is missing.
   */
  getS3Instance(endpoint) {
    throw new Error('Method "getS3Instance" must be implemented');
  }

  getLambdaInstance() {
    throw new Error('Method "getLambdaInstance" must be implemented');
  }

}

module.exports = CloudService;
