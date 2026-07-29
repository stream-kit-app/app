/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
	const collection = app.findCollectionByNameOrId('pbc_8929103851');

	// Owners may cancel their own active membership (status → cancelled) and set cancelledAt/endsAt.
	collection.updateRule =
		'@request.auth.id != "" && user = @request.auth.id && status = "active" && @request.body.status = "cancelled" && @request.body.cancelledAt:isset = true && @request.body.endsAt:isset = true && (@request.body.user:isset = false || @request.body.user = user) && (@request.body.subscription:isset = false || @request.body.subscription = subscription) && (@request.body.purchasedAt:isset = false || @request.body.purchasedAt = purchasedAt)';

	return app.save(collection);
}, (app) => {
	const collection = app.findCollectionByNameOrId('pbc_8929103851');

	collection.updateRule =
		'@request.auth.id != "" && user = @request.auth.id && status = "active" && @request.body.status = "cancelled" && (@request.body.user:isset = false || @request.body.user = user) && (@request.body.subscription:isset = false || @request.body.subscription = subscription) && (@request.body.purchasedAt:isset = false || @request.body.purchasedAt = purchasedAt)';

	return app.save(collection);
});
