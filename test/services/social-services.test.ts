import fs from 'fs';
import path from 'path';
import { mocked } from 'ts-jest/utils';
import { SocialServices } from '../../src/services/social-services';

jest.mock('fs');
jest.mock('path');

const methods = {
	socialList: 'socialList'
};

describe('SocialServices', () => {
	describe('Reading json file', () => {
		test('Successfully', () => {
			const value = JSON.stringify([
				{
					key: 'vk',
					link: 'https://vk.com/taknepoidet',
					nik: '@taknepoidet',
					name: 'VK',
					types: ['social', 'messenger']
				}
			]);
			const socialServices = new SocialServices();

			mocked(fs.readFileSync as jest.Mock).mockReturnValue(value);
			mocked(path.join as jest.Mock).mockReturnValue('./');
			expect(socialServices[methods.socialList]).toEqual([
				{
					key: 'vk',
					link: 'https://vk.com/taknepoidet',
					nik: '@taknepoidet',
					name: 'VK',
					types: ['social', 'messenger']
				}
			]);
		});

		test('Error', () => {
			const socialServices = new SocialServices();

			mocked(fs.readFileSync as jest.Mock).mockImplementation(() => {
				throw new Error();
			});
			mocked(path.join as jest.Mock).mockReturnValue('./');
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
