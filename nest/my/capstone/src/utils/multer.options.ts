import * as multer from 'multer';

import * as path from 'path';

import * as fs from 'fs';

import {
    MulterOptions, 
} from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
    try {
        console.log('💾 Create a root uploads folder...');

        fs.mkdirSync(path.join(__dirname, '..', `uploads`));
    } catch (error) {
        console.log('The folder already exists...');
    }

    try {
        console.log(`💾 Create a ${folder} uploads folder...`);

        fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
    } catch (error) {
        console.log(`The ${folder} folder already exists...`);
    }
};

const storage = (folder: string): multer.StorageEngine => {
    createFolder(folder);

    return multer.diskStorage({
        destination(req, file, cb) {
            //* 어디에 저장할 지
            // 지금 밑에 있는건 dist 파일에 저장을 하는 것
            const folderName = path.join(__dirname, '..', `uploads/${folder}`);

            // 이건 내 로컬에 저장을 하는 것
            // const folderName = path.join(__dirname, '../..', `src/uploads/${folder}`);

            cb(null, folderName);
        },

        filename(req, file, cb) {
            //* 어떤 이름으로 올릴 지

            const ext = path.extname(file.originalname);

            const fileName = `${path.basename(
                file.originalname, ext,
            )}${Date.now()}${ext}`;

            cb(null, fileName);
        },
    });
};

export const multerOptions = (folder: string) => {
    const result: MulterOptions = {
        storage: storage(folder),
    };

    return result;
};
