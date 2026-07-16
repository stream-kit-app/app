# Stream Kit — Roadmap / TODO

> Versie 0.1.0 — laatst bijgewerkt: 16 juli 2026  
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
- [x] Plugin-architectuur (built-in + externe zip-plugins)
- [x] Plugin updates (manifest URL, check/install, startup check)
- [x] Dashboard (`/`) — stat cards, verbindingen, pluginstatus, running-actions widget
- [x] i18n (NL + EN)
- [x] Inbound WebSocket API server (remote control; plugin-extensible via `app.api`)

---

## P0 — Productbasis (nodig voor elke richting)

- [~] Dashboard uitbreiden — basis + running-actions klaar; recente events-widget nog open
- [x] Bot plugin — commands, timers, moderation, custom roles, built-in commands, overview settings
- [~] Publieke installer + release-kanaal — alpha CI/builds (Windows); stabiel kanaal voor alle platformen nog open
- [~] Documentatie uitbreiden — plugins (incl. OBS, rankings, overlay) + guide grotendeels klaar; onboarding/starter-templates nog open
- [x] Import/export — acties + commands JSON import/export klaar
- [ ] Stabiliseren van API's en database-schema's (richting v1.0)

---

## P1 — Streamer.bot-pariteit

### State & actielogica

- [x] Persistente globale variabelen (Core Set/Get handlers, PluginStore)
- [x] Per-gebruiker variabelen (Core user scope, persistent per username)
- [ ] Sub-actions / herbruikbare actiegroepen
- [x] Actie-queues (algemene handler-queue)
- [ ] Quote-systeem
- [x] Custom roles — Bot plugin Roles + command permissions (`role:<id>`); sessie-credits via collections/actions
- [~] Timers & geplande triggers — Core Cron/Scheduled + Bot interval timers; geavanceerde planning nog open

### Platform-uitbreiding

- [~] YouTube — triggers grotendeels klaar (memberships, super chat, polls, etc.); handlers nog chat-only (send/delete)
- [~] Twitch triggers/handlers aanvullen — shoutout + commercial handlers klaar; goals, charity, ad-break en shoutout-received triggers nog open
- [ ] Donatie-platform triggers (Streamlabs, StreamElements events, Ko-fi, etc.)
- [ ] Discord plugin (berichten, rollen, voice events)
- [ ] Kick plugin
- [ ] TikTok Live plugin (optioneel)

### Hardware & systeem

- [x] Globale hotkeys (app-breed, niet alleen OBS)
- [ ] Stream Deck integratie
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
- [~] Loyalty / punten-systeem — Rankings plugin MVP klaar; SE-achtige store/redeems nog open
- [ ] Channel points store UI (eigen rewards, niet alleen Twitch events)
- [ ] Tip goals & progress tracking

### Hosting & ecosysteem

- [ ] Optionele cloud-hosted overlays (SE-achtige URL)
- [ ] Cloud file uploads — `InputFile` (`@stream-kit/ui`) ondersteunt nu lokale browse; later uploads naar cloud storage (rank/tier icons, media, etc.)
- [ ] Widget marketplace / community templates
- [ ] Volledige StreamElements API-koppeling (niet alleen TTS)

---

## P3 — Ecosysteem & power features

- [ ] Community plugin marketplace
- [ ] Action templates & delen
- [~] Remote control / companion app — inbound WebSocket API server (actions/commands/vars/collections/queues/overlays + plugin `app.api`); dedicated companion app nog open
- [ ] Speaker.bot / Meld Studio integratie
- [~] Betere test/simulate-modus — Test-knop per actie (dummy trigger data) + overlay runTest; volledige keten-simulator nog open
- [ ] Merch/store-koppelingen
- [ ] Uitgebreidere appearance/thema-instellingen

---

## Technische schuld & documentatie

- [ ] README bijwerken: OBS, WebSocket, Rankings, Overlay in plugin-tabel; TTS Piper; projectstructuur (`commands/` → `bot/`); installer-claim afstemmen op Windows release CI
- [ ] README status-sectie: documentatie is niet meer "minimaal" — afstemmen op `/docs`
- [ ] Meer voorbeeld-acties / starter-templates voor nieuwe gebruikers
- [ ] E2E-tests voor kritieke flows (OAuth, actie-uitvoering, commands)
