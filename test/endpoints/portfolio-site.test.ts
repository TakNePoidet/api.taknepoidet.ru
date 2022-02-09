// eslint-disable-next-line import/order
import { mockPathJoin } from '../setup';

const mockPortfolioServicesGetSiteList = jest.fn();
const mockPortfolioServicesGetSiteItem = jest.fn();

import { createServer } from '../../src/api-server/app';

jest.mock('../../src/utility/meta.ts');
jest.mock('../../src/services/portfolio-services', () => ({
	PortfolioServices: jest.fn().mockImplementation(() => ({
		 getSiteList: mockPortfolioServicesGetSiteList,
		getSiteItem: mockPortfolioServicesGetSiteItem
	}))
}));

beforeEach(() => {
	mockPortfolioServicesGetSiteList.mockClear();
	mockPortfolioServicesGetSiteItem.mockClear();
});

describe('Portfolio', () => {
	const app = createServer();

	beforeEach(() => {
		mockPathJoin.mockClear().mockReturnValue('./');
	});

	describe('/portfolio.getSiteList', () => {
		test('[GET]', async () => {
			mockPortfolioServicesGetSiteList.mockImplementationOnce(() => []);
			const response = await app.inject({ method: 'GET', url: '/methods/portfolio.getSiteList' });


			expect(mockPortfolioServicesGetSiteList).toBeCalledTimes(1)
			expect(mockPortfolioServicesGetSiteList.mock[0]).toEqual(undefined)
			expect(response.statusCode).toBe(200);
			const result = JSON.parse(response.payload);

			expect(result.response).toBe('ok');
			// expect(result.items).toBe([]);
			expect(Array.isArray(result.items)).toBe(true);
		});

		test('[POST]', async () => {
			const response = await app.inject({ method: 'POST', url: '/methods/portfolio.getSiteList' });

			expect(response.statusCode).toBe(404);
		});
	});

	describe('/portfolio.getSiteItem', () => {
		beforeEach(() => {
			mockPortfolioServicesGetSiteItem.mockClear()
		})
		test('[GET] No site key', async () => {
			const response = await app.inject({ method: 'GET', url: '/methods/portfolio.getSiteItem' });

			expect(response.statusCode).toBe(400);
			const result = JSON.parse(response.payload);

			expect(result.response).toBe('error');
			expect(result.errorMessage).toBe('Неверный формат ключа сайта');
		});

		test('[GET] With a non-existent key', async () => {
			mockPortfolioServicesGetSiteItem.mockImplementationOnce(() => null);
			const response = await app.inject({ method: 'GET', url: '/methods/portfolio.getSiteItem?key=test' });
			expect(mockPortfolioServicesGetSiteItem).toBeCalledTimes(1)
			expect(mockPortfolioServicesGetSiteItem.mock.calls).toEqual([['test']])
			expect(response.statusCode).toBe(404);
			const result = JSON.parse(response.payload);

			expect(result.response).toBe('error');
			expect(result.errorMessage).toBe('Сайт не найден');
		});

		test('[GET] Correct request', async () => {
			const value= {
				key: 'news'
			}
			mockPortfolioServicesGetSiteItem.mockClear().mockImplementationOnce(() => value);
			const response = await app.inject({ method: 'GET', url: '/methods/portfolio.getSiteItem?key=news' });
			expect(mockPortfolioServicesGetSiteItem).toBeCalledTimes(1)
			expect(mockPortfolioServicesGetSiteItem.mock.calls).toEqual([['news']])

			expect(response.statusCode).toBe(200);
			const result = JSON.parse(response.payload);
			expect(result.response).toBe('ok');
			expect(result.item).toEqual(value);
		});
		test('[POST]', async () => {
			const response = await app.inject({ method: 'POST', url: '/methods/portfolio.getSiteItem' });

			expect(response.statusCode).toBe(404);
		});
	});
});
