import { TxtNode, TxtTextNode } from '@textlint/ast-node-types/src';
import { TypeBlock } from '../../types/blocks/types-block';
import { Block, BlockImageData } from '../../types/blocks';
import { imageConverter, listConverter, textConverter } from './converter';

export interface ParserOption {
	rootDir: string;
}

export async function parserHeader(section: TxtNode | TxtTextNode): Promise<Block> {
	const blockValue = await textConverter(section.children);

	if (typeof blockValue !== 'string') {
		return blockValue;
	}
	return {
		type: TypeBlock.Header,
		data: {
			text: blockValue,
			level: section.depth
		}
	};
}

export async function parserList(section: TxtNode | TxtTextNode): Promise<Block> {
	return {
		type: TypeBlock.List,
		data: {
			style: section.ordered ? 'ordered' : 'unordered',
			items: await listConverter(section.children)
		}
	};
}

export async function parserImages(children: TxtTextNode[], options: ParserOption): Promise<Block> {
	const start = children.findIndex(({ type }: TxtNode) => type === 'Image');
	const preparedData = [];
	const images: BlockImageData[] = [];

	for (let i = start; i < children.length; i += 1) {
		let stop = children.slice(i + 1).findIndex(({ type }: TxtNode) => type === 'Image');

		if (stop < 0) {
			stop = children.length - 1;
		}
		const nodeImage = children[i];
		const nodes = children.slice(i, stop + 1);

		i = stop;
		preparedData.push([nodeImage, nodes]);
	}

	for await (const [nodeImage, nodes] of preparedData) {
		images.push(await imageConverter(nodeImage, nodes, options));
	}

	if (images.length > 1) {
		return {
			type: TypeBlock.Gallery,
			data: {
				items: images
			}
		};
	}
	return {
		type: TypeBlock.Image,
		data: images[0]
	};
}

export async function parserParagraph(section: TxtNode | TxtTextNode, options: ParserOption): Promise<Block> {
	const types = Array.from(section.children).map(({ type }) => type);

	if (types.includes('Image')) {
		return await parserImages(section.children, options);
	}
	const blockValue = await textConverter(section.children);

	return {
		type: TypeBlock.Paragraph,
		data: {
			text: blockValue
		}
	};
}
