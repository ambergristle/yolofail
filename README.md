# yolofail

visualize selected stock performance against the market over time

## why

This project was my introduction to React, and then Next. Now I've used it to try a few technologies, namely Bun, Next's App Router, Dragonfly DB, and Radix/Shadcn UI. Its narrowly-scoped, but easily extensible (or rebuilt from scratch), making it a useful learning tool. I've enjoyed seeing how it's evolved along with my skill level, and the benefits and constraints of the technologies I choose.

I swiched from React + Express to Next for the SSR. Way back in the spring of 2021, Game Stop stock had just hit its post-squeeze high, and finance memes were hot. My buddy [Zach](https://x.com/ZachHarding), the driving force behind the product spec, saw an opportunity to drive site traffic and generate ad revenue by making chart screenshots shareable on social media. Google scrapes sites to determine their eligibility for ad placement, and CSR wasn't going to cut it. Ultimately, SSR wasn't enough either — if I remember right, the app was deemed 'not useful enough to drive traffic' — but the refactor nonetheless represented a step forward in both UX + DX.

Years later, I thought I might spruce it up a bit. There were improvements to be made in design and responsiveness, and I wanted to add a cache to mitigate rate limit errors. It was meant to be a more contained refactor, but updating dependencies introduced so many breaking changes that I figured I might as well start from scratch. I had been meaning to try using Bun with a full-stack app, so it was a win-win. To run the cache locally (and to simplify connecting to it), I also took the opportunity to containerize the project and set up a Docker Compose process. If I've learned anything, it's that development is all about choosing which complexity to deal with.

What does the future hold? Another top-down refactor? Probably; this isn't a project I'm going to actively maintain, after all. But I feel good about this iteration as a foundation for feature expansion. I'd be interested to work with screenshots. Making those screenshots shareable via social media may prove a challenge, given platforms' often-restrictive apis; I might be able to achieve something similar with rich links though. Worth a thought, especially now that Docker simplifies scaling.

## stack

### v0

- DigitalOcean
- Express
- React
- Chart.js
- Marketstack
- Material UI

### v1

- Next.js
- Formik
- Yup
- Markdown
- Zustand

### v2

- Bun
- Next.js
- DragonflyDb
- Shadcn UI
- React Hook Form
- Wretch
- SWR
- Zod
- Tremor

## run with docker compose

Development
`docker compose -f docker-compose.development.yml up`

Production
`docker compose -f docker-compose.production.yml up`
