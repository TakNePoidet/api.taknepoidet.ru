import { FastifyReply, FastifyRequest } from 'fastify';
import { StorageServices } from '../../services/storage-services';
import { Jwt } from '../../libraries/jwt';
import { ApiExceptions } from '../../exceptions/api-exceptions';

export class StorageController {
	static async files(request: FastifyRequest, reply: FastifyReply): Promise<void> {
		const { url } = request;

		const regexp = new RegExp(`^/storage/${Jwt.StringRegExpJWT}(\\/.*)?`);

		if (!regexp.test(url)) {
			throw new ApiExceptions('Неверный формат запроса', 2000, 400);
		}
		try {
			await new StorageServices(reply).sendFile(url.trim().split('/')[2]);
		} catch (e) {
			if (e instanceof ApiExceptions) {
				throw e;
			}
			throw new ApiExceptions('Неизвестная ошибка', 100, 503);
		}
	}
}
