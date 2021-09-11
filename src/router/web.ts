import { Router } from 'fastify-route-group';
import { FastifyInstance, FastifyReply } from 'fastify';
import { SocialController } from '../controllers/SocialController';
import { ApiExceptions } from '../exceptions/ApiExceptions';

function errorHandler(error: Error | ApiExceptions, _, reply: FastifyReply) {
	let errorMessage = error.message;
	let errorCode = 0;
	let httpStatus = 500;

	if (error instanceof ApiExceptions) {
		errorMessage = error.message;
		errorCode = error.httpCode;
		httpStatus = error.httpCode;
	}
	reply
		.send({
			response: 'error',
			errorMessage,
			errorCode
		})
		.status(httpStatus);
}

export function register(server: FastifyInstance) {
	const router = new Router(server);

	router.namespace('methods', () => {
		router.prefix('social.', () => {
			router.get('getAll', { errorHandler }, SocialController.getAll);
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
	});
}
