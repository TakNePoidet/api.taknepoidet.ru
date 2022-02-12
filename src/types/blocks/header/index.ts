import { BlockBase, TypeBlock } from '../types-block';

export const enum HeaderLevel {
	first = 1,
	Second = 2,
	Third = 3,
	Fourth = 4,
	Fifth = 5,
	Sixth = 6
}

export interface BlockHeader extends BlockBase {
	type: TypeBlock.Header;
	data: {
		text: string;
		level: HeaderLevel;
	};
}
