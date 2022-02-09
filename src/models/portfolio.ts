import { Image } from './image';

export interface ModelSitePortfolio {
	slug: string;
	title: string;
	tags: string[];
	description: string;
	link: string;
	color: string | null;
	icon: Image;
	screenshot: Image;
	cover: Image;
}
