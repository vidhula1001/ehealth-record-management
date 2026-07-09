const { BlobServiceClient } = require("@azure/storage-blob");

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER;

const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);

const containerClient =
    blobServiceClient.getContainerClient(containerName);

async function uploadFile(fileName, buffer) {

    const blockBlobClient =
        containerClient.getBlockBlobClient(fileName);

    await blockBlobClient.uploadData(buffer);

    return blockBlobClient.url;
}

module.exports = uploadFile;