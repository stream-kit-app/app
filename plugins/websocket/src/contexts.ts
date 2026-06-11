export type WsMessageContext = {
	connectionId: string;
	connectionName: string;
	url: string;
	message: string;
	isJson: boolean;
	data?: unknown;
};

export type WsConnectionStateContext = {
	connectionId: string;
	connectionName: string;
	url: string;
};
