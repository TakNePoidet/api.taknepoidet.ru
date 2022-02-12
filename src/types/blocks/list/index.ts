import { BlockBase, TypeBlock } from '../types-block';

export interface BlockList extends BlockBase {
	type: TypeBlock.List;
	data: {
		style: 'ordered' | 'unordered';
		items: string[];
	};
}
