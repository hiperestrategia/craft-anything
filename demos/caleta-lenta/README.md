# Caleta Lenta

Original sample for a HubSpot conversation: a fictional liveaboard directory with three boats, three itineraries, departure dates, prices and an inquiry form. It is not a real operator, and it does not take payment.

Craft Anything keeps a project as `craft.json` plus an `app/` folder (normally under `Documents/Craft Anything`). This copy lives in the repository so it can be reviewed and reused:

`demos/caleta-lenta/`

The engine did not generate it. A rebuild needs a coding agent signed in on the machine (`craft-anything-cli doctor` names what is missing). Nothing here was taken from a live booking site.

## Open the demo

From this folder:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open http://127.0.0.1:8765/app/

The inquiry form uses English field names (`firstname`, `lastname`, `email`, `phone`, and so on) so a later HubSpot form can map them. Submitting it only shows a confirmation in the browser.
