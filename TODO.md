# Stream Kit — Roadmap / TODO

> Versie 0.1.0 — laatst bijgewerkt: juni 2026  
> Doel: volwaardig alternatief voor StreamElements én Streamer.bot

## Huidige sterke punten

- [x] Actiesysteem (trigger → conditie → handler)
- [x] Twitch plugin (brede EventSub + chat coverage)
- [x] OBS WebSocket plugin (scenes, sources, stream/record, hotkeys)
- [x] Commands plugin (Twitch + YouTube, permissions, cooldowns) — merged into Bot plugin
- [x] TTS (Piper lokaal, StreamElements-token, ElevenLabs)
- [x] WebSocket plugin (custom integraties)
- [x] Core handlers (audio, TypeScript scripts, externe programma's, process watcher)
- [x] Plugin-architectuur (built-in + externe zip-plugins)
- [x] i18n (NL + EN)

---

## P0 — Productbasis (nodig voor elke richting)

- [ ] Dashboard (`/`) — statusoverzicht: verbindingen, recente events, actieve acties
- [x] Bot plugin — commands, timers, moderation, built-in commands, overview settings
- [ ] Publieke installer + release-kanaal (Windows/macOS/Linux)
- [ ] Documentatie uitbreiden (OBS + WebSocket plugins, gebruikershandleiding)
- [ ] Import/export van acties en commands (backup/restore)
- [ ] Stabiliseren van API's en database-schema's (richting v1.0)

---

## P1 — Streamer.bot-pariteit

### State & actielogica

- [ ] Persistente globale variabelen (lezen/schrijven in handlers)
- [ ] Per-gebruiker variabelen (viewer state over sessies)
- [ ] Sub-actions / herbruikbare actiegroepen
- [ ] Actie-queues (niet alleen audio)
- [ ] Quote-systeem
- [ ] Credits / rollen-systeem
- [ ] Timers & geplande triggers

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

- [ ] Timed/auto messages — basic timers implemented in Bot plugin; advanced scheduling TBD
- [ ] Spam-filter & auto-mod regels UI
- [ ] Multi-kanaal / multi-profiel support
- [ ] Whisper-bot flows

---

## P2 — StreamElements-pariteit

### Overlays & alerts

- [ ] Lokale overlay-server (browser source URL)
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
- [ ] Betere test/simulate-modus voor actieketens
- [ ] Merch/store-koppelingen
- [ ] Uitgebreidere appearance/thema-instellingen

---

## Technische schuld & documentatie

- [ ] README bijwerken: OBS + WebSocket plugins toevoegen aan plugin-tabel
- [ ] Roadmap synchroniseren met daadwerkelijke plugin-status
- [ ] Meer voorbeeld-acties / starter-templates voor nieuwe gebruikers
- [ ] E2E-tests voor kritieke flows (OAuth, actie-uitvoering, commands)
