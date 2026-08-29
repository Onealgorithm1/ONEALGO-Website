/* Apple Business Connect requires a logo of at least 1024x1024 (PNG/JPG/HEIC/SVG).
   The largest OneAlgorithm mark in the repo is 512x512, and favicon.svg is only a
   wrapper around that same 512 bitmap, so there is no vector source to scale from.
   Rendered here at 2x with smoothing - soft at full size, but the place card draws
   it at roughly 50px, where it is indistinguishable. Replace if a true vector or a
   larger original ever turns up. */
import puppeteer from 'puppeteer'
import { readFileSync, writeFileSync } from 'node:fs'
const b64 = readFileSync('public/globe-logo.png').toString('base64')
const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1024, height: 1024, deviceScaleFactor: 1 })
await page.setContent(
  `<style>html,body{margin:0;width:1024px;height:1024px;background:#fff}
   img{width:1024px;height:1024px;image-rendering:auto;display:block}</style>
   <img src="data:image/png;base64,${b64}">`)
await page.waitForSelector('img')
await new Promise(r => setTimeout(r, 400))
writeFileSync('public/work/apple-logo-1024.png', await page.screenshot({ type: 'png' }))
await browser.close()
console.log('wrote public/work/apple-logo-1024.png')
