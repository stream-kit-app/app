# Monetization strategy

Notes on whether and how Stream Kit can generate revenue. Written for internal planning; not user-facing.

## Summary

Charging money for the app itself is **difficult but not impossible**. Monetization is realistic if you avoid a classic “pay to download” model and focus on value-added services, community support, and long-term ecosystem plays.

## The core problem: competition is free

Stream Kit competes with tools like Streamer.bot, Firebot, Mix It Up, SAMMI, and Aitum — almost all of which are free (often open source, funded via donations). Streamers expect automation tools to cost nothing. A paywall on core functionality (triggers, handlers, chat bot, Twitch/YouTube integration) means most users will choose a free alternative, especially for a new product without community or track record.

At the time of writing, Stream Kit is at **v0.1.0**: no stable release, no installer, minimal documentation. Few people pay for experimental software. The product should be finished, stable, and distributed first — monetization comes after.

## Realistic monetization options

### Freemium / “Pro” tier

Keep the core free; charge for power features. Lumia Stream uses this model successfully with a subscription. Candidates for a Pro tier:

- Cloud sync of actions/settings across machines
- Premium TTS (e.g. ElevenLabs integration with resold credits and margin)
- Advanced analytics
- Priority support
- Higher limits on actions or plugins

The free tier must be good enough on its own to build a user base — that user base **is** the product.

### Donations / supporter model

Patreon, Ko-fi, or GitHub Sponsors, optionally with small perks (early access, supporter badge, Discord role). Streamer.bot relies heavily on this. It is not a large revenue stream but fits the current project phase and can start immediately.

### Plugin marketplace

Stream Kit’s architecture is built around external plugins (`.zip` install, plugin template, fixed API contract). Long term, a marketplace where plugin authors sell paid plugins and Stream Kit takes a cut (Stream Deck / Elgato model) is a strong structural option. This requires a substantial community first.

### Commercial license

The project uses a “source available” license rather than open source, so a model such as “free for personal use, paid for agencies or businesses” remains possible. The commercial streaming segment is relatively small.

## Recommended order of operations

1. **Now:** Do not paywall anything. Focus on a stable release, installer, auto-updates, and documentation. Add a Ko-fi/Patreon link in the app and README.
2. **After early traction** (active users, Discord community): Build one or two features with real server-side cost or clear added value (cloud sync, hosted TTS) and introduce a paid tier there. People pay more easily for ongoing services than for local-only software.
3. **Long term:** Marketplace and/or team features.

## Conclusion

A price tag on the app alone is not a realistic primary revenue model in this market. Freemium with cloud/TTS features plus donations **is** realistic — provided a free, stable version exists first to win users. The plugin architecture is the largest strategic advantage for long-term monetization.
