import { PluginsService } from './plugins.service';

export class Services {
	plugins() {
		return new PluginsService();
	}
}
