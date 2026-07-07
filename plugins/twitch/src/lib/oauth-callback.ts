export type ImplicitOAuthCallback = {
	accessToken?: string;
	error?: string;
	errorDescription?: string;
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
			undefined
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
