import path from 'path';
import fs from 'fs';
import yaml from 'yaml';
import { Command } from 'console-commander';
import { saveFile } from '../../utility';
import { ModelSitePortfolio } from '../../models/portfolio';
import { __dirname, PATH_DATA } from '../../constant';

interface RawSite {
	slug: string;
	title: string;
	tags: string[];
	description: string;
	link: string;
	color: string | null;
	icon: string;
	screenshot: string;
	cover: string;
}

export class ImportPortfolio extends Command {
	get signature() {
		return 'import-portfolio';
	}

	get description() {
		return 'Импорт портфолио';
	}

	async handle() {
		const portfolio: Record<string, ModelSitePortfolio> = {};
		const rootPath = path.resolve(__dirname, '../submodule/portfolio/sites');
		const sources = fs
			.readdirSync(rootPath)
			.filter((item) => item.charAt(0) !== '.')
			.map((item) => `${rootPath}/${item}`);

		for await (const source of sources) {
			const slug = path.basename(source);
			const ymlFile = `${source}/config.yml`;

			if (!fs.existsSync(ymlFile)) {
				throw new Error('Нет yml файла');
			}

			const file = fs.readFileSync(ymlFile, 'utf8');
			const info: Omit<RawSite, 'slug'> = yaml.parse(file);

			portfolio[slug] = {
				...info,
				slug,
				icon: await saveFile(path.join(source, info.icon)),
				cover: await saveFile(path.join(source, info.cover)),
				screenshot: await saveFile(path.join(source, info.screenshot))
			};

			console.log(info.title);
		}
		fs.writeFileSync(path.join(PATH_DATA, 'portfolio.json'), JSON.stringify(portfolio, null, '\t'));
		return undefined;
	}
}