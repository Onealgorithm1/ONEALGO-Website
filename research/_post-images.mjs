/* Google Business Profile post images.
 *
 * Google rejects WebP — verified against the API on 2026-08-26:
 *   "Image format is not supported" (photos.additional_photo_urls, subErrorCode 100)
 * and every client screenshot in public/work is WebP. Their guidance is
 * 1200x900 (4:3), JPG or PNG, 10KB-5MB, with the important content kept central
 * because anything not 4:3 gets centre-cropped.
 *
 * Rather than add an image library, this renders the existing 1280x800 card
 * screenshot into a 1200x900 frame with puppeteer and screenshots it as JPEG —
 * the same tool the repo already uses for its checks.
 *
 *   node research/_post-images.mjs
 */
import puppeteer from 'puppeteer'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const JOBS = [
  ['public/work/inspect-this-home-card.webp', 'public/work/gbp-inspect-this-home.jpg'],
  ['public/work/boards-professor-card.webp', 'public/work/gbp-boards-professor.jpg'],
]

const browser = await puppeteer.launch({ headless: 'new' })
for (const [src, out] of JOBS) {
  if (!existsSync(src)) { console.log(`skip (missing) ${src}`); continue }
  const b64 = readFileSync(src).toString('base64')
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 })
  /* `cover` was wrong: a 1280x800 source filling a 4:3 frame overflows to
     1440 wide and shears 240px off the sides, which cut the client's own name
     off the screenshot. `contain` keeps the whole browser frame intact and
     letterboxes it on the brand navy instead — 1200x750 of screenshot, 75px of
     ground top and bottom. Nothing important is ever cropped. */
  await page.setContent(
    `<style>html,body{margin:0;height:100%;background:#0d1b2a;display:flex;align-items:center;justify-content:center}
     img{width:1200px;height:750px;object-fit:contain;display:block}</style>
     <img src="data:image/webp;base64,${b64}">`,
  )
  await page.waitForSelector('img')
  await new Promise((r) => setTimeout(r, 400))
  const buf = await page.screenshot({ type: 'jpeg', quality: 86 })
  writeFileSync(out, buf)
  console.log(`${out}  1200x900  ${(buf.length / 1024).toFixed(0)}KB`)
  await page.close()
}
await browser.close()
