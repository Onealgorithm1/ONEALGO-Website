# OneAlgorithm Website

Official website for [OneAlgorithm](https://onealgorithm.com) — a Philadelphia-based IT consulting, website development, operations technology, and digital marketing company.

## Tech Stack

- **Frontend:** React 18 + TypeScript, Vite, Tailwind CSS, Radix UI, Framer Motion
- **Routing:** React Router v6 (SPA)
- **Data fetching:** TanStack Query
- **Backend:** Express.js (serverless via Netlify Functions / Cloudflare Workers)
- **Deployment:** Cloudflare Pages + Workers
- **CMS:** Builder.io (visual editing)
- **Package manager:** pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Install dependencies

```bash
pnpm install
```

### Run locally

```bash
pnpm dev
```

Opens at `http://localhost:5173`.

### Build for production

```bash
pnpm build
```

Output goes to `dist/spa/`.

## Project Structure

```
├── client/
│   ├── pages/          # Route-level page components
│   │   ├── services/   # Individual service pages
│   │   └── industries/ # Individual industry pages
│   ├── components/     # Shared UI components
│   ├── hooks/          # Custom React hooks (SEO, etc.)
│   └── App.tsx         # Router and root component
├── server/             # Express API server
├── public/             # Static assets (favicon, sitemap, robots.txt, etc.)
├── netlify/functions/  # Netlify serverless functions
└── index.html          # SPA shell
```

## Deployment

The site deploys automatically to **Cloudflare Pages** on every push to `main`.

Build settings:
- Build command: `npm run build`
- Output directory: `dist/spa`

## Services

- IT Consulting
- Website Development
- Operations Technology
- Staff Augmentation
- Digital Marketing
- Google Ads
- SEO Services
- Oracle ERP
- Salesforce

## Industries Served

- Construction
- Manufacturing
- E-Commerce
- Government

## Contact

- Website: [onealgorithm.com](https://onealgorithm.com)
- Email: service@onealgorithm.com
- Phone: 1 (610) 890-9711
- Address: 625 Swedesford Rd, Malvern, PA 19355
- LinkedIn: [linkedin.com/company/onealgorithmllc](https://www.linkedin.com/company/onealgorithmllc)
