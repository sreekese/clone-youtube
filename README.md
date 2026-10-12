# ViewTube

A responsive YouTube-inspired video browsing demo built with React, Redux Toolkit, and Vite.

## Run locally

From this directory (`clone-youtube/` inside the workspace):

```sh
npm ci
npm run dev
```

Requires Node.js 22.12+ (or a compatible newer release).

```sh
npm test          # Unit and component interaction tests
npm run test:watch
npm run lint
npm run build
npm run preview  # Serve the production build locally
```

## Features

- Search sample videos by title, channel, or category and combine with category filters.
- Play videos with native browser playback controls.
- Like videos, save them for later, and revisit or clear watch history.
- Library preferences persist in localStorage on this browser. Blocked or corrupt storage falls back to an in-memory session.
- Responsive layout, keyboard-operable controls, navigation toggle, and empty/error states.

## Structure

`src/data/videos.js` owns the sample catalog and pure filtering logic. `src/utils/appSlice.js` manages application state; `store.js` validates and persists library data. Components keep browsing, navigation, and playback separate. `src/test` covers filters, reducers, storage recovery, and the primary user journeys with Vitest and React Testing Library.

## Demo scope

This is a frontend demo, without authentication, uploads, live YouTube search, or a backend. Video and thumbnail files come from Google's public sample media bucket and require internet access. View counts are illustrative. History records opening a video, regardless of whether playback starts. Empty categories intentionally display an empty state. Local preferences are not synced across devices.
