export interface File {
	path: string;
}

export interface FileImage extends File {
	type: 'image/svg+xml' | 'image/png' | 'image/jpg';
	width: number;
	height: number;
}
