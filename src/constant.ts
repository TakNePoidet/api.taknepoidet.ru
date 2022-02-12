import path from 'path';
import { getMetaGlobal } from './utility/meta';

export class Constant {
	private static NodeConstant = getMetaGlobal();

	static get dirname() {
		return Constant.NodeConstant.dirname;
	}

	static get filename() {
		return Constant.NodeConstant.filename;
	}

	static get AppServerPort(): number {
		return parseInt(process.env.APP_SERVER_PORT ?? '3000', 10);
	}

	static get Storage() {
		return path.join(Constant.dirname, '../storage');
	}

	static get PathData() {
		return path.join(Constant.Storage, '/data');
	}

	static get StorageDomain(): string {
		return process.env.STORAGE_DOMAIN ?? 'http://localhost:5551';
	}

	static get StorageJVTKey(): string {
		return process.env.STORAGE_JVT_KEY || 'key';
	}
}
