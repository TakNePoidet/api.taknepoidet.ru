import path from 'path';
import fs from 'fs';
import { createHmac } from 'crypto';
import {
	convertAbsolutFileToLink,
	getImageSize,
	encodeBase64url,
	fileHash,
	getFileExtension,
	getMineType,
	stringify
} from '../../utility';
import { FileImage } from '../../types/files';
import { Constant } from '../../constant';

export async function saveFile(file: string): Promise<FileImage> {
	const type = getMineType(file);
	const extname = getFileExtension(file);
	const [hash, f1, f2] = /(.{2})(.{2})(.*)/.exec(await fileHash(file));
	const folder = path.join(Constant.Storage, 'files', f1, f2);
	const header = encodeBase64url(
		stringify({
			alg: 'HS256',
			typ: 'JWT'
		})
	);

	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder, {
			recursive: true
		});
	}

	const data: Partial<FileImage> = {};
	let payload = '';

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
	}

	payload = encodeBase64url(stringify(dataPayload));
	const unsignedToken = `${header}.${payload}`;
	const signature = createHmac('sha256', Constant.StorageJVTKey).update(unsignedToken).digest('hex');

	data.link = `${Constant.StorageDomain}/${unsignedToken}.${signature}`;
	return data as FileImage;
}
