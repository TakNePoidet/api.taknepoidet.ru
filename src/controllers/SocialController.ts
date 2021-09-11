import { FastifyReply, FastifyRequest } from 'fastify';
import { ApiExceptions } from '../exceptions/ApiExceptions';
import { SocialServices } from '../services/SocialServices';

export class SocialController {
	static getAll(_, reply: FastifyReply) {
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
	) {
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
