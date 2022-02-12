import fs from 'fs';
import { getImageSize } from '../../utility/image';
import { getFileExtension, getMineType } from '../../utility';

export async function saveImageFile(
	file: string,
	output: string
): Promise<{
	width: number;
	height: number;
	type: string;
	filepath: string;
}> {
	const { width, height } = await getImageSize(file);

	const extname = getFileExtension(file);
	const filepath = `${output}.${extname}`;

	fs.copyFileSync(file, filepath);
	return {
		width,
		height,
		type: getMineType(file),
		filepath
	};
}
