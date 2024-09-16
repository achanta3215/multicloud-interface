const StorageClient = require("../../services/storage/StorageClient");
const { CloudClient } = require("../CloudClient");

// Mock StorageClient's create method to avoid real implementation in tests
jest.mock('../../services/storage/StorageClient', () => ({
  create: jest.fn(() => ({ storage: 'mockStorageClient' })),
}));

describe('CloudClient Builder', () => {
  beforeEach(() => {
    // Clear the instance registry before each test
    CloudClient.Builder.instanceRegistry.clear();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a new StorageClient and store it in the instance registry', () => {
    // Arrange: Create a new builder instance
    const builder = new CloudClient.Builder();

    // Act: Set properties and invoke the build method
    const storageClient = builder
      .setClient(CloudClient.CloudClients.AZURE)
      .setService(CloudClient.Services.ObjectStorage)
      .setBucket('test-bucket')
      .build();

    // Assert: Verify that StorageClient.create was called and storageClient is returned
    expect(StorageClient.create).toHaveBeenCalledWith('AZURE', 'test-bucket');
    expect(storageClient).toEqual({ storage: 'mockStorageClient' });
    expect(CloudClient.Builder.instanceRegistry.size).toBe(1);
  });

  it('should return the existing StorageClient from the instance registry', () => {
    // Arrange: Create a new builder instance and add an entry to the registry
    const builder = new CloudClient.Builder();
    builder.setClient(CloudClient.CloudClients.AZURE).setService(CloudClient.Services.ObjectStorage).setBucket('test-bucket');
    const instanceKey = builder.generateKey();
    CloudClient.Builder.instanceRegistry.set(instanceKey, { storage: 'existingStorageClient' });

    // Act: Call the build method again with the same configuration
    const storageClient = builder.build();

    // Assert: Verify that the existing instance is returned
    expect(storageClient).toEqual({ storage: 'existingStorageClient' });
    expect(StorageClient.create).not.toHaveBeenCalled();
  });

  it('should throw an error if client type is not specified', () => {
    // Arrange: Create a new builder instance
    const builder = new CloudClient.Builder();

    // Act & Assert: Call build and expect an error to be thrown
    expect(() => {
      builder.setService(CloudClient.Services.ObjectStorage).setBucket('test-bucket').build();
    }).toThrow('Client type and service type must be specified');
  });

  it('should throw an error if service type is not specified', () => {
    // Arrange: Create a new builder instance
    const builder = new CloudClient.Builder();

    // Act & Assert: Call build and expect an error to be thrown
    expect(() => {
      builder.setClient(CloudClient.CloudClients.AZURE).setBucket('test-bucket').build();
    }).toThrow('Client type and service type must be specified');
  });

  it('should throw an error if bucket name is not specified for ObjectStorage service', () => {
    // Arrange: Create a new builder instance
    const builder = new CloudClient.Builder();

    // Act & Assert: Call build and expect an error to be thrown
    expect(() => {
      builder.setClient(CloudClient.CloudClients.AZURE).setService(CloudClient.Services.ObjectStorage).build();
    }).toThrow('Bucket name must be specified for ObjectStorage service');
  });
});
