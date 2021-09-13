import { createServer } from './app';
import { APP_SERVER_PORT } from './constant';

async function bootstrap() {
	const server = createServer();

	await server.listen(APP_SERVER_PORT, (_, address) => console.log(`server listening on ${address}`));
}

bootstrap().then();
