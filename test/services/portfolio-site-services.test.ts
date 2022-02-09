// eslint-disable-next-line import/order
import { mockPathJoin, mockReadFileSync } from '../setup';

jest.mock('../../src/utility/meta.ts', () => ({
	getMetaGlobal() {
		return { __dirname: './test', __filename: './test/test.ts' };
	}
}));

const methods = {
	sitesList: 'sitesList'
};

import { PortfolioServices } from '../../src/services/portfolio-services';

beforeEach(() => {
	mockReadFileSync.mockClear();
	mockPathJoin.mockClear();
});
describe('PortfolioSiteServices', () => {
	describe('Reading json file', () => {
		test('Successfully', () => {
			const value = [{
				key: 'news'
			}];

			mockReadFileSync.mockReturnValue(JSON.stringify(value));
			mockPathJoin.mockReturnValue('./');
			const portfolioServices = new PortfolioServices();

			expect(portfolioServices[methods.sitesList]).toEqual(value);
			expect(mockReadFileSync).toBeCalledTimes(1);
		});

		test('Error', () => {
			const portfolioServices = new PortfolioServices();

			mockReadFileSync.mockImplementation(() => {
				throw new Error();
			});
			mockPathJoin.mockReturnValue('./');
			expect(portfolioServices[methods.sitesList]).toEqual({});
		});
	});

	describe('Retrieving data', () => {
		const portfolioServices = new PortfolioServices();

		const data  = {
			news: {key: 'news'}
		}
		const mockSitesList = jest
			.spyOn(
				portfolioServices,
				// @ts-ignore
				methods['sitesList'],
				'get'
			)
			.mockReturnValue(data as never);

		beforeEach(() => mockSitesList.mockClear())

		test('Search for a value in an array', () => {

			expect(portfolioServices.getSiteItem('news')).toEqual(data.news);
			expect(portfolioServices.getSiteItem('telegram')).toBeNull();
			expect(mockSitesList).toBeCalledTimes(2)



		});

		test('All values', () => {
			const result = portfolioServices.getSiteList();

			expect(result).not.toBeNull();
			expect(Array.isArray(result)).toBe(true);
			expect(result).toHaveLength(1);
			expect(mockSitesList).toBeCalledTimes(1)
		});
	});
});
