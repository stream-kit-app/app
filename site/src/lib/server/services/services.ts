import { PluginsService } from './plugins.service';
import { ReviewsService } from './reviews.service';

export class Services {
	plugins() {
		return new PluginsService();
	}

	reviews() {
		return new ReviewsService();
	}
}
