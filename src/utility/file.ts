import path from 'path';
import mine from 'mime-types';

export function getMineType(file: string): string {
	const type = mine.lookup(file);

	if (type) {
		return type;
	}
	return 'unknown';
}

export function getFileExtension(file: string): string {
	return path.extname(file).substring(1);
}
