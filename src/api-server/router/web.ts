import { Router } from 'fastify-route-group';
import { FastifyInstance, FastifyReply } from 'fastify';
import { SocialController } from '../controllers/social-controller';
import { PortfolioController } from '../controllers/portfolio-controller';
import { ApiExceptions } from '../../exceptions/api-exceptions';

function errorHandler(error: Error | ApiExceptions, _, reply: FastifyReply) {
	let errorMessage = error.message;
	let errorCode = 0;
	let httpStatus = 500;

	if (error instanceof ApiExceptions) {
		errorMessage = error.message;
		errorCode = error.code;
		httpStatus = error.httpCode;
	}

	reply.code(httpStatus).send({
		response: 'error',
		errorMessage,
		errorCode
	});
}

export function register(server: FastifyInstance): void {
	const router = new Router(server);

	router.namespace('methods', () => {
		router.prefix('social.', () => {
			router.get('getList', { errorHandler }, SocialController.getList);
			router.get(
				'getItem',
				{
					errorHandler,
					schema: {
						querystring: {
							key: { type: 'string' }
						}
					}
				},
				SocialController.getItem
			);
		});

		router.prefix('portfolio.', () => {
			router.get('getSiteList', { errorHandler }, PortfolioController.getSiteList);
			router.get(
				'getSiteItem',
				{
					errorHandler,
					schema: {
						querystring: {
							key: { type: 'string' }
						}
					}
				},
				PortfolioController.getSiteItem
			);
		});
	});
}
