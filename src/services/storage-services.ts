import path from 'path';
import fs from 'fs';
import { FastifyReply } from 'fastify';
import { returnError } from '../utility';
import { FileImage } from '../types/files';
import { Jwt } from '../libraries/jwt';
import { ApiExceptions } from '../exceptions/api-exceptions';
import { Constant } from '../constant';

export class StorageServices {
	constructor(private reply: FastifyReply) {}

	async sendFile(jwt: string) {
		const data = Jwt.decode<FileImage>(jwt, true);
		const pathFile = path.join(Constant.Storage, data.path);

		if (fs.existsSync(pathFile)) {
			this.reply.type(data.type);
			this.reply.send(fs.readFileSync(pathFile));
		}
		returnError(new ApiExceptions('Файл не найден', 2010, 404));
	}
}
