class CloudService {
  getS3Instance() {
    throw new Error('Method "getS3Instance" must be implemented');
  }

  getLambdaInstance() {
    throw new Error('Method "getLambdaInstance" must be implemented');
  }

}

module.exports = CloudService;
