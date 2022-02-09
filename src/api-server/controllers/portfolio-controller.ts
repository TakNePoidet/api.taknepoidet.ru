import { FastifyReply, FastifyRequest } from 'fastify';
import { PortfolioServices } from '../../services/portfolio-services';
import { ApiExceptions } from '../../exceptions/api-exceptions';

export class PortfolioController {
	static getSiteList(_: FastifyRequest, reply: FastifyReply) {
		reply.send({
			response: 'ok',
			items: new PortfolioServices().getSiteList()
		});
	}

	static getSiteItem(
		request: FastifyRequest<{
			Querystring: {
				key: string;
			};
		}>,
		reply: FastifyReply
	) {
		const { key } = request.query;

		if (!key || typeof key !== 'string') {
			throw new ApiExceptions('Неверный формат ключа сайта', 1510, 400);
		}
		const site = new PortfolioServices().getSiteItem(key);

		if (site) {
			reply.send({
				response: 'ok',
				item: site
			});
		} else {
			throw new ApiExceptions('Сайт не найден', 1500, 404);
		}
	}
}
