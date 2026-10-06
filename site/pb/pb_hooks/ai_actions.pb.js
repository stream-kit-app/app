/// <reference path="../pb_data/types.d.ts" />

/**
 * POST /api/ai/generate-action
 * Turns a natural language description into a draft action via Claude.
 * Requires an entitled subscription; usage is counted per user per day in `ai_usage`.
 * The request to Anthropic is built server-side so this is never an open proxy.
 */

routerAdd(
	'POST',
	'/api/ai/generate-action',
	(e) => {
		const entitlement = require(`${__hooks}/shared/entitlement.js`);
		const ai = require(`${__hooks}/shared/ai-actions.js`);

		const auth = entitlement.requestAuth(e);
		if (!auth) {
			throw new UnauthorizedError('You must be signed in to use AI actions.');
		}

		if (!entitlement.hasEntitledMembership(e.app, auth.id)) {
			throw new ForbiddenError('An active subscription is required to use AI actions.');
		}

		const apiKey = $os.getenv('ANTHROPIC_API_KEY');
		if (!apiKey) {
			throw new InternalServerError('AI actions are not configured.');
		}

		const input = ai.parseRequestBody(e.requestInfo().body);
		const day = ai.usageDay();

		const findUsage = (app) => {
			try {
				return app.findFirstRecordByFilter('ai_usage', 'user = {:user} && day = {:day}', {
					user: auth.id,
					day
				});
			} catch (_) {
				return null;
			}
		};

		// Reserve a slot before calling Anthropic. Write transactions run one at a time,
		// so parallel requests can't all pass the limit check before any of them counts.
		let limitReached = false;
		let remaining = 0;
		e.app.runInTransaction((txApp) => {
			let row = findUsage(txApp);
			if (!row) {
				row = new Record(txApp.findCollectionByNameOrId('ai_usage'));
				row.set('user', auth.id);
				row.set('day', day);
				row.set('count', 0);
				row.set('inputTokens', 0);
				row.set('outputTokens', 0);
			}

			if (row.getInt('count') >= ai.DAILY_LIMIT) {
				limitReached = true;
				return;
			}

			row.set('count', row.getInt('count') + 1);
			txApp.save(row);
			remaining = Math.max(0, ai.DAILY_LIMIT - row.getInt('count'));
		});

		if (limitReached) {
			throw new TooManyRequestsError('Daily AI limit reached. Try again tomorrow.');
		}

		// Failed calls aren't billed, so give the reserved slot back.
		const releaseReservation = () => {
			e.app.runInTransaction((txApp) => {
				const row = findUsage(txApp);
				if (row && row.getInt('count') > 0) {
					row.set('count', row.getInt('count') - 1);
					txApp.save(row);
				}
			});
		};

		const model = $os.getenv('AI_MODEL') || ai.DEFAULT_MODEL;
		const headers = {
			'content-type': 'application/json',
			'x-api-key': apiKey,
			'anthropic-version': ai.ANTHROPIC_VERSION,
			'anthropic-beta': ai.FALLBACK_BETA
		};

		// Required for API keys that are not scoped to a single workspace.
		const workspaceId = $os.getenv('ANTHROPIC_WORKSPACE_ID');
		if (workspaceId) {
			headers['anthropic-workspace-id'] = workspaceId;
		}

		let res;
		try {
			res = $http.send({
				url: ai.ANTHROPIC_URL,
				method: 'POST',
				timeout: 120,
				headers,
				body: JSON.stringify(ai.buildRequest(model, input))
			});
		} catch (error) {
			releaseReservation();
			throw error;
		}

		if (res.statusCode === 429 || res.statusCode === 529) {
			releaseReservation();
			throw new TooManyRequestsError('The AI service is busy. Try again in a moment.');
		}

		if (res.statusCode < 200 || res.statusCode >= 300) {
			releaseReservation();
			e.app.logger().error('AI action request failed', 'status', res.statusCode, 'body', res.json);
			throw new InternalServerError('The AI request failed.');
		}

		const json = res.json;
		const tokens = json && json.usage ? json.usage : {};

		e.app.runInTransaction((txApp) => {
			const row = findUsage(txApp);
			if (!row) {
				return;
			}
			row.set(
				'inputTokens',
				row.getInt('inputTokens') +
					(tokens.input_tokens || 0) +
					(tokens.cache_read_input_tokens || 0) +
					(tokens.cache_creation_input_tokens || 0)
			);
			row.set('outputTokens', row.getInt('outputTokens') + (tokens.output_tokens || 0));
			txApp.save(row);
		});

		if (json.stop_reason === 'refusal') {
			throw new BadRequestError('The AI declined this request.');
		}

		if (json.stop_reason === 'max_tokens') {
			throw new BadRequestError('The described action is too large. Try splitting it up.');
		}

		const text = ai.responseText(json);
		if (!text) {
			throw new InternalServerError('The AI returned no result.');
		}

		let action;
		try {
			action = JSON.parse(text);
		} catch (_) {
			throw new InternalServerError('The AI returned an invalid result.');
		}

		return e.json(200, {
			action,
			raw: text,
			remaining
		});
	},
	$apis.requireAuth()
);
