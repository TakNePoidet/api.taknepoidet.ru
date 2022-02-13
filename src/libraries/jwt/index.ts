import { createHmac } from 'crypto';
import { decodeBase64url, encodeBase64url, returnError, stringify } from '../../utility';
import { Constant } from '../../constant';

export const enum Algorithm {
	HS256 = 'HS256'
}
export const enum HeaderJwtKey {
	Type = 'typ',
	Algorithm = 'alg'
}
export interface HeaderJwt {
	[HeaderJwtKey.Type]: 'JWT';
	[HeaderJwtKey.Algorithm]: Algorithm;
}

export class Jwt<T extends Record<string, any>> {
	public static StringRegExpJWT = '(?<header>[A-Za-z0-9]+)\\.(?<payload>[A-Za-z0-9=]+)\\.(?<signature>[A-Za-z0-9]+)';

	private algorithms = {
		HS256: 'sha256'
	};

	private key = Constant.StorageJWTKey;

	private header = new Map<keyof HeaderJwt, string>();

	constructor(options: Partial<HeaderJwt> = {}) {
		const header = { typ: 'JWT', alg: Algorithm.HS256, ...options };

		for (const headerKey in header) {
			if ({}.hasOwnProperty.call(header, headerKey)) {
				this.header.set(headerKey as keyof HeaderJwt, header[headerKey]);
			}
		}
	}

	generate(data: T): string | never {
		try {
			const unsignedToken = this.getUnsignedToken(data);

			const signature = this.getSignature(unsignedToken);

			return `${unsignedToken}.${signature}`;
		} catch (e) {
			return returnError(e);
		}
	}

	static decode<T extends Record<string, any>>(token: string, verified = false): T | never {
		const regExp = new RegExp(`^${Jwt.StringRegExpJWT}$`);

		if (!regExp.test(token)) {
			throw new Error('Строка не является JWT токеном');
		}
		const { groups } = regExp.exec(token);

		const payload = JSON.parse(decodeBase64url(groups.payload)) as T;

		if (verified) {
			const header: HeaderJwt = JSON.parse(decodeBase64url(groups.header));

			const jvt = new Jwt(header);

			if (!jvt.verified(payload, groups.signature)) {
				returnError(new Error('JWT токен невалиден'));
			}
		}
		return payload;
	}

	private verified(payload: T, signature: string): boolean {
		const unsignedToken = this.getUnsignedToken(payload);

		return this.getSignature(unsignedToken) === signature;
	}

	private getUnsignedToken(data: T) {
		const header = encodeBase64url(stringify(Object.fromEntries(this.header.entries())));
		const payload = encodeBase64url(stringify(data));

		return `${header}.${payload}`;
	}

	private getSignature(unsignedToken: string): string {
		return createHmac(this.algorithms[this.header.get(HeaderJwtKey.Algorithm)], this.key)
			.update(unsignedToken)
			.digest('hex');
	}
}
