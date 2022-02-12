import { BlockBase, TypeBlock } from '../types-block';

export interface BlockParagraph extends BlockBase {
	type: TypeBlock.Paragraph;
	data: {
		text: string;
	};
}
