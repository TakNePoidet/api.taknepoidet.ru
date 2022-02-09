import fastify, { FastifyInstance } from 'fastify';
import { register } from './router/web';

export function createServer(): FastifyInstance {
	const server = fastify();

	register(server);
	return server;
}
