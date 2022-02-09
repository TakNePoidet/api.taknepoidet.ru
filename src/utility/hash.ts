import fs from 'fs';
import crypto from 'crypto';

export function fileHash(filename: string, algorithm: 'sha1' | 'md5' | 'sha256' | 'sha512' = 'sha1'): Promise<string> {
	return new Promise((resolve, reject) => {
		const hash = crypto.createHash(algorithm);

		try {
			const s = fs.createReadStream(filename);

			s.on('data', (data) => {
				hash.update(data);
			});
			s.on('end', () => {
				resolve(hash.digest('hex'));
			});
		} catch (error) {
			reject(new Error('calc fail'));
		}
	});
}

export function encodeBase64url(str: string): string {
	return Buffer.from(str, 'utf8').toString('base64');
}
