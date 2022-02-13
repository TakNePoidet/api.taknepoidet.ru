import path from 'path';
import fs from 'fs';
import { Jwt } from '../jwt';
import {
	convertAbsolutFileToLink,
	getImageSize,
	fileHash,
	getFileExtension,
	getMineType,
	returnError
} from '../../utility';
import { FileImage } from '../../types/files';
import { Constant } from '../../constant';

export async function saveFile(file: string): Promise<FileImage | never> {
	try {
		const type = getMineType(file);

		const extname = getFileExtension(file);

		const [hash, f1, f2] = /(.{2})(.{2})(.*)/.exec(await fileHash(file));

		const folder = path.join(Constant.Storage, 'files', f1, f2);

		if (!fs.existsSync(folder)) {
			fs.mkdirSync(folder, {
				recursive: true
			});
		}

		const data: Partial<FileImage> = {};

		data.type = type as FileImage['type'];

		const pathFile = path.join(folder, `${hash}.${extname}`);

		fs.copyFileSync(file, pathFile);

		const dataPayload: Record<string, any> = {
			type,
			path: convertAbsolutFileToLink(pathFile)
		};

		if (['jpg', 'png', 'jpeg', 'svg'].includes(extname)) {
			const { width, height } = await getImageSize(file);

			dataPayload.height = height;
			dataPayload.width = width;
			data.height = height;
			data.width = width;
		}

		const jvtToken = new Jwt<typeof dataPayload>().generate(dataPayload);

		data.path = `${Constant.StorageDomain}/${jvtToken}`;
		return data as FileImage;
	} catch (e) {
		return returnError(e);
	}
}
