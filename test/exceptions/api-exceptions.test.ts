import { ApiExceptions } from '../../src/exceptions/api-exceptions';

describe('Api exceptions', () => {
	test('Passing all parameters', () => {
		const error = new ApiExceptions('Неверный формат ключа социальной сети', 1410, 400);

		expect(error.message).toBe('Неверный формат ключа социальной сети');
		expect(error.code).toBe(1410);
		expect(error.httpCode).toBe(400);
	});
	test('No server error status', () => {
		const error = new ApiExceptions('Неизвестная ошибка', 0);

		expect(error.message).toBe('Неизвестная ошибка');
		expect(error.code).toBe(0);
		expect(error.httpCode).toBe(500);
	});
});
