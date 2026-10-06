import type { PluginAppApi } from '@stream-kit/plugin';

export type ImplicitOAuthCallback = {
	accessToken?: string;
	error?: string;
	errorDescription?: string;
	state?: string;
};

export function parseImplicitOAuthCallback(value: string): ImplicitOAuthCallback {
	const callbackUrl = new URL(value);
	const hashParams = new URLSearchParams(callbackUrl.hash.startsWith('#') ? callbackUrl.hash.slice(1) : callbackUrl.hash);
	const queryParams = callbackUrl.searchParams;

	return {
		accessToken: hashParams.get('access_token') ?? undefined,
		error: queryParams.get('error') ?? hashParams.get('error') ?? undefined,
		errorDescription:
			queryParams.get('error_description') ??
			hashParams.get('error_description') ??
			undefined,
		state: hashParams.get('state') ?? queryParams.get('state') ?? undefined
	};
}

export function describeOAuthError(
	error: string,
	errorDescription?: string,
	port = 9001
): string {
	if (error === 'redirect_mismatch') {
		const botHint = port === 9003 ? '' : ' Add http://localhost:9003 as well for the bot account.';
		return `Add http://localhost:${port} to OAuth Redirect URLs in the Twitch Developer Console.${botHint}`;
	}

	return errorDescription?.replace(/\+/g, ' ') ?? error;
}

export type ImplicitOAuthFlow = {
	/** Stop listening for this flow's callback. */
	cancel: () => void;
};

/**
 * Runs Twitch's implicit OAuth flow on a local redirect port. Listeners are registered
 * before the browser opens, only the callback carrying this flow's `state` is accepted
 * (OAuth URL events are global, so otherwise the main and bot account flows could
 * capture each other's token), and the listeners are removed once the flow ends.
 */
export async function startImplicitOAuthFlow(
	app: PluginAppApi,
	options: {
		port: number;
		clientId: string;
		scopes: string[];
		onToken: (accessToken: string) => void;
		onError: (description: string) => void;
		onCancel: () => void;
	}
): Promise<ImplicitOAuthFlow> {
	const port = await app.oauth.start({ ports: [options.port] });
	const state = crypto.randomUUID();

	let done = false;
	let unlistenUrl: (() => void) | undefined;
	let unlistenInvalidUrl: (() => void) | undefined;
	const finish = (): void => {
		if (done) {
			return;
		}
		done = true;
		unlistenUrl?.();
		unlistenInvalidUrl?.();
	};

	unlistenUrl = await app.oauth.onUrl((value: string) => {
		if (done) {
			return;
		}

		let callback: ImplicitOAuthCallback;
		try {
			callback = parseImplicitOAuthCallback(value);
		} catch {
			return;
		}

		if (callback.state !== state) {
			return;
		}

		finish();

		if (callback.error) {
			options.onError(describeOAuthError(callback.error, callback.errorDescription, port));
			return;
		}

		if (!callback.accessToken) {
			options.onError('Twitch did not return an access token.');
			return;
		}

		options.onToken(callback.accessToken);
	});
	unlistenInvalidUrl = await app.oauth.onInvalidUrl(() => {
		if (done) {
			return;
		}
		finish();
		options.onCancel();
	});

	const url = new URL('https://id.twitch.tv/oauth2/authorize');
	url.searchParams.set('response_type', 'token');
	url.searchParams.set('redirect_uri', `http://localhost:${port}`);
	url.searchParams.set('scope', options.scopes.join(' '));
	url.searchParams.set('client_id', options.clientId);
	url.searchParams.set('state', state);

	try {
		await app.opener.openUrl(url.toString());
	} catch (error) {
		finish();
		throw error;
	}

	return { cancel: finish };
}
