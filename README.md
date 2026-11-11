# meridianvu-site
Site source for meridianvu.com. Zip bundles named bundle-*.zip uploaded to the repo root are unpacked by .github/workflows/apply-bundle.yml. After a bundle applies, make any small normal commit (like this README) so GitHub Pages rebuilds.

## How Claude publishes (never ask Meridian to upload)
Meridian does not upload or change GitHub settings herself. Any Claude working on this site publishes on its own, in this order:
1. If the session can `git push` to this repo, push to main.
2. If her Mac is linked: put a git bundle or zip in `~/Claude/GitHub Publisher/queue/` named `meridiosyncrasy-gh__meridianvu-site__<label>.bundle` (or `.zip`, unpacked over the repo root, with optional `_delete.txt`), then open `~/Claude/GitHub Publisher/Publish to GitHub.command` from Finder. It pushes with her Mac's GitHub sign-in and writes `publish-log.txt` (look for `RESULT OK`).
3. Otherwise upload a `bundle-*.zip` through github.com in her signed-in browser. The Apply bundle workflow unpacks it. If that run sits on Queued for more than 10 minutes, use route 2.
Then confirm the Pages build finishes and the changed pages load live.
