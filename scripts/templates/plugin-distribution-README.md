# {{PLUGIN_NAME}} plugin distribution

This repository publishes the official **Stream Kit** distribution for the **{{PLUGIN_NAME}}** plugin (`{{PLUGIN_KEY}}`).

It does **not** contain plugin source code. Development happens in the main app monorepo:

- [stream-kit-app/app](https://github.com/stream-kit-app/app)

## Install

1. Download `plugin-{{PLUGIN_KEY}}.zip` from the [latest release](https://github.com/{{REPO_SLUG}}/releases/latest).
2. Open **Stream Kit** → **Plugins** → **Install plugin**.
3. Select the zip file and enable the plugin.

## Updates

If you installed this plugin from a release zip, Stream Kit can check for updates automatically when `updateManifestUrl` is set in the installed manifest. This repository's `manifest.json` on `main` is the update source.

## Development

See the plugin docs in the main repository:

- [Plugin development](https://github.com/stream-kit-app/app/blob/main/docs/plugins/development.md)
- [Plugin updates](https://github.com/stream-kit-app/app/blob/main/docs/plugins/updates.md)

## License

See [LICENSE](https://github.com/stream-kit-app/app/blob/main/LICENSE) in the main Stream Kit repository.
