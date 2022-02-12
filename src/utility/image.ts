import sharp from 'sharp';

export interface ImageBoxSize {
	width: number;
	height: number;
}
export async function getImageSize(file: string): Promise<ImageBoxSize> {
	const { width, height } = await sharp(file).metadata();

	return { width, height };
}
