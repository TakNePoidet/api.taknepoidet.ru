import { BlockBase, TypeBlock } from '../types-block';
import { FileImage } from '../../files';

export interface BlockImageData {
	caption: string | null;
	alt: string | null;
	image: FileImage;
}
export interface BlockImage extends BlockBase {
	type: TypeBlock.Image;
	data: BlockImageData;
}
