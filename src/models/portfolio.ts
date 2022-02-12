import { Block } from '../types/blocks';
import { Image } from './image';

export interface ModelSitePortfolio {
	slug: string;
	title: string;
	tags: string[];
	description: string;
	text: Block[];
	link: string;
	color: string | null;
	icon: Image;
	screenshot: Image;
	cover: Image;
}
