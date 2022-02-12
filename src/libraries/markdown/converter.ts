import path from 'path';
import { TxtNode, TxtTextNode } from '@textlint/ast-node-types';
import { saveFile } from '../storage';
import { BlockImageData } from '../../types/blocks';

export interface TextConverterOptions {
	rootDir: string;
}
export async function textConverter(nodes: Array<TxtNode | TxtTextNode>): Promise<string> {
	let text = '';
	let i = 0;

	for await (const node of nodes) {
		i += 1;
		if (node.type === 'Str') {
			text += node.value;
		}
		if (node.type === 'Link') {
			text += `<a href="${node.url}">${await textConverter(node.children)}</a>`;
		}

		if (node.type === 'Emphasis') {
			text += `<i>${await textConverter(node.children)}</i>`;
		}
	}

	return text.trim();
}

export async function imageConverter(
	nodeImage: TxtNode,
	nodes: TxtTextNode[],
	options: TextConverterOptions
): Promise<BlockImageData> {
	return {
		caption: nodes.length > 0 ? await textConverter(nodes) : null,
		alt: nodeImage.alt ?? null,
		image: await saveFile(path.resolve(options.rootDir, nodeImage.url))
	};
}
export async function listConverter(nodes: Array<TxtNode | TxtTextNode>): Promise<string[]> {
	const items = [];

	for await (const node of nodes) {
		items.push(await textConverter(node.children[0].children));
	}

	return items;
}
