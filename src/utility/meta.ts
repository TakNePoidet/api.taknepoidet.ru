import { fileURLToPath } from 'url';
import path from 'path';

export function getMetaGlobal() {
	const filename = fileURLToPath(import.meta.url);
	const dirname = path.dirname(filename);

	return { filename, dirname };
}
