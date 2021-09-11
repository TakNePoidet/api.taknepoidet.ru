import * as dotenv from 'dotenv';
import findUp from 'find-up';

dotenv.config({ path: findUp.sync('.env') });
