import { BlockParagraph } from './paragraph';
import { BlockList } from './list';
import { BlockImage } from './image';
import { BlockHeader } from './header';
import { BlockGallery } from './gallery';

export type Block = BlockHeader | BlockParagraph | BlockImage | BlockGallery | BlockList;
