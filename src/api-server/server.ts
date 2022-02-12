import { Constant } from '../constant';
import { loadEnv } from '../config';
import { createServer } from './app';

async function bootstrap() {
	await loadEnv();
	const server = createServer();

	await server.listen(Constant.AppServerPort, (_, address) => console.log(`server listening on ${address}`));
}

bootstrap().then();
