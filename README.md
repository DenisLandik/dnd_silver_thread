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

## Saving, and the shared copy

Every edit is written twice: to this browser's local storage (key
`sheets-combined`), and to `state.json` on the **`state` branch** of this
repository. The page reads that file when it opens and whenever the tab is
brought back to the front, so a change made under the password shows up for
everyone reading the page - the DM included - without anyone copying anything.

Reading needs no credentials at all. Writing needs a token, which only the
device that has one can do; everybody else is a reader.

### Giving a device permission to write

Unlock the page and press **Set up sync** at the top right. The panel that opens
walks through it and links straight to the right GitHub page; in short:

1. GitHub -> **Settings -> Developer settings -> Personal access tokens ->
   Fine-grained tokens -> Generate new token**.
2. Repository access: **Only select repositories** -> this repository.
3. Permissions -> Repository permissions -> **Contents: Read and write**.
   Nothing else is needed.
4. Set whatever expiry suits. Generate, and copy the token once.
5. Paste it into the panel and press **Save and test**.

*Save and test* performs a real write, so the line under the lock answers
immediately: *shared with everyone* means it worked, and anything else names
which of the steps above to go back to.

The token is kept in that browser's local storage under `st-sync-token`. It is
never part of the state, a backup file, or a saved copy of the page, and it
never reaches the shared copy. Losing the device means revoking the token on
GitHub; the worst it can do is edit this one repository.

### What the line under the lock means

- *shared copy: up to date* - this page matches what everyone else sees.
- *updated from the shared copy* - someone saved elsewhere; this page just took it.
- *shared with everyone* - this device's save went out.
- *saved on this device - no sync token here* - a reader's browser, or the token
  was never set.
- *newer changes are waiting* - the page is unlocked and a newer copy exists.
  It is not applied mid-edit; lock the page and it arrives.
- *offline - showing this device's copy* - no signal. Edits stay local and go out
  the next time a save succeeds.

Two people editing at once is last-write-wins. There is one editor here, so this
is a footnote rather than a problem.

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
state - which means it is in the shared copy, and the shared copy is public.
Treat the password as a guard against accidents, not as security: the check runs
in the browser, and anyone with developer tools can step around it. Do not reuse
a password that matters. The real authority is the sync token: without one, an
edit reaches nobody.

Forgotten it? Clearing the site's local storage (or the `__gate` key inside the
Backup data) resets it to unset.

## Installing it on a phone

Open the Pages URL in Safari or Chrome, then Share -> Add to Home Screen. It
gets its own icon, opens without browser chrome, and works with no signal: a
service worker caches the page on first visit.

Installing also matters for durability. iOS purges script-written storage for
sites you have not visited in about a week; an installed web app is not treated
the same way. Even so, keep a file backup of anything you would hate to retype.

## Backups

The Backup card at the bottom offers, in order of how much they protect you:

- **Save to file** - writes `silver-thread-YYYY-MM-DD.json`. Keep it in Files or
  iCloud. This is the one that survives a wiped browser or a lost phone.
- **Load from file** - reads one back. Requires the page to be unlocked.
- **Show data / Copy** - the same content as one line of text, for pasting into
  another device directly.
- The `state` branch is itself a history: every save is a commit, so an older
  `state.json` can be recovered from it.

The card also reports whether offline support is active on the device you are
looking at.
