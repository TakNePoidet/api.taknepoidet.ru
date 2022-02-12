import { findUp } from 'find-up';
import * as dotenv from 'dotenv';

export async function loadEnv() {
	const env = await findUp('.env');

	dotenv.config({ path: env });
}
