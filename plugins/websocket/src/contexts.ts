export type WsMessageContext = {
	connectionId: string;
	connectionName: string;
	url: string;
	message: string;
	isJson: boolean;
	data?: unknown;
	/** Logical connections that share the same pooled socket. */
	affectedConnectionIds?: string[];
};

export type WsConnectionStateContext = {
	connectionId: string;
	connectionName: string;
	url: string;
	/** Logical connections that share the same pooled socket. */
	affectedConnectionIds?: string[];
};
