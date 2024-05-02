"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const APP = {
    LANGUAGE: {
        EN: 'en'
    },
    APP_DOMAIN: 'http://localhost:8000',
    DOMAIN_NFT_DESCRIPTION: 'A domain on ZNS Connect Name Service',
    S3_BUCKET_VERSION: '2012-10-17',
    S3_BUCKET_NAME: 'zns-metadata',
    AWS_REGION: 'eu-north-1',
    S3_FILE_LIMIT: 10 * 1024 * 1024,
    S3_QUEUE_SIZE: 1
};
exports.default = APP;
