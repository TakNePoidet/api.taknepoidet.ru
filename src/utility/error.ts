export function returnError(error: Error): never {
	console.error(error.message, error.stack);
	throw error;
}
