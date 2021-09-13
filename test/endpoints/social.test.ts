import { createServer } from '../../src/app';
import { SocialServices } from '../../src/services/social-services';

const mockSocialServicesGetAll = jest.fn();
const mockSocialServicesGetItem = jest.fn();

jest.mock('../../src/services/social-services', () => ({
	SocialServices: jest.fn().mockImplementation(() => ({
		getAll: mockSocialServicesGetAll,
		getItem: mockSocialServicesGetItem
	}))
}));

beforeEach(() => {
	mockSocialServicesGetAll.mockClear();
	mockSocialServicesGetItem.mockClear();
});

describe('Social networking techniques', () => {
	const app = createServer();

	describe('/social.getAll', () => {
		test('[GET]', async () => {
			mockSocialServicesGetAll.mockImplementationOnce(() => []);
			const response = await app.inject({ method: 'GET', url: '/methods/social.getAll' });

			expect(response.statusCode).toBe(200);
			const result = JSON.parse(response.payload);

			expect(result.response).toBe('ok');
			expect(Array.isArray(result.items)).toBe(true);
		});

		test('[POST]', async () => {
			const response = await app.inject({ method: 'POST', url: '/methods/social.getAll' });

			expect(response.statusCode).toBe(404);
		});
	});

	describe('/social.getItem', () => {
		test('[GET] No social network key', async () => {
			const response = await app.inject({ method: 'GET', url: '/methods/social.getItem' });

			expect(response.statusCode).toBe(400);
			const result = JSON.parse(response.payload);

			expect(result.response).toBe('error');
			expect(result.errorMessage).toBe('Неверный формат ключа социальной сети');
		});

		test('[GET] With a non-existent key', async () => {
			mockSocialServicesGetItem.mockImplementationOnce(() => null);
			const response = await app.inject({ method: 'GET', url: '/methods/social.getItem?key=test' });

			expect(response.statusCode).toBe(404);
			const result = JSON.parse(response.payload);

			expect(result.response).toBe('error');
			expect(result.errorMessage).toBe('Социальная сеть не найдена');
		});

		test('[GET] Correct request', async () => {
			mockSocialServicesGetItem.mockImplementationOnce(() => ({}));
			const response = await app.inject({ method: 'GET', url: '/methods/social.getItem?key=whatsapp' });

			expect(response.statusCode).toBe(200);
			const result = JSON.parse(response.payload);

			expect(result.response).toBe('ok');
		});
		test('[POST]', async () => {
			const response = await app.inject({ method: 'POST', url: '/methods/social.getItem' });

			expect(response.statusCode).toBe(404);
		});
	});
});
