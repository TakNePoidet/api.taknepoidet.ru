import path from 'path';
import { getMetaGlobal } from '../utility/meta';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const { __dirname, __filename } = getMetaGlobal();
export const STORAGE = path.join(__dirname, '../storage');
export const PATH_DATA = path.join(STORAGE, '/data');
