import { Commander } from 'console-commander';
import { ImportPortfolio } from './commands/ImportPortfolio';

const commander = new Commander();

commander.append(ImportPortfolio);
commander.start().catch((error) => console.error(error.message));
