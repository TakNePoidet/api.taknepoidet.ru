import { BlockBase, TypeBlock } from '../types-block';
import { BlockImageData } from '../image';

export interface BlockGalleryData {
	items: BlockImageData[];
}
export interface BlockGallery extends BlockBase {
	type: TypeBlock.Gallery;
	data: BlockGalleryData;
}
