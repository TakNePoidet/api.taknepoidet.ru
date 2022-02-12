import { Constant } from '../constant';

export function convertAbsolutFileToLink(pathname: string): string {
	return `${pathname.replace(`${Constant.Storage}`, '')}`;
}
