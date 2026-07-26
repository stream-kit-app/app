import type { Handle } from '@sveltejs/kit';

import { PUBLIC_POCKETBASE_URL } from '$app/env/public';
import Pocketbase from 'pocketbase';

import { Services } from '../services/services';

export const boot: Handle = async ({ event, resolve }) => {
	event.locals.pocketbase = new Pocketbase(PUBLIC_POCKETBASE_URL);
	event.locals.services = new Services();
	event.locals.user = null;

	return resolve(event);
};
