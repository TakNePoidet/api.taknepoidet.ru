import path from 'path';
import fs from 'fs';
import { Constant } from '../constant';

export interface SocialItem {
	key: string;
	link: string;
	nik: string;
	name: string;
	types: Array<'social' | 'messenger' | 'email' | 'work' | 'phone'>;
}

export class SocialServices {
	private get socialList(): SocialItem[] {
		try {
			return JSON.parse(fs.readFileSync(path.join(Constant.PathData, '../data', 'social-list.json'), 'utf8'));
		} catch (e) {
			return [];
		}
	}

	getList(): SocialItem[] {
		return this.socialList;
	}

	getItem(key: string): SocialItem | null {
		const { socialList } = this;
		const social = socialList.find((item) => item.key === key);

		if (social) {
			return social;
		}
		return null;
	}
}
