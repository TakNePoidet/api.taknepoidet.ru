import { APP_SERVER_PORT } from '../constant';
import { createServer } from './app';

async function bootstrap() {
	const server = createServer();

	await server.listen(APP_SERVER_PORT, (_, address) => console.log(`server listening on ${address}`));
}

bootstrap().then();
