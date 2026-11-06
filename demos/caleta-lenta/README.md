# Caleta Lenta

A fictional liveaboard directory for a HubSpot conversation: boats, trips, departure dates, prices and an inquiry form. It is not a real operator, and it does not take payment.

Craft Anything produced this copy. Clean-room study of a public booking site (visitor view only), then a rebuild with OpenRouter model `deepseek/deepseek-v4-pro`. The project record is `craft.json`. The pages are in `app/`. Screenshots and other captures of the original site are not in this folder.

The check scored the home page about 34% like the original on layout and about 2% like it on text. Headings, boat names and trip descriptions are invented. The wordmark is the words "CALETA LENTA" in a system font, not a copied logo. There are no photographs.

## Open the demo

From this folder:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open http://127.0.0.1:8765/app/

The inquiry form uses English field names (`firstname`, `lastname`, `email`, `phone`, `message`) so a HubSpot form can map them. Submitting it only shows a confirmation in the browser.
