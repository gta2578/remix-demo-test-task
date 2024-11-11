import {vitePlugin as remix} from '@remix-run/dev';
import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
// import { remixDevTools } from "remix-development-tools";
import {installGlobals} from '@remix-run/node';

import {routes} from './app/routes-config';

//
//

installGlobals();

declare module '@remix-run/node' {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    // remixDevTools(),
    remix({
      routes,
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      ssr: false,
    }),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: ['react-i18next', /^@mui\//],
    // noExternal: ["react-i18next", '@mui/icons-material'],
    // noExternal: ['@mui/icons-material', /^@mui\//],
  },
});


