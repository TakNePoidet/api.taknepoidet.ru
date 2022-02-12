import path from 'path';
import fs from 'fs';
import { ModelSitePortfolio } from '../models/portfolio';
import { Constant } from '../constant';

export class PortfolioServices {
	private get sitesList(): Record<string, ModelSitePortfolio> {
		try {
			return JSON.parse(fs.readFileSync(path.join(Constant.PathData, '../data', 'portfolio.json'), 'utf8'));
		} catch (e) {
			return {};
		}
	}

	getSiteList(): ModelSitePortfolio[] {
		return Object.values(this.sitesList);
	}

	getSiteItem(key: string): ModelSitePortfolio | null {
		const site = this.sitesList[key];

		if (site) {
			return site;
		}
		return null;
	}
}
