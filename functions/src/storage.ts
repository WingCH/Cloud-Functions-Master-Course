import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';

import * as storage from '@google-cloud/storage';
const gcs = new storage.Storage();

// import * as fs from 'fs-extra';

import { tmpdir } from 'os';
import { join, dirname } from 'path';

import * as sharp from 'sharp';

export const resizeAvatar = functions.storage
  .object()
  .onFinalize(async object => {
    const bucket = gcs.bucket(object.bucket);

    // abc.png
    const filePath = object.name;
    // abc
    const fileName = filePath.split('/').pop();
    const tmpFilePath = join(tmpdir(), object.name);

    const avatarFileName = 'avatar_' + fileName;
    const tmpAvatarPath = join(tmpdir(), avatarFileName);

    functions.logger.log("filePath:", filePath);
    functions.logger.log("fileName:", fileName);
    functions.logger.log("tmpFilePath:", tmpFilePath);
    functions.logger.log("avatarFileName:", avatarFileName);
    functions.logger.log("tmpAvatarPath:", tmpAvatarPath);

    if (fileName.includes('avatar_')) {
      console.log('exiting function');
      return false;
    }

    await bucket.file(filePath).download({
      destination: tmpFilePath
    });

    await sharp(tmpFilePath)
      .resize(100, 100)
      .toFile(tmpAvatarPath);

    return bucket.upload(tmpAvatarPath, {
      destination: join(dirname(filePath), avatarFileName)
    });
  });
