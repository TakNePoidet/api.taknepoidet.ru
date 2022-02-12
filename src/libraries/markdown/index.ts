import markdown from '@textlint/markdown-to-ast';
import { TxtParentNode } from '@textlint/ast-node-types';
import { Block } from '../../types/blocks';
import { parserHeader, parserList, ParserOption, parserParagraph } from './parser';

export function textToAST(input: string): TxtParentNode {
	return markdown.parse(input);
}

export async function markdownParser(input: string, { rootDir }: ParserOption): Promise<Block[]> {
	const AST = textToAST(input);

	const blocks = new Set<Block>();

	for await (const section of AST.children) {
		switch (section.type) {
			case 'Header':
				blocks.add(await parserHeader(section));
				break;
			case 'List':
				blocks.add(await parserList(section));
				break;
			default:
				blocks.add(await parserParagraph(section, { rootDir }));
				break;
		}
	}

	return Array.from(blocks.values());
}
