# Search Engine Submission Guide for OneAlgorithm.com

## Google Search Console Setup

### 1. Verify Site Ownership

- Go to [Google Search Console](https://search.google.com/search-console)
- Add property: `https://onealgorithm.com`
- Choose verification method:

**Option A: HTML Meta Tag (Recommended)**
Add this meta tag to your `<head>` section:

```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

**Option B: DNS TXT Record**
Add TXT record to your DNS:

- Name: `@` (or your domain)
- Value: `google-site-verification=YOUR_VERIFICATION_CODE`

### 2. Submit Sitemap

Once verified:

- Go to Sitemaps section
- Submit: `https://onealgorithm.com/sitemap.xml`
- Submit: `https://onealgorithm.com/robots.txt`

### 3. Request Indexing

- Use URL Inspection tool
- Submit individual pages:
  - `https://onealgorithm.com/`
  - `https://onealgorithm.com/services/website-development`
  - `https://onealgorithm.com/services/it-consulting`
  - `https://onealgorithm.com/contact`
  - `https://onealgorithm.com/ai-info`

## Bing Webmaster Tools Setup

### 1. Verify Site

- Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
- Add site: `https://onealgorithm.com`
- Verification options:

**Option A: Meta Tag**

```html
<meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
```

**Option B: XML File Upload**
Upload provided XML file to site root

### 2. Submit Sitemap

- Navigate to Sitemaps section
- Submit: `https://onealgorithm.com/sitemap.xml`

### 3. Submit URLs

Use Submit URLs feature for key pages

## Other Search Engines

### DuckDuckGo

- Automatically crawls based on other search engines
- No manual submission required

### Yandex (for international reach)

- Go to [Yandex Webmaster](https://webmaster.yandex.com)
- Add site and verify
- Submit sitemap

## Expected Timeline

- **Google**: 1-4 weeks for full indexing
- **Bing**: 1-6 weeks for full indexing
- **AI Crawlers**: 1-2 weeks (with updated robots.txt)

## Monitoring

Check indexing status:

- Google: `site:onealgorithm.com` in search
- Bing: `site:onealgorithm.com` in Bing search
- Monitor Search Console for crawl errors

## AI-Specific Actions Completed

✅ Updated robots.txt to allow AI crawlers
✅ Added structured data (Organization, FAQ, LocalBusiness)
✅ Optimized meta descriptions and titles
✅ Created /ai-info page for AI discoverability
