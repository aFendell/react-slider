# Project

The project features a clean, minimalistic design of a React slider component, developed using React, Vite, and TypeScript, without any additional external libraries (for the slider implementation).

It features a mock data layer using MSW (Mock Service Worker), ability to handle a changing number of items and supports button and keyboard controls, as well as touch gestures.
The plan is to add a caching mechanism in order to get better performance when dealing with large number of items.

## Development

- Install all dependencies > npm install
- Setup MSW > npx msw init <PUBLIC_DIR>
- Run dev mode > npm run dev

## Production

A CI/CD pipeline using Github Actions was set up to develop and deploy the [project](https://react-slider-five.vercel.app/) on Vercel.
