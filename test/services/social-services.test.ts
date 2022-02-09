// eslint-disable-next-line import/order
import { mockPathJoin, mockReadFileSync } from '../setup';

jest.mock('../../src/utility/meta.ts', () => ({
	getMetaGlobal() {
		return { __dirname: './test', __filename: './test/test.ts' };
	}
}));

const methods = {
	socialList: 'socialList'
};

import { SocialServices } from '../../src/services/social-services';

beforeEach(() => {
	mockReadFileSync.mockClear();
	mockPathJoin.mockClear();
});
describe('SocialServices', () => {
	describe('Reading json file', () => {
		test('Successfully', () => {
			const value = [
				{
					key: 'vk',
					link: 'https://vk.com/taknepoidet',
					nik: '@taknepoidet',
					name: 'VK',
					types: ['social', 'messenger']
				}
			];

			mockReadFileSync.mockReturnValue(JSON.stringify(value));
			mockPathJoin.mockReturnValue('./');
			const socialServices = new SocialServices();

			expect(socialServices[methods.socialList]).toEqual(value);
			expect(mockReadFileSync).toBeCalledTimes(1);
		});

		test('Error', () => {
			const socialServices = new SocialServices();

			mockReadFileSync.mockImplementation(() => {
				throw new Error();
			});
			mockPathJoin.mockReturnValue('./');
			expect(socialServices[methods.socialList]).toEqual([]);
		});
	});

	describe('Retrieving data', () => {
		const socialServices = new SocialServices();

		jest
			.spyOn(
				socialServices,
				// @ts-ignore
				'socialList',
				'get'
			)
			.mockReturnValue([
				{
					key: 'whatsapp',
					link: 'https://api.whatsapp.com/send?phone=+79177747838?text=%20%D0%94%D0%9E%D0%A0%D0%9E%D0%A3%20%C2%AF_(%E3%83%84)_/%C2%AF',
					nik: '8 (917) 77-47-838',
					name: 'WhatsApp',
					types: ['messenger']
				}
			] as never);

		test('Search for a value in an array', () => {
			expect(socialServices.getItem('whatsapp')).toEqual({
				key: 'whatsapp',
				link: 'https://api.whatsapp.com/send?phone=+79177747838?text=%20%D0%94%D0%9E%D0%A0%D0%9E%D0%A3%20%C2%AF_(%E3%83%84)_/%C2%AF',
				nik: '8 (917) 77-47-838',
				name: 'WhatsApp',
				types: ['messenger']
			});
			expect(socialServices.getItem('telegram')).toBeNull();
		});

		test('All values', () => {
			const result = socialServices.getList();

			expect(result).not.toBeNull();
			expect(Array.isArray(result)).toBe(true);
			expect(result).toHaveLength(1);
		});
	});
});
