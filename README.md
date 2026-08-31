# Silver Thread Party

Character sheets for Alaricks Alibor and Mina Junius, as a single self-contained
web page. `index.html` has no external dependencies except the Google Fonts
stylesheet, so it works from any static host — or straight off disk.

## Publishing it

1. Push this repo to GitHub.
2. Repo **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
3. After a minute the page is at `https://<user>.github.io/dnd_silver_thread/`.

**GitHub Pages only serves public repositories on a free plan.** If this repo is
private, Pages will refuse to publish until the repo is made public or the
account is on a paid plan. A public Pages site is readable by anyone with the
URL — it is not indexed, but it is not protected either.

## Saving

The page stores its state in the browser's local storage under the key
`sheets-combined`. That means:

- edits persist on the device that made them, across reloads and restarts;
- edits do **not** travel between devices on their own;
- clearing site data for the domain erases them.

Use the **Backup** card at the bottom of the page to move state between devices:
*Show data* prints everything as one line of JSON, and pasting that line into the
box on another device and pressing *Apply pasted data* loads it there.

## What is in the page

Per character: live hit points and resource pips with short/long rest buttons,
an editable kit list and coin purse, editable ability scores that recompute every
skill, save, passive Perception and spell DC, and a session notes box.

Tabs and the character switch are pure CSS — they work with JavaScript disabled.
Everything else degrades to correct static text rather than breaking.

## Read-only by default

The whole page opens read-only. The control at the top right shows the current
mode; tapping it asks for a password, and the first time it offers to set one.
Unlocking frees every editor on the page for both characters — hit points,
pips, rests, kit, coin, ability scores and notes. **Save & lock** writes the
change and returns the page to read-only.

Only a salted SHA-256 hash of the password is stored, alongside the rest of the
state. Treat this as a guard against accidents, not as security: the check runs
in the browser, and anyone with developer tools can step around it. Do not reuse
a password that matters.

Forgotten it? Clearing the site's local storage (or the `__gate` key inside the
Backup data) resets it to unset.
