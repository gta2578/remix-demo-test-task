import {LinksFunction} from '@remix-run/node';

//
//

export const MuiLinks: () => [{ rel: string; href: string }, { rel: string; crossOrigin: string; href: string }, { rel: string; href: string }] = () => [
  // Google Fonts for MUI
  {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap',
  },
];
