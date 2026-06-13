# Release pipeline

Stream Kit uses [Changesets](https://github.com/changesets/changesets) for versioning and GitHub Actions for building and publishing releases. The app is currently on the **alpha** pre-release channel (`0.1.0-alpha.x`).

## Overview

```text
PR with changeset → merge to main → Version Packages PR → merge → git tag (v*) → CI build → GitHub Release
                                                                                              ↓
                                                                                    Microsoft Store (optional)
```

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| [`.github/workflows/release.yml`](../.github/workflows/release.yml) | Push to `main` | Opens or updates a **Version Packages** PR; on merge, creates a `v*` git tag |
| [`.github/workflows/build-release.yml`](../.github/workflows/build-release.yml) | Push tag `v*` | Builds macOS + Windows installers, MSIX bundle, GitHub Release artifacts |

## Adding a changeset

When your PR includes a user-facing change to the desktop app, add a changeset:

```bash
pnpm changeset
```

1. Select **@stream-kit/app** only (packages like `@stream-kit/site` are ignored; workspace deps are not versioned unless you add a changeset for them).
2. Choose the bump type: `patch`, `minor`, or `major`.
3. Write a short summary for the changelog.
4. Commit the generated `.changeset/*.md` file with your PR.

## Release flow

1. Merge a PR that contains one or more changesets into `main`.
2. The **Release** workflow opens a **Version Packages** PR (or updates an existing one).
3. Review the version bump and changelog, then merge the Version Packages PR.
4. The Release workflow pushes a tag like `v0.1.0-alpha.1` to GitHub (separate step after the Version Packages PR).
5. The **Build Release** workflow starts automatically on that tag push.

Publish the draft release on GitHub when you are ready to ship.

### Build did not start?

**Build Release** only runs when a `v*` tag is pushed *and* the workflow file exists on `main`. Tags pushed before `build-release.yml` was merged do not retroactively trigger a build.

To build an existing tag manually:

1. Go to **Actions → Build Release → Run workflow**
2. Enter the tag (e.g. `v0.1.0-alpha.1`) and run

Or re-push the tag from your machine:

```bash
git push origin refs/tags/v0.1.0-alpha.1 --force
```

## Alpha channel

The repo is in Changesets pre-release mode with tag `alpha` (see [`.changeset/pre.json`](../.changeset/pre.json)). Version bumps produce prerelease versions such as `0.1.0-alpha.1`.

To leave the alpha channel and publish stable releases:

```bash
pnpm changeset pre exit
pnpm version-packages
```

Commit the result, then continue with the normal release flow.

## Version sync

Only [`packages/app/package.json`](../packages/app/package.json) is versioned by Changesets. After each `changeset version`, [`scripts/sync-app-version.mjs`](../scripts/sync-app-version.mjs) copies the version to:

- [`packages/app/src-tauri/tauri.conf.json`](../packages/app/src-tauri/tauri.conf.json)
- [`packages/app/src-tauri/Cargo.toml`](../packages/app/src-tauri/Cargo.toml)
- [`packages/app/src-tauri/tauri.windows.conf.json`](../packages/app/src-tauri/tauri.windows.conf.json) — sets `bundle.windows.wix.version` to a numeric-only MSI version (e.g. `0.1.0-alpha.3` → `0.1.0.3`). WiX does not accept semver pre-release labels like `alpha`.

## Local builds

Build desktop installers:

```bash
pnpm build
pnpm tauri build
```

Build a Microsoft Store MSIX bundle (Windows only):

```bash
pnpm build
pnpm --filter @stream-kit/app tauri:windows:build -- --arch x64,arm64 --runner pnpm
```

Output:

- Tauri installers: `packages/app/src-tauri/target/release/bundle/`
- MSIX bundle: `packages/app/src-tauri/target/msix/*.msixbundle`

## GitHub secrets

### Automatic

| Secret | Purpose |
|--------|---------|
| `GITHUB_TOKEN` | Provided by GitHub Actions for releases and changesets |

### Microsoft Store (required for Store publish job)

Configure these in **Settings → Secrets and variables → Actions**:

| Secret | Purpose |
|--------|---------|
| `AZURE_AD_TENANT_ID` | Azure AD tenant for Partner Center API |
| `AZURE_AD_APPLICATION_CLIENT_ID` | App registration client ID |
| `AZURE_AD_APPLICATION_SECRET` | App registration client secret |
| `SELLER_ID` | Partner Center seller ID |
| `MSSTORE_PRODUCT_ID` | Store product ID after app registration |

Also set repository variable **`MSSTORE_PUBLISH`** to `true` when all Store secrets are configured. Without it, the Store publish job is skipped so CI does not fail before Partner Center is set up.

See [Publish app updates to Microsoft Store with GitHub Actions](https://learn.microsoft.com/en-us/windows/apps/publish/msstore-dev-cli/github-actions) for creating the Azure AD app and obtaining credentials.

### Optional (later)

| Secret | Purpose |
|--------|---------|
| `TAURI_SIGNING_PRIVATE_KEY` | Tauri updater signing |
| `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` | Updater key password |
| Windows code signing certificate | Signed NSIS/MSI on GitHub Releases (Store re-signs MSIX) |

## Microsoft Store setup

1. Enroll as a [Microsoft Store developer](https://learn.microsoft.com/en-us/windows/apps/get-started/sign-up).
2. Register the app in [Partner Center](https://partner.microsoft.com/dashboard/apps-and-games/overview) as an MSIX app.
3. Update [`packages/app/src-tauri/gen/windows/bundle.config.json`](../packages/app/src-tauri/gen/windows/bundle.config.json):
   - Set `publisher` to the exact Partner Center publisher CN (replace the `CN=Stream Kit B.V.` placeholder).
   - Ensure `publisherDisplayName` matches Partner Center (`Stream Kit B.V.`).
4. Configure GitHub secrets and set `MSSTORE_PUBLISH=true`.
5. Merge a Version Packages PR; CI uploads the MSIX bundle to GitHub Releases and submits to Partner Center.

## Build artifacts per platform

| Platform | Artifacts |
|----------|-----------|
| macOS | `.dmg`, `.app` (universal: Apple Silicon + Intel) |
| Windows | `.msi`, `.exe` (NSIS), `.msixbundle` |
| Microsoft Store | `.msixbundle` (x64 + arm64) |

## Notes

- macOS alpha builds may be unsigned; users may see Gatekeeper warnings until Apple Developer signing is configured.
- `bundle.publisher` in Tauri config must not match `productName` (`Stream Kit`); use `Stream Kit B.V.`.
- GitHub Releases are created as **drafts**; publish manually after verifying artifacts.
