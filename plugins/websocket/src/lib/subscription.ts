export type Subscription = {
	dispose: () => void;
};

const subscriptionsById = new Map<string, Subscription>();
const subscriptionsByObject = new WeakMap<object, Subscription>();

function triggerId(trigger: object): string | undefined {
	if (!('id' in trigger)) {
		return undefined;
	}

	const id = (trigger as { id: unknown }).id;
	return typeof id === 'string' && id.length > 0 ? id : undefined;
}

export function setTriggerSubscription(trigger: object, subscription: Subscription): void {
	const id = triggerId(trigger);
	disposeTriggerSubscription(trigger);

	if (id) {
		subscriptionsById.set(id, subscription);
		return;
	}

	subscriptionsByObject.set(trigger, subscription);
}

export function disposeTriggerSubscription(trigger: object): void {
	const id = triggerId(trigger);
	const subscription = id ? subscriptionsById.get(id) : subscriptionsByObject.get(trigger);

	if (!subscription) {
		return;
	}

	subscription.dispose();

	if (id) {
		subscriptionsById.delete(id);
	} else {
		subscriptionsByObject.delete(trigger);
	}
}
