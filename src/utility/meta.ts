import { fileURLToPath } from 'url';
import { dirname } from 'path';

export function getMetaGlobal() {
	// eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
	const __filename = fileURLToPath(import.meta.url);
	// eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
	const __dirname = dirname(__filename);

	return { __filename, __dirname };
}
