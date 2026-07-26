# Stream Kit — Roadmap / TODO

> Versie 0.1.0 — laatst bijgewerkt: 26 juli 2026 (cloud sync actions/queues via PocketBase)
> Doel: volwaardig alternatief voor StreamElements én Streamer.bot

Legenda: `[x]` klaar · `[~]` deels klaar · `[ ]` nog open

## Huidige sterke punten

- [x] Actiesysteem (trigger → conditie → handler)
- [x] Twitch plugin (brede EventSub + chat coverage)
- [x] OBS WebSocket plugin (scenes, sources, stream/record, hotkeys)
- [x] Bot plugin — commands, timers, moderation, custom roles, built-in commands, overview settings (voorheen Commands plugin)
- [x] TTS (Piper lokaal, StreamElements-token, ElevenLabs)
- [x] WebSocket plugin (custom integraties)
- [x] Core handlers (audio, TypeScript scripts, externe programma's, process watcher)
- [x] Core variabelen (global, user, action scope) + Collections (persistente key-value stores)
- [x] Schedule triggers (Cron + Scheduled) in Core plugin
- [x] Globale hotkeys (Core Hotkey trigger + HotkeyManager)
- [x] Overlays — lokale browser-source server + ready-made widget templates
- [x] Rankings plugin (punten, tiers, watch-time, leaderboard, overlay)
- [x] Quotes plugin (opgeslagen quotes, UI, seeded chat commands)
- [x] Stream Deck plugin (triggers, feedback handlers, Elgato companion via API Server)
- [x] Plugin-architectuur (built-in + externe zip-plugins)
- [x] Plugin updates (manifest URL, check/install, startup check)
- [x] Dashboard (`/`) — stat cards, verbindingen, pluginstatus, running-actions widget
- [x] i18n (NL + EN)
- [x] Inbound WebSocket API server (remote control; plugin-extensible via `app.api`)
- [x] Stream Kit account (PocketBase login/register/profile + `app.auth` voor plugins)
- [x] Cloud user files (`user_files` + `app.userFiles`, plan quota, handler Upload/Cloud, rankings icons)
- [x] Cloud sync actions/queues (`user_actions` / `user_action_queues` + `app.configSync`, offline-first LWW, profile status)

---

## P0 — Productbasis (nodig voor elke richting)

- [~] Dashboard uitbreiden — basis + running-actions klaar; recente events-widget nog open
- [x] Bot plugin — commands, timers, moderation, custom roles, built-in commands, overview settings
- [~] Publieke installer + release-kanaal — alpha CI/builds (Windows); stabiel kanaal voor alle platformen nog open
- [~] Documentatie uitbreiden — plugins + guide + API-catalogus (alle triggers/handlers per plugin) klaar; onboarding/starter-templates nog open
- [x] Import/export — acties + commands JSON import/export klaar
- [ ] Stabiliseren van API's en database-schema's (richting v1.0)

---

## P1 — Streamer.bot-pariteit

### State & actielogica

- [x] Persistente globale variabelen (Core Set/Get handlers, PluginStore)
- [x] Per-gebruiker variabelen (Core user scope, persistent per username)
- [ ] Sub-actions / herbruikbare actiegroepen
- [x] Actie-queues (algemene handler-queue)
- [x] Quote-systeem — Quotes plugin (store, UI, handlers, seeded !quote/!addquote/!delquote)
- [x] Custom roles — Bot plugin Roles + command permissions (`role:<id>`); sessie-credits via collections/actions
- [~] Timers & geplande triggers — Core Cron/Scheduled + Bot interval timers; geavanceerde planning nog open

### Platform-uitbreiding

- [x] YouTube — triggers + chat/moderation handlers (send, delete, ban/timeout)
- [x] Twitch triggers/handlers aanvullen — shoutout/commercial handlers + goals, charity, ad-break, shoutout-received triggers
- [ ] Donatie-platform triggers (Streamlabs, StreamElements events, Ko-fi, etc.)
- [~] Discord plugin — bot token + invite OAuth, berichten, rollen, voice events klaar; must-haves nog open: member join/leave, moderatie (delete/timeout/kick/ban), reactie add/remove, embeds bij send message, channel/role pickers in handlers
- [ ] Kick plugin
- [ ] TikTok Live plugin (optioneel)

### Hardware & systeem

- [x] Globale hotkeys (app-breed, niet alleen OBS)
- [x] Stream Deck integratie — Stream Kit-plugin + Elgato companion (`integrations/stream-deck`); Marketplace-distributie nog open
- [ ] MIDI triggers/handlers
- [ ] Voice control (optioneel)

### Bot & chat

- [~] Timed/auto messages — Bot interval timers klaar; geavanceerde scheduling (tijdslots, stream-only, etc.) nog open
- [~] Spam-filter & auto-mod — Bot Moderation-pagina + rule engine klaar; dedicated spam-filter UX nog open
- [ ] Multi-kanaal / multi-profiel support
- [~] Whisper-bot flows — Twitch whisper trigger/handler klaar; dedicated bot-whisper flows nog open

---

## P2 — StreamElements-pariteit

### Overlays & alerts

- [~] Lokale overlay-server (browser source URL) + ready-made widgets; drag-and-drop widget-editor nog open
- [~] Alert-widgets — template-based alerts (follow, sub, bits, raid, channel points, donation-style) klaar; verdere polish/uitbreiding open
- [ ] Widget-editor (drag-and-drop)
- [x] Chatbox-overlay widget (template)
- [x] Timer-, teller- en doel-widgets (templates)
- [x] Leaderboard-widgets (template)
- [ ] Activity feed / recent events widget

### Monetisatie & engagement

- [ ] Donatie-integraties (PayPal, Stripe, etc.)
- [~] Loyalty / punten-systeem — Rankings plugin MVP klaar (incl. ignore list); SE-achtige store/redeems nog open
- [ ] Channel points store UI (eigen rewards, niet alleen Twitch events)
- [ ] Tip goals & progress tracking

### Hosting & ecosysteem

- [ ] Optionele cloud-hosted overlays (SE-achtige URL)
- [x] Cloud file uploads — `user_files` + handler Upload/Cloud; auto-migratie van lokale paden bij actieve subscription; rankings icons
- [x] Cloud sync of actions/settings — actions + action queues via PocketBase (`app.configSync`); overlays/plugin-store sync nog open
- [ ] Widget marketplace / community templates
- [ ] Volledige StreamElements API-koppeling (niet alleen TTS)

---

## P3 — Ecosysteem & power features

- [~] Community plugin marketplace — site `/plugins` marketplace UI (sidebar filters, detail Overview/Reviews, ratings schema); desktop Stream Kit account auth klaar (`app.auth`); site cookie-auth + echte community uploads nog open
- [ ] Action templates & delen
- [~] Remote control / companion app — inbound WebSocket API server (actions/commands/vars/collections/queues/overlays + plugin `app.api`); dedicated companion app nog open
- [ ] Speaker.bot / Meld Studio integratie
- [~] Betere test/simulate-modus — Test-knop per actie (dummy trigger data) + overlay runTest; volledige keten-simulator nog open
- [ ] Merch/store-koppelingen
- [ ] Uitgebreidere appearance/thema-instellingen

---

## Technische schuld & documentatie

- [ ] README bijwerken: OBS, WebSocket, Rankings, Overlay in plugin-tabel; TTS Piper; projectstructuur (`commands/` → `bot/`); installer-claim afstemmen op Windows release CI
- [ ] README status-sectie: documentatie is niet meer "minimaal" — afstemmen op `/docs` (API-catalogus + volledige plugin-lijst)
- [ ] Meer voorbeeld-acties / starter-templates voor nieuwe gebruikers
- [ ] E2E-tests voor kritieke flows (OAuth, actie-uitvoering, commands)
