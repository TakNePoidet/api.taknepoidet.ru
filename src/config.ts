import { findUp } from 'find-up';
import * as dotenv from 'dotenv';

findUp('.env').then((env) => {
	dotenv.config({ path: env });
});
