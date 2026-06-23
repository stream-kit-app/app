# Stream Kit — Roadmap / TODO

> Versie 0.1.0 — laatst bijgewerkt: juni 2026  
> Doel: volwaardig alternatief voor StreamElements én Streamer.bot

Legenda: `[x]` klaar · `[~]` deels klaar · `[ ]` nog open

## Huidige sterke punten

- [x] Actiesysteem (trigger → conditie → handler)
- [x] Twitch plugin (brede EventSub + chat coverage)
- [x] OBS WebSocket plugin (scenes, sources, stream/record, hotkeys)
- [x] Bot plugin — commands, timers, moderation, built-in commands, overview settings (voorheen Commands plugin)
- [x] TTS (Piper lokaal, StreamElements-token, ElevenLabs)
- [x] WebSocket plugin (custom integraties)
- [x] Core handlers (audio, TypeScript scripts, externe programma's, process watcher)
- [x] Core variabelen (global, user, action scope) + Maps (persistente key-value stores)
- [x] Schedule triggers (Cron + Scheduled) in Core plugin
- [x] Plugin-architectuur (built-in + externe zip-plugins)
- [x] Plugin updates (manifest URL, check/install, startup check)
- [x] Dashboard (`/`) — stat cards, verbindingen, pluginstatus
- [x] i18n (NL + EN)

---

## P0 — Productbasis (nodig voor elke richting)

- [~] Dashboard uitbreiden — basis klaar; recente events-widget en lijst actieve acties nog open
- [x] Bot plugin — commands, timers, moderation, built-in commands, overview settings
- [~] Publieke installer + release-kanaal — alpha CI/builds (Windows); stabiel kanaal voor alle platformen nog open
- [~] Documentatie uitbreiden — core, bot, websocket, dashboard, schedule, updates klaar; OBS-plugin doc + gebruikershandleiding nog open
- [ ] Import/export van acties en commands (backup/restore)
- [ ] Stabiliseren van API's en database-schema's (richting v1.0)

---

## P1 — Streamer.bot-pariteit

### State & actielogica

- [x] Persistente globale variabelen (Core Set/Get handlers, PluginStore)
- [x] Per-gebruiker variabelen (Core user scope, persistent per username)
- [ ] Sub-actions / herbruikbare actiegroepen
- [ ] Actie-queues (algemene handler-queue)
- [ ] Quote-systeem
- [ ] Credits / rollen-systeem
- [~] Timers & geplande triggers — Core Cron/Scheduled + Bot interval timers; geavanceerde planning nog open

### Platform-uitbreiding

- [ ] YouTube handlers uitbreiden (moderatie, polls, memberships, etc.)
- [ ] Twitch triggers/handlers aanvullen (goals, charity, ad breaks, shoutout received)
- [ ] Donatie-platform triggers (Streamlabs, StreamElements events, Ko-fi, etc.)
- [ ] Discord plugin (berichten, rollen, voice events)
- [ ] Kick plugin
- [ ] TikTok Live plugin (optioneel)

### Hardware & systeem

- [ ] Globale hotkeys (app-breed, niet alleen OBS)
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

- [ ] Lokale overlay-server (browser source URL) — basis geïmplementeerd; widget-editor drag-and-drop nog open
- [ ] `@stream-kit/overlay-sdk` publiceren op npm en code bijwerken zodat overlay-projecten (scaffold, ZIP export, bundler) de package gebruiken i.p.v. `vendor/overlay-sdk` + Vite/TS aliases
- [ ] Alert-widgets (follow, sub, bits, raid, channel points, donation)
- [ ] Widget-editor (drag-and-drop of template-gebaseerd)
- [ ] Chatbox-overlay widget
- [ ] Timer-, teller- en doel-widgets
- [ ] Leaderboard-widgets
- [ ] Activity feed / recent events widget

### Monetisatie & engagement

- [ ] Donatie-integraties (PayPal, Stripe, etc.)
- [ ] Loyalty / punten-systeem
- [ ] Channel points store UI (eigen rewards, niet alleen Twitch events)
- [ ] Tip goals & progress tracking

### Hosting & ecosysteem

- [ ] Optionele cloud-hosted overlays (SE-achtige URL)
- [ ] Widget marketplace / community templates
- [ ] Volledige StreamElements API-koppeling (niet alleen TTS)

---

## P3 — Ecosysteem & power features

- [ ] Community plugin marketplace
- [ ] Action templates & delen
- [ ] Remote control / companion app
- [ ] Speaker.bot / Meld Studio integratie
- [~] Betere test/simulate-modus — Test-knop per actie (dummy trigger data); volledige keten-simulator nog open
- [ ] Merch/store-koppelingen
- [ ] Uitgebreidere appearance/thema-instellingen

---

## Technische schuld & documentatie

- [ ] README bijwerken: OBS + WebSocket in plugin-tabel; projectstructuur (`commands/` → `bot/`, OBS/WebSocket toevoegen)
- [ ] README status-sectie: documentatie is niet meer "minimaal" — afstemmen op `/docs`
- [ ] Meer voorbeeld-acties / starter-templates voor nieuwe gebruikers
- [ ] E2E-tests voor kritieke flows (OAuth, actie-uitvoering, commands)
