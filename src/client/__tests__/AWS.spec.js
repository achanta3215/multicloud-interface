const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { sdkStreamMixin } = require('@smithy/util-stream');
const { mockClient } = require('aws-sdk-client-mock');
const { Readable } = require('stream');
const { CloudClient } = require('../CloudClient'); // Adjust the path as necessary
const StorageInterface = require('../../services/storage/StorageInterface');
const awsJestMock = require('aws-sdk-client-mock-jest');

const s3Mock = mockClient(S3Client);

describe('CloudClient AWS S3 Operations', () => {
  /** @type {StorageInterface} */
  let storageService;

  beforeEach(() => {
    process.env.AWS_ACCESS_KEY_ID = 'dummy-access-key-id';
    process.env.AWS_SECRET_ACCESS_KEY = 'dummy-secret-access-key';
    process.env.AWS_REGION = 'dummy-region';
    s3Mock.reset();
    storageService = new CloudClient.Builder()
          .setClient(CloudClient.CloudClients.AWS)
          .setService(CloudClient.Services.ObjectStorage)
          .setBucket('test-bucket')
          .build()
  });

  test('should upload a file to S3', async () => {
    s3Mock.on(PutObjectCommand).resolves({
      ETag: '"etag"',
    });

    await storageService.upload('test-file.txt', Buffer.from('file content'));

    expect(s3Mock).toHaveReceivedCommandWith(PutObjectCommand, {
      Bucket: 'test-bucket',
      Key: 'test-file.txt',
      Body: Buffer.from('file content'),
    });
  });

  // Test case broker because of `getSignedUrl`
  test.skip('should retrieve a file from S3', async () => {
    // Create Stream from string
    const stream = new Readable();
    stream.push('file content');
    stream.push(null); // end of stream

    // Wrap the Stream with SDK mixin
    const sdkStream = sdkStreamMixin(stream);

    s3Mock.on(GetObjectCommand).resolves({
      Body: sdkStream,
    });

    const result = await storageService.retrieve('test-file.txt');

    expect(s3Mock).toHaveReceivedCommandWith(GetObjectCommand, {
      Bucket: 'test-bucket',
      Key: 'test-file.txt',
    });
    const str = await result;
    expect(str).toBe('file content');
  });

  test('should delete a file from S3', async () => {
    s3Mock.on(DeleteObjectCommand).resolves({});

    await storageService.delete('test-file.txt');

    expect(s3Mock).toHaveReceivedCommandWith(DeleteObjectCommand, {
      Bucket: 'test-bucket',
      Key: 'test-file.txt',
    });
  });

  test('should replace a file in S3', async () => {
    s3Mock.on(PutObjectCommand).resolves({
      ETag: '"etag"',
    });

    await storageService.replace('test-file.txt', Buffer.from('new content'));

    expect(s3Mock).toHaveReceivedCommandWith(PutObjectCommand, {
      Bucket: 'test-bucket',
      Key: 'test-file.txt',
      Body: Buffer.from('new content'),
    });
  });
});