# Madadgaar Partner API Docs Site

Public documentation for partners and developers: **https://docs.madadgaar.com.pk**

## Stack

- Create React App + React Router
- Tailwind CSS
- Deploy as static build (`npm run build` → `build/`)

## Commands

```bash
npm install
npm start          # http://localhost:3000
npm run build      # production build
```

## Environment (optional)

```bash
# .env
REACT_APP_API_URL=https://api.madadgaar.com.pk/api
REACT_APP_PARTNER_PANEL=https://partner.madadgaar.com.pk
```

## Project structure

```
src/
├── pages/           # One page per API topic
├── components/      # Layout, CodeBlock, EndpointCard, CategoryFilter
├── constants/       # api.js, apiExamples.js, navigation.js
└── utils/           # apiTestLab.js (Test now → apitestlab.org)
public/
├── madadgaar-logo.png
├── sitemap.xml
└── robots.txt
```

## Backend source of truth

API implementation lives in:

```
../backend-Nodejs-Express/thirdPartyApis/
```

See that folder's `README.md` for route list and middleware. When backend changes, update:

- `src/constants/apiExamples.js` — curl examples
- `src/pages/Installments.jsx` — field reference
- `src/pages/Status.jsx` — rollout status
- `public/sitemap.xml` — new routes

## Related

| Resource | URL |
|----------|-----|
| Partner panel | https://partner.madadgaar.com.pk |
| API keys UI | https://partner.madadgaar.com.pk/settings/api-keys |
| API base | https://api.madadgaar.com.pk/api/v1/partner |
| API Test Lab | https://www.apitestlab.org/tester |
