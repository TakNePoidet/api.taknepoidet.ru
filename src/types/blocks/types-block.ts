export const enum TypeBlock {
	Header = 'header',
	Paragraph = 'paragraph',
	Image = 'image',
	Gallery = 'gallery',
	List = 'list'
}

export interface BlockBase {
	type: TypeBlock;
	data: any;
}
