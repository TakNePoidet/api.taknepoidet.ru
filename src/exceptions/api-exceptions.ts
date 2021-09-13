export class ApiExceptions extends Error {
	constructor(public message: string, public code: number, public httpCode = 500) {
		super(message);
	}
}
