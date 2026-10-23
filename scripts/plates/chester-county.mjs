// Plates for /services/salesforce-consultant-chester-county. See the convention in scripts/plates.mjs.
//
// CHE-F1 (first plate, light): Salesforce list price for 10 users a month, per
//   edition, from EDITIONS below. Lead plate: --og renders og-chester-county.jpg
//   and salesforce-edition-cost-10-users-1600x900.jpg.
// CHE-F2: the eight largest industry groups in Chester County by paid employees.
// CHE-F3: Chester County and its neighbours (TIGER), the Malvern office, and the
//   straight-line distance to Exton, West Chester and Downingtown.
//
// ⛔ WHERE EVERY FIGURE COMES FROM (none is typed by hand except EDITIONS, which
//    is Salesforce's own price list and is dated):
// - EDITIONS: salesforce.com/sales/pricing/ and salesforce.com/service/pricing/,
//   read 23 October 2026 with curl and a browser user agent (the price cards are
//   in the server-rendered HTML; WebFetch still gets 403). Both pages list the
//   same five prices. Salesforce replaced Enterprise / Unlimited / Agentforce 1
//   with Core / Advanced / Max after our 1 September 2026 read. "Web Services
//   API" is an extra $25 a user a month on Pro Suite and included from Core up
//   (Sales Cloud comparison table, same read). Re-read before changing; keep
//   PRICES_CHECKED in step with the page (the page asserts it in dev).
// - CBP: US Census Bureau County Business Patterns 2023, county file
//   https://www2.census.gov/programs-surveys/cbp/datasets/2023/cbp23co.zip,
//   rows fipstate=42 fipscty=029 with a 2-digit NAICS code, copied by script
//   (emp = paid employees in the week of 12 March, est = establishments). The
//   totals match the 2026-10-21 api.census.gov pull in
//   onealgo-icm-oa/areas/sales/runs/2026-10-21_sf-nationwide/facts/economy.
//   NAICS 44 = 44-45 retail, 31 = 31-33 manufacturing in that file.
// - PLACES: Census 2023 Gazetteer, PA places (2023_gaz_place_42.txt), internal
//   point [lon, lat].
// - COUNTIES: Census cartographic boundary file cb_2023_us_county_500k (public
//   domain), simplified ONE-OFF on 2026-10-23 with
//     npx mapshaper@0.6 -i cb_2023_us_county_500k.shp
//       -filter "['42029','42045','42091','42011','42071','10003','24015'].indexOf(GEOID) > -1"
//       -simplify 20% keep-shapes -o format=geojson precision=0.0001
//   and pasted below by script. Nothing is fetched at build time.
// - The office point is the LocalBusiness `geo` in shared/companyProfile.ts,
//   read at generation time so the map and the schema can never disagree.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { box, wire, text, shape, round, TYPE } from './_lib.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const profile = fs.readFileSync(path.join(root, 'shared/companyProfile.ts'), 'utf8')
const geo = profile.match(/geo:\s*\{\s*latitude:\s*(-?[\d.]+),\s*longitude:\s*(-?[\d.]+)/)
if (!geo) throw new Error('office geo not found in shared/companyProfile.ts')
const OFFICE = [+geo[2], +geo[1]] // [lon, lat]

const PRICES_CHECKED = '23 October 2026'
const SEATS = 10
const EDITIONS = [
  { k: 'starter', name: 'Starter Suite', price: 25 },
  { k: 'pro', name: 'Pro Suite', price: 100, api: 25 },
  { k: 'core', name: 'Core', price: 195 },
  { k: 'advanced', name: 'Advanced', price: 395 },
  { k: 'max', name: 'Max', price: 550 },
]

/* ---- Data copied by script from the Census files named above (2026-10-23). ---- */
const CBP = [{"naics":"all","emp":262454,"est":15102},{"naics":"62","emp":39721,"est":1625},{"naics":"52","emp":30962,"est":994},{"naics":"44","emp":27318,"est":1353},{"naics":"54","emp":26727,"est":2464},{"naics":"72","emp":17006,"est":1065},{"naics":"55","emp":15810,"est":163},{"naics":"56","emp":15694,"est":1150},{"naics":"31","emp":15036,"est":520},{"naics":"42","emp":13547,"est":785},{"naics":"23","emp":13385,"est":1537},{"naics":"51","emp":10617,"est":329},{"naics":"81","emp":10240,"est":1498},{"naics":"48","emp":7719,"est":272},{"naics":"61","emp":7002,"est":273},{"naics":"71","emp":6107,"est":292},{"naics":"53","emp":3401,"est":661},{"naics":"22","emp":1409,"est":52},{"naics":"11","emp":633,"est":54},{"naics":"21","emp":87,"est":6},{"naics":"99","emp":33,"est":9}]
const PLACES = {"Downingtown borough":[-75.702163,40.008289],"Exton CDP":[-75.633061,40.029916],"Malvern borough":[-75.515363,40.033147],"West Chester borough":[-75.605422,39.959883]}
const COUNTIES = [
  { geoid: '24015', name: 'Cecil', rings: [[[-76.2333,39.7213],[-76.2293,39.7091],[-76.2127,39.6864],[-76.1866,39.6695],[-76.1618,39.6496],[-76.1475,39.6194],[-76.1357,39.6131],[-76.0887,39.5613],[-76.0762,39.5436],[-76.0638,39.5466],[-76.0471,39.5464],[-76.0369,39.5529],[-76.0177,39.5466],[-76.0064,39.5462],[-75.9997,39.5605],[-75.973,39.5705],[-75.9653,39.5789],[-75.9648,39.5865],[-75.9577,39.5925],[-75.9488,39.5894],[-75.9478,39.5806],[-75.9543,39.5752],[-75.9575,39.565],[-75.97,39.5573],[-75.9623,39.5361],[-75.9805,39.5291],[-75.9815,39.5162],[-75.9863,39.5104],[-75.9881,39.497],[-75.9948,39.4897],[-75.994,39.4762],[-75.9994,39.4659],[-75.9972,39.4569],[-75.9867,39.4613],[-75.9855,39.4699],[-75.9783,39.4705],[-75.9666,39.4628],[-75.9717,39.4569],[-75.9826,39.4353],[-75.9974,39.4303],[-76.0069,39.4145],[-76.0165,39.4085],[-76.0331,39.4031],[-76.0413,39.3906],[-76.0308,39.3855],[-75.9951,39.3847],[-75.9908,39.3746],[-75.9827,39.3675],[-75.9641,39.3747],[-75.9493,39.3725],[-75.9398,39.3678],[-75.932,39.3715],[-75.908,39.3645],[-75.8821,39.3643],[-75.8676,39.3678],[-75.8554,39.3646],[-75.8312,39.3742],[-75.8237,39.3814],[-75.7957,39.3772],[-75.7844,39.3804],[-75.7667,39.3775],[-75.7808,39.5503],[-75.7887,39.6582],[-75.7886,39.7222],[-75.7996,39.7219],[-75.9986,39.7216],[-76.1356,39.7216],[-76.2333,39.7213]]] },
  { geoid: '10003', name: 'New Castle', rings: [[[-75.5594,39.6298],[-75.5708,39.6268],[-75.5711,39.6213],[-75.562,39.6057],[-75.5562,39.6064],[-75.5594,39.6298]],[[-75.7886,39.7222],[-75.7887,39.6582],[-75.7808,39.5503],[-75.7667,39.3775],[-75.7601,39.2968],[-75.7149,39.2994],[-75.6852,39.2971],[-75.6752,39.2905],[-75.6545,39.2912],[-75.641,39.3013],[-75.6327,39.3013],[-75.6196,39.3101],[-75.6066,39.3081],[-75.5921,39.3113],[-75.5843,39.3087],[-75.5746,39.3134],[-75.569,39.3287],[-75.5557,39.3371],[-75.5574,39.3491],[-75.5358,39.3506],[-75.5285,39.3583],[-75.5214,39.3586],[-75.5124,39.3657],[-75.5158,39.3783],[-75.5213,39.3817],[-75.5236,39.3916],[-75.536,39.4094],[-75.5385,39.4165],[-75.5559,39.4304],[-75.5718,39.4389],[-75.5731,39.4454],[-75.5894,39.4608],[-75.5931,39.4792],[-75.5877,39.4964],[-75.5724,39.5171],[-75.5694,39.5406],[-75.563,39.5622],[-75.6119,39.5974],[-75.6149,39.616],[-75.612,39.622],[-75.5871,39.651],[-75.5622,39.6567],[-75.5091,39.7201],[-75.4902,39.7548],[-75.4685,39.7865],[-75.4234,39.8066],[-75.4537,39.8203],[-75.4988,39.8333],[-75.5393,39.8382],[-75.5799,39.8385],[-75.5931,39.8375],[-75.5948,39.8373],[-75.6173,39.834],[-75.6415,39.8284],[-75.6628,39.8212],[-75.686,39.8111],[-75.7012,39.8026],[-75.727,39.7841],[-75.7531,39.7576],[-75.7661,39.7378],[-75.7738,39.7222],[-75.7886,39.7222]]] },
  { geoid: '42029', name: 'Chester', rings: [[[-75.5799,39.8385],[-75.5864,39.8443],[-75.5931,39.8375],[-75.5799,39.8385]],[[-75.8734,40.1371],[-75.8905,40.1295],[-75.943,40.1093],[-75.9361,40.0785],[-75.9343,40.0476],[-75.9359,40.0375],[-75.9867,39.9672],[-75.9946,39.9524],[-75.988,39.9396],[-75.981,39.9335],[-75.9915,39.929],[-75.9971,39.9221],[-75.9975,39.9099],[-75.9933,39.899],[-75.9868,39.8922],[-75.9923,39.8822],[-75.9875,39.8725],[-75.9913,39.8687],[-76.0041,39.8729],[-76.0067,39.854],[-76.0199,39.8535],[-76.0208,39.845],[-76.0165,39.8315],[-76.0228,39.8308],[-76.0413,39.7969],[-76.0497,39.7838],[-76.0584,39.7799],[-76.0649,39.7703],[-76.0667,39.76],[-76.0819,39.7614],[-76.0843,39.7483],[-76.102,39.7399],[-76.0926,39.7335],[-76.1018,39.7243],[-76.1112,39.7285],[-76.1182,39.7254],[-76.1344,39.7271],[-76.1356,39.7216],[-75.9986,39.7216],[-75.7996,39.7219],[-75.7886,39.7222],[-75.7738,39.7222],[-75.7661,39.7378],[-75.7531,39.7576],[-75.727,39.7841],[-75.7012,39.8026],[-75.686,39.8111],[-75.6628,39.8212],[-75.6415,39.8284],[-75.6173,39.834],[-75.5948,39.8373],[-75.5977,39.8411],[-75.592,39.8525],[-75.6015,39.8564],[-75.5932,39.8695],[-75.5979,39.8745],[-75.5712,39.8881],[-75.5734,39.8964],[-75.5464,39.9097],[-75.5427,39.9272],[-75.519,39.9342],[-75.5238,39.9441],[-75.4361,39.9849],[-75.4431,39.9937],[-75.4538,39.9936],[-75.4043,40.0274],[-75.415,40.0418],[-75.3611,40.0655],[-75.3667,40.0724],[-75.3926,40.061],[-75.4201,40.0972],[-75.4379,40.0896],[-75.4407,40.0943],[-75.4562,40.0878],[-75.4692,40.1074],[-75.4694,40.1167],[-75.4621,40.1253],[-75.4724,40.1293],[-75.4937,40.1265],[-75.5056,40.1326],[-75.5108,40.1405],[-75.5011,40.1574],[-75.5132,40.1583],[-75.5211,40.1471],[-75.5268,40.1496],[-75.5292,40.1687],[-75.541,40.176],[-75.5577,40.208],[-75.5649,40.2062],[-75.5629,40.1974],[-75.5733,40.1953],[-75.5878,40.2144],[-75.597,40.2368],[-75.6124,40.223],[-75.6196,40.2301],[-75.6509,40.242],[-75.6712,40.2446],[-75.6856,40.2366],[-75.6968,40.2419],[-75.7432,40.2167],[-75.8545,40.1493],[-75.8734,40.1371]]] },
  { geoid: '42091', name: 'Montgomery', rings: [[[-75.5297,40.447],[-75.5855,40.3779],[-75.6968,40.2419],[-75.6856,40.2366],[-75.6712,40.2446],[-75.6509,40.242],[-75.6196,40.2301],[-75.6124,40.223],[-75.597,40.2368],[-75.5878,40.2144],[-75.5733,40.1953],[-75.5629,40.1974],[-75.5649,40.2062],[-75.5577,40.208],[-75.541,40.176],[-75.5292,40.1687],[-75.5268,40.1496],[-75.5211,40.1471],[-75.5132,40.1583],[-75.5011,40.1574],[-75.5108,40.1405],[-75.5056,40.1326],[-75.4937,40.1265],[-75.4724,40.1293],[-75.4621,40.1253],[-75.4694,40.1167],[-75.4692,40.1074],[-75.4562,40.0878],[-75.4407,40.0943],[-75.4379,40.0896],[-75.4201,40.0972],[-75.3926,40.061],[-75.3667,40.0724],[-75.3611,40.0655],[-75.3568,40.0631],[-75.3207,40.0162],[-75.3114,40.0198],[-75.2765,39.977],[-75.2058,40.0116],[-75.2181,40.0209],[-75.2321,40.028],[-75.2644,40.0541],[-75.2236,40.0929],[-75.1885,40.0728],[-75.1764,40.0846],[-75.1094,40.0459],[-75.0874,40.0636],[-75.0967,40.069],[-75.0778,40.0858],[-75.0583,40.1059],[-75.0206,40.1323],[-75.0151,40.138],[-75.1298,40.206],[-75.2141,40.2574],[-75.2841,40.2984],[-75.4222,40.3817],[-75.4257,40.3844],[-75.4841,40.4185],[-75.5297,40.447]]] },
  { geoid: '42045', name: 'Delaware', rings: [[[-75.3611,40.0655],[-75.415,40.0418],[-75.4043,40.0274],[-75.4538,39.9936],[-75.4431,39.9937],[-75.4361,39.9849],[-75.5238,39.9441],[-75.519,39.9342],[-75.5427,39.9272],[-75.5464,39.9097],[-75.5734,39.8964],[-75.5712,39.8881],[-75.5979,39.8745],[-75.5932,39.8695],[-75.6015,39.8564],[-75.592,39.8525],[-75.5977,39.8411],[-75.5948,39.8373],[-75.5931,39.8375],[-75.5864,39.8443],[-75.5799,39.8385],[-75.5393,39.8382],[-75.4988,39.8333],[-75.4537,39.8203],[-75.4234,39.8066],[-75.4151,39.8019],[-75.3905,39.8153],[-75.3544,39.8399],[-75.3304,39.849],[-75.3097,39.8502],[-75.2721,39.8491],[-75.235,39.8566],[-75.2115,39.8671],[-75.2198,39.8755],[-75.2341,39.8772],[-75.2405,39.8724],[-75.2484,39.8765],[-75.2625,39.8766],[-75.2652,39.8871],[-75.2591,39.8924],[-75.2472,39.9136],[-75.2478,39.9217],[-75.2404,39.9422],[-75.247,39.9434],[-75.2516,39.9521],[-75.2481,39.9641],[-75.2654,39.9653],[-75.2754,39.9696],[-75.2765,39.977],[-75.3114,40.0198],[-75.3207,40.0162],[-75.3568,40.0631],[-75.3611,40.0655]]] },
  { geoid: '42071', name: 'Lancaster', rings: [[[-76.7216,40.1201],[-76.6972,40.1025],[-76.6804,40.0832],[-76.6755,40.0736],[-76.6638,40.0632],[-76.6445,40.0581],[-76.5958,40.0515],[-76.5712,40.0457],[-76.5539,40.0467],[-76.5345,40.0513],[-76.5269,40.0262],[-76.5135,40.0154],[-76.4986,39.9969],[-76.4954,39.9761],[-76.4874,39.9621],[-76.4736,39.9474],[-76.449,39.9343],[-76.4222,39.9258],[-76.4051,39.9154],[-76.3904,39.9118],[-76.3855,39.9057],[-76.3795,39.8864],[-76.3817,39.8791],[-76.3767,39.8656],[-76.3617,39.8571],[-76.3508,39.8471],[-76.3505,39.8378],[-76.3383,39.8221],[-76.3284,39.8148],[-76.3157,39.81],[-76.3105,39.8031],[-76.2902,39.785],[-76.2761,39.7756],[-76.2675,39.7594],[-76.2566,39.75],[-76.2406,39.7303],[-76.2398,39.7213],[-76.2333,39.7213],[-76.1356,39.7216],[-76.1344,39.7271],[-76.1182,39.7254],[-76.1112,39.7285],[-76.1018,39.7243],[-76.0926,39.7335],[-76.102,39.7399],[-76.0843,39.7483],[-76.0819,39.7614],[-76.0667,39.76],[-76.0649,39.7703],[-76.0584,39.7799],[-76.0497,39.7838],[-76.0413,39.7969],[-76.0228,39.8308],[-76.0165,39.8315],[-76.0208,39.845],[-76.0199,39.8535],[-76.0067,39.854],[-76.0041,39.8729],[-75.9913,39.8687],[-75.9875,39.8725],[-75.9923,39.8822],[-75.9868,39.8922],[-75.9933,39.899],[-75.9975,39.9099],[-75.9971,39.9221],[-75.9915,39.929],[-75.981,39.9335],[-75.988,39.9396],[-75.9946,39.9524],[-75.9867,39.9672],[-75.9359,40.0375],[-75.9343,40.0476],[-75.9361,40.0785],[-75.943,40.1093],[-75.8905,40.1295],[-75.8734,40.1371],[-75.9569,40.1914],[-76.1317,40.3032],[-76.1512,40.316],[-76.3077,40.255],[-76.3682,40.2474],[-76.4354,40.2382],[-76.502,40.2174],[-76.5663,40.1966],[-76.5712,40.1944],[-76.5791,40.1949],[-76.5827,40.191],[-76.5999,40.1883],[-76.6065,40.19],[-76.6159,40.1806],[-76.6277,40.1767],[-76.6321,40.1706],[-76.6441,40.1649],[-76.6531,40.1661],[-76.6728,40.1575],[-76.6772,40.1489],[-76.6956,40.1541],[-76.7159,40.1315],[-76.7216,40.1201]]] },
  { geoid: '42011', name: 'Berks', rings: [[[-75.8915,40.6773],[-75.9932,40.6397],[-76.0122,40.5777],[-76.0212,40.5738],[-76.0425,40.584],[-76.0509,40.5752],[-76.0653,40.5797],[-76.0796,40.5661],[-76.1059,40.5622],[-76.1347,40.5535],[-76.1551,40.5452],[-76.1716,40.5349],[-76.1856,40.5356],[-76.1966,40.5313],[-76.2194,40.5287],[-76.2343,40.5221],[-76.256,40.5171],[-76.2722,40.5176],[-76.3023,40.5147],[-76.3382,40.5155],[-76.3551,40.5108],[-76.3692,40.5096],[-76.4186,40.4956],[-76.4402,40.496],[-76.2319,40.3663],[-76.2055,40.3607],[-76.1512,40.316],[-76.1317,40.3032],[-75.9569,40.1914],[-75.8734,40.1371],[-75.8545,40.1493],[-75.7432,40.2167],[-75.6968,40.2419],[-75.5855,40.3779],[-75.5297,40.447],[-75.5898,40.4847],[-75.7394,40.5799],[-75.7793,40.6047],[-75.8915,40.6773]]] },
]

const n = (v) => Number(v).toLocaleString('en-US')
const usd = (v) => '$' + n(v)

/* ============ CHE-F1: list price for 10 users a month ============ */

const EDITION_ALT =
  `Bar chart of Salesforce list prices for ${SEATS} users a month, read from salesforce.com on ${PRICES_CHECKED}: ` +
  EDITIONS.map((e) => `${e.name} ${usd(e.price * SEATS)}${e.api ? ` (${usd((e.price + e.api) * SEATS)} with API access)` : ''}`).join(', ') +
  '; licences only, before setup.'

/** One readout row: a hairline-grey bar (palette `line`, so the night share image re-tones it) with the signal wire through it, a node at the
 *  value, and (Pro Suite) a dashed run to the price with API access. */
function priceRow(e, { x0, my, sx, size, barH, mono }) {
  const v = e.price * SEATS
  const end = sx(v)
  const items = [
    shape({ rect: [x0, my - barH / 2, end - x0, barH], fill: 'line' }),
    wire(e.k, [[x0, my], [end, my]]),
    shape({ rect: [end - 4, my - 4, 8, 8], fill: 'node' }),
  ]
  let label = usd(v)
  let lx = end
  if (e.api) {
    const withApi = sx((e.price + e.api) * SEATS)
    items.push(wire(e.k, [[end + 6, my], [withApi, my]], { dashed: true }))
    items.push(shape({ rect: [withApi - 4, my - 4, 8, 8], fill: 'bg', stroke: 'node', width: 1.5 }))
    label = `${usd(v)} · ${usd((e.price + e.api) * SEATS)} with API access`
    lx = withApi
  }
  items.push(text(label, lx + 14, my + mono * 0.35, { size: mono, mono: true }))
  return items
}

function editionsDesktop() {
  const t = TYPE.desktop
  const W = 1136, x0 = 300, plotW = 640, y0 = 72, rowH = 52
  const max = Math.max(...EDITIONS.map((e) => (e.price + (e.api ?? 0)) * SEATS))
  const top = Math.ceil(max / 1000) * 1000
  const sx = (v) => x0 + (v / top) * plotW
  const items = [text(`Monthly list price for ${SEATS} users · licences only, before setup`, 32, 36, { size: t.label, fill: 'ink2' })]
  const bottom = y0 + EDITIONS.length * rowH
  for (let v = 0; v <= top; v += 1000) {
    items.push(shape({ d: `M${round(sx(v))} ${y0 - 8} L${round(sx(v))} ${bottom - 12}`, stroke: 'line', width: 1 }))
    items.push(text(usd(v), sx(v), bottom + 8, { size: t.tag, mono: true, fill: 'ink3', anchor: 'middle' }))
  }
  EDITIONS.forEach((e, i) => {
    const cy = y0 + i * rowH, my = cy + 16
    items.push(text(e.name, 32, my + 1, { size: t.title, weight: 600 }))
    items.push(text(`${usd(e.price)} a user a month`, 32, my + 21, { size: t.tag, mono: true, fill: 'ink3' }))
    items.push(...priceRow(e, { x0, my, sx, size: t.label, barH: 18, mono: 16 }))
  })
  return { w: W, h: bottom + 20, items }
}

function editionsMobile() {
  const t = TYPE.mobile
  const W = 640, x0 = 32, plotW = 380, y0 = 92, rowH = 96
  const max = Math.max(...EDITIONS.map((e) => (e.price + (e.api ?? 0)) * SEATS))
  const sx = (v) => x0 + (v / max) * plotW
  const items = [text(`${SEATS} users a month, licences only`, 32, 48, { size: t.label, fill: 'ink2' })]
  EDITIONS.forEach((e, i) => {
    const cy = y0 + i * rowH
    items.push(text(e.name, 32, cy + 26, { size: t.label, weight: 600 }))
    items.push(text(`${usd(e.price)} a user`, 608, cy + 26, { size: t.tag, mono: true, fill: 'ink3', anchor: 'end' }))
    items.push(...priceRow(e, { x0, my: cy + 62, sx, size: t.label, barH: 26, mono: t.tag }))
  })
  return { w: W, h: y0 + EDITIONS.length * rowH + 8, items }
}

/* ============ CHE-F2: largest industry groups by employees ============ */

const LABEL = {
  '62': 'Health care and social assistance',
  '52': 'Finance and insurance',
  '44': 'Retail trade',
  '54': 'Professional, scientific and technical services',
  '72': 'Accommodation and food services',
  '55': 'Management of companies',
  '56': 'Administrative and waste services',
  '31': 'Manufacturing',
}
const SHORT = { '54': 'Professional, scientific and technical' }
const ALL = CBP.find((r) => r.naics === 'all')
const TOP = CBP.filter((r) => r.naics !== 'all').slice(0, 8)
for (const r of TOP) if (!LABEL[r.naics]) throw new Error(`no label for NAICS ${r.naics}`)
const IND_ALT =
  'Bar chart of the eight largest industry groups in Chester County, Pennsylvania, by paid employees in 2023: ' +
  TOP.map((r) => `${LABEL[r.naics].toLowerCase()} ${n(r.emp)}`).join(', ') +
  `. All industries: ${n(ALL.emp)} paid employees at ${n(ALL.est)} establishments. Source: US Census Bureau, County Business Patterns 2023.`

function industriesDesktop() {
  const t = TYPE.desktop
  const W = 800, lx = 372, x0 = 386, plotW = 300
  const head = box({ k: 'all', x: 32, y: 20, w: W - 64, lines: [
    { t: `ALL INDUSTRIES · ${n(ALL.emp)} PAID EMPLOYEES · ${n(ALL.est)} ESTABLISHMENTS · 2023`, size: t.tag, mono: true, fill: 'ink2' },
  ] })
  const y0 = head.y + head.h + 20, rowH = 36
  const max = TOP[0].emp
  const sx = (v) => x0 + (v / max) * plotW
  const items = [head]
  TOP.forEach((r, i) => {
    const my = y0 + i * rowH + rowH / 2
    items.push(text(SHORT[r.naics] ?? LABEL[r.naics], lx, my + 5, { size: 15, fill: 'ink2', anchor: 'end' }))
    items.push(shape({ rect: [x0, my - 8, sx(r.emp) - x0, 16], fill: 'line' }))
    items.push(wire(`n${r.naics}`, [[x0, my], [sx(r.emp), my]]))
    items.push(shape({ rect: [sx(r.emp) - 4, my - 4, 8, 8], fill: 'node' }))
    items.push(text(n(r.emp), sx(r.emp) + 12, my + 5, { size: 14, mono: true }))
  })
  return { w: W, h: y0 + TOP.length * rowH + 16, items }
}

function industriesMobile() {
  const t = TYPE.mobile
  const W = 640, x0 = 32, plotW = 420
  const head = box({ k: 'all', x: 32, y: 24, w: W - 64, pad: 20, lines: [
    { t: 'ALL INDUSTRIES, 2023', size: t.tag, mono: true, fill: 'ink3' },
    { t: `${n(ALL.emp)} paid employees · ${n(ALL.est)} establishments`, size: 24, fill: 'ink', gap: 6 },
  ] })
  const y0 = head.y + head.h + 28, rowH = 84
  const max = TOP[0].emp
  const sx = (v) => x0 + (v / max) * plotW
  const items = [head]
  TOP.forEach((r, i) => {
    const cy = y0 + i * rowH
    items.push(text(SHORT[r.naics] ?? LABEL[r.naics], 32, cy + 26, { size: 24, fill: 'ink2' }))
    const my = cy + 56
    items.push(shape({ rect: [x0, my - 12, sx(r.emp) - x0, 24], fill: 'line' }))
    items.push(wire(`n${r.naics}`, [[x0, my], [sx(r.emp), my]]))
    items.push(shape({ rect: [sx(r.emp) - 5, my - 5, 10, 10], fill: 'node' }))
    items.push(text(n(r.emp), sx(r.emp) + 16, my + 7, { size: t.tag, mono: true }))
  })
  return { w: W, h: y0 + TOP.length * rowH + 4, items }
}

/* ============ CHE-F3: Chester County map ============ */

const TOWNS = [
  { k: 'ex', label: 'Exton', at: PLACES['Exton CDP'] },
  { k: 'wc', label: 'West Chester', at: PLACES['West Chester borough'] },
  { k: 'dt', label: 'Downingtown', at: PLACES['Downingtown borough'] },
]
/** Great-circle miles (haversine). Straight line, not driving distance. */
const miles = ([lo1, la1], [lo2, la2]) => {
  const r = Math.PI / 180, a = Math.sin(((la2 - la1) * r) / 2) ** 2 + Math.cos(la1 * r) * Math.cos(la2 * r) * Math.sin(((lo2 - lo1) * r) / 2) ** 2
  return 3958.8 * 2 * Math.asin(Math.sqrt(a))
}
for (const t of TOWNS) t.mi = Math.round(miles(OFFICE, t.at))
const NAMES = {
  '42029': 'CHESTER COUNTY', '42045': 'DELAWARE', '42091': 'MONTGOMERY', '42011': 'BERKS',
  '42071': 'LANCASTER', '10003': 'NEW CASTLE, DE', '24015': 'CECIL, MD',
}
/* Label anchors [lon, lat]: placement only, chosen to sit inside each county's
   visible part of the frame. Not data. */
const LABEL_AT = {
  '42029': [-75.8, 39.84], '42045': [-75.43, 39.89], '42091': [-75.43, 40.25], '42011': [-75.86, 40.28],
  '42071': [-76.17, 40.02], '10003': [-75.66, 39.7], '24015': [-76.06, 39.69],
}
const BBOX = { lon0: -76.24, lon1: -75.3, lat0: 39.66, lat1: 40.31 }
const merc = (lat) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))
/** Web Mercator, fitted to the box with `pad` units of margin. */
function projector(W, H, pad) {
  const k = Math.PI / 180
  const dx = (BBOX.lon1 - BBOX.lon0) * k, dy = merc(BBOX.lat1) - merc(BBOX.lat0)
  const s = Math.min((W - 2 * pad) / dx, (H - 2 * pad) / dy)
  const ox = (W - dx * s) / 2, oy = (H - dy * s) / 2
  return ([lon, lat]) => [round(ox + (lon - BBOX.lon0) * k * s), round(oy + (merc(BBOX.lat1) - merc(lat)) * s)]
}
const ringPath = (p, ring) => 'M' + ring.map((pt) => p(pt).join(' ')).join(' L') + ' Z'

function map(W, H, { tag, label, node, pad }) {
  const p = projector(W, H, pad)
  const items = []
  for (const c of COUNTIES) {
    const home = c.geoid === '42029'
    items.push(shape({ d: c.rings.map((r) => ringPath(p, r)).join(' '), fill: home ? '#eaf2f9' : 'none', stroke: home ? 'ink3' : 'node', width: home ? 1.5 : 0.75, opacity: home ? undefined : 0.7 }))
  }
  for (const c of COUNTIES) {
    const [x, y] = p(LABEL_AT[c.geoid])
    const size = c.geoid === '42029' ? tag + 2 : tag
    // Keep the whole label inside the frame (estimated mono advance 0.6em).
    const half = (NAMES[c.geoid].length * size * 0.6) / 2
    const cx = Math.min(Math.max(x, pad + half), W - pad - half)
    items.push(text(NAMES[c.geoid], round(cx), y, { size, mono: true, fill: c.geoid === '42029' ? 'ink2' : 'ink3', anchor: 'middle' }))
  }
  const o = p(OFFICE)
  for (const t of TOWNS) items.push(wire(t.k, [o, p(t.at)], { dashed: true }))
  /* The three towns sit within 7 miles of the office, so every label goes to
     the LEFT of its node (the office is near the county's east edge and the
     frame's right side): Exton above-left, Downingtown and West Chester level-left. */
  for (const t of TOWNS) {
    const [x, y] = p(t.at)
    items.push(box({ k: t.k, x: x - node / 2, y: y - node / 2, w: node, h: node, pad: 0, lines: [] }))
    const above = t.k === 'ex'
    items.push(text(`${t.label} · ${t.mi} mi`, round(above ? x + node / 2 : x - node), round(above ? y - node / 2 - tag * 0.45 : y + tag * 0.35), { size: tag, mono: true, fill: 'ink2', anchor: 'end' }))
  }
  const on = node + 4
  items.push(box({ k: 'office', x: o[0] - on / 2, y: o[1] - on / 2, w: on, h: on, pad: 0, lines: [], fill: 'signal' }))
  items.push(text('OneAlgorithm, Malvern', round(o[0] + on / 2), round(o[1] - on - label * 0.55), { size: label, weight: 600, anchor: 'end' }))
  return { w: W, h: H, items }
}

const MAP_ALT =
  "Map of Chester County, Pennsylvania, and its neighbouring counties (Lancaster, Berks, Montgomery and Delaware in Pennsylvania, New Castle in Delaware and Cecil in Maryland), marking OneAlgorithm's office in Malvern and the straight-line distance from it to " +
  TOWNS.map((t) => `${t.label} (about ${t.mi} miles)`).join(', ').replace(/, ([^,]*)$/, ' and $1') +
  '.'

export default [
  {
    id: 'salesforce-edition-cost-10-users',
    title: `Salesforce list price for ${SEATS} users a month`,
    alt: EDITION_ALT,
    tone: 'light',
    og: 'og-chester-county',
    desktop: editionsDesktop(),
    mobile: editionsMobile(),
  },
  {
    id: 'chester-county-largest-industries',
    title: 'Largest industry groups in Chester County, PA',
    alt: IND_ALT,
    tone: 'light',
    // The page renders its industry rows from these labels, so the HTML and
    // the chart share one source. Format: "<name> · <n> employees · <n> establishments".
    legend: [
      { k: 'all', label: `All industries · ${n(ALL.emp)} employees · ${n(ALL.est)} establishments` },
      ...TOP.map((r) => ({ k: `n${r.naics}`, label: `${LABEL[r.naics]} · ${n(r.emp)} employees · ${n(r.est)} establishments` })),
    ],
    desktop: industriesDesktop(),
    mobile: industriesMobile(),
  },
  {
    id: 'chester-county-map-malvern',
    title: 'Chester County, Pennsylvania, and the Malvern office',
    alt: MAP_ALT,
    tone: 'light',
    legend: TOWNS.map((t) => ({ k: t.k, label: `${t.label} · about ${t.mi} miles` })),
    desktop: map(560, 480, { tag: 12, label: 16, node: 10, pad: 8 }),
    mobile: map(640, 600, { tag: 20, label: 24, node: 16, pad: 8 }),
  },
]
