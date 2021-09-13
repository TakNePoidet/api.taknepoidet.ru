import { FastifyReply, FastifyRequest } from 'fastify';
import { ApiExceptions } from '../exceptions/api-exceptions';
import { SocialServices } from '../services/social-services';

export class SocialController {
	static getAll(_: FastifyRequest, reply: FastifyReply): void {
		reply.send({
			response: 'ok',
			items: new SocialServices().getAll()
		});
	}

	static getItem(
		request: FastifyRequest<{
			Querystring: {
				key: string;
			};
		}>,
		reply: FastifyReply
	): void {
		const { key } = request.query;

		if (!key || typeof key !== 'string') {
			throw new ApiExceptions('Неверный формат ключа социальной сети', 1410, 400);
		}
		const social = new SocialServices().getItem(key);

		if (social) {
			reply.send({
				response: 'ok',
				item: social
			});
		} else {
			throw new ApiExceptions('Социальная сеть не найдена', 1400, 404);
		}
	}
}
