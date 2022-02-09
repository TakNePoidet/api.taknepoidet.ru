import path from 'path';
import fs from 'fs';
import { createHmac } from 'crypto';
import sharp from 'sharp';
import mine from 'mime-types';
import { STORAGE, STORAGE_DOMAIN, STORAGE_JVT_KEY } from '../constant';
import { stringify } from './util';
import { encodeBase64url, fileHash } from './hash';

export interface File {
	link: string;
}

export interface FileImage extends File {
	type: 'image/svg+xml' | 'image/png' | 'image/jpg';
	width: number;
	height: number;
}

export function convertAbsolutFileToLink(original: string): string {
	return `${original.replace(`${STORAGE}`, '')}`;
}
async function saveImageFile(
	original: string,
	output: string
): Promise<{
	width: number;
	height: number;
	type: string;
	filepath: string;
}> {
	const photo = sharp(original).clone();
	const {
		info: { width, height }
	} = await photo.toBuffer({ resolveWithObject: true });

	const extname = path.extname(original).substring(1);
	const filepath = `${output}.${extname}`;

	fs.copyFileSync(original, filepath);
	return {
		width,
		height,
		type: mine.lookup(filepath),
		filepath
	};
}
export async function saveFile(file: string): Promise<FileImage> {
	const extname = path.extname(file).substring(1);
	const [hash, f1, f2] = /(.{2})(.{2})(.*)/.exec(await fileHash(file));
	const folder = path.join(STORAGE, 'files', f1, f2);
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

	if (['jpg', 'png', 'jpeg', 'svg'].includes(extname)) {
		const { filepath, type, width, height } = await saveImageFile(file, path.join(folder, hash));

		data.type = type as FileImage['type'];
		data.height = height;
		data.width = width;
		payload = encodeBase64url(
			stringify({
				type,
				width,
				height,
				path: convertAbsolutFileToLink(filepath)
			})
		);
	}
	const unsignedToken = `${header}.${payload}`;
	const signature = createHmac('sha256', STORAGE_JVT_KEY).update(unsignedToken).digest('hex');

	data.link = `${STORAGE_DOMAIN}/${unsignedToken}.${signature}`;
	return data as FileImage;
}
