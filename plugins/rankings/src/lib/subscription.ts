export type Subscription = {
	dispose: () => void;
};

const triggerSubscriptions = new WeakMap<object, Subscription>();

export function setTriggerSubscription(trigger: object, subscription: Subscription): void {
	disposeTriggerSubscription(trigger);
	triggerSubscriptions.set(trigger, subscription);
}

export function disposeTriggerSubscription(trigger: object): void {
	const subscription = triggerSubscriptions.get(trigger);

	if (subscription) {
		subscription.dispose();
		triggerSubscriptions.delete(trigger);
	}
}
