export const mockReadFileSync = jest.fn();
export const mockPathJoin = jest.fn();
jest.mock('fs', () => ({
	default: {
		get readFileSync() {
			return mockReadFileSync;
		}
	}
}));

jest.mock('path', () => ({
	default: {
		get join() {
			return mockPathJoin;
		}
	}
}));
