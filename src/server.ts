import {app} from "./app";
import {APP_SERVER_PORT} from './constant';

async function bootstrap() {
	const server = await app();
	await server.listen(APP_SERVER_PORT, (_, address) => console.log(`server listening on ${address}`));
}

bootstrap().then();
