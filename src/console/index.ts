import { Commander } from 'console-commander';
import { loadEnv } from '../config';
import { ImportPortfolio } from './commands/ImportPortfolio';

const commander = new Commander();

async function app() {
	await loadEnv();
	commander.append(ImportPortfolio);
	await commander.start();
}
app().catch((error) => console.error(error.message));
