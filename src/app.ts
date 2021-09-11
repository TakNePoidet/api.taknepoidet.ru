import fastify, {FastifyInstance} from "fastify";
import {register} from "./router/web";

export async function app(): Promise<FastifyInstance> {
	const server = fastify();
	register(server);
	return server
}
