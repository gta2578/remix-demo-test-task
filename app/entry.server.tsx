import { PassThrough } from 'stream';
import { resolve } from 'node:path';
import createEmotionCache from '@emotion/cache';
import { CacheProvider as EmotionCacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import type { EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import { createInstance, i18n as I18n } from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import Backend from 'i18next-fs-backend';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '~/global/components/mui/theme';
import i18n from '~/localization/i18n';
import i18next from '~/localization/i18n.server';
const ABORT_DELAY = 5000;
const handleRequest = async (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) => {
  const instance = createInstance();
  const lng = await i18next.getLocale(request);
  const ns = i18next.getRouteNamespaces(remixContext);
  await instance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18n,
      lng,
      ns,
      backend: { loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json') },
    });
  return isbot(request.headers.get('user-agent'))
    ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext, instance)
    : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext, instance);
};
export default handleRequest;
const handleBotRequest = (request: Request, responseStatusCode: number, responseHeaders: Headers, remixContext: EntryContext, i18nInstance: I18n) =>
  new Promise((resolve, reject) => {
    const emotionCache = createEmotionCache({ key: 'css' });
    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={i18nInstance}>
        <EmotionCacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RemixServer context={remixContext} url={request.url} />
          </ThemeProvider>
        </EmotionCacheProvider>
      </I18nextProvider>,
      {
        onAllReady: () => {
          const reactBody = new PassThrough();
          const emotionServer = createEmotionServer(emotionCache);
          const bodyWithStyles = emotionServer.renderStylesToNodeStream();
          reactBody.pipe(bodyWithStyles);
          responseHeaders.set('Content-Type', 'text/html');
          resolve(
            new Response(bodyWithStyles as any, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );
          pipe(reactBody);
        },
        onShellError: (error: Error | string | any) => {
          if (error instanceof Error) {
            reject(error);
          } else if (typeof error === 'string') {
            reject(new Error(error));
          } else {
            reject(new Error('An unknown error occurred'));
          }
        },
        onError: (error: Error | string | any) => {
          if (error instanceof Error) {
            console.error(error.message);
          } else if (typeof error === 'string') {
            console.error(error);
          } else {
            console.error('An unknown error occurred');
          }
          reject(error instanceof Error ? error : new Error('An unknown error occurred'));
        },
      },
    );
    setTimeout(abort, ABORT_DELAY);
  });
const handleBrowserRequest = (request: Request, responseStatusCode: number, responseHeaders: Headers, remixContext: EntryContext, i18nInstance: I18n) =>
  new Promise((resolve, reject) => {
    const emotionCache = createEmotionCache({ key: 'css' });
    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={i18nInstance}>
        <EmotionCacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RemixServer context={remixContext} url={request.url} />
          </ThemeProvider>
        </EmotionCacheProvider>
      </I18nextProvider>,
      {
        onShellReady: () => {
          const reactBody = new PassThrough();
          const emotionServer = createEmotionServer(emotionCache);
          const bodyWithStyles = emotionServer.renderStylesToNodeStream();
          reactBody.pipe(bodyWithStyles);
          responseHeaders.set('Content-Type', 'text/html');
          resolve(
            new Response(bodyWithStyles as any, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );
          pipe(reactBody);
        },
        onShellError: (error: Error | string | any) => {
          if (error instanceof Error) {
            reject(error);
          } else if (typeof error === 'string') {
            reject(new Error(error));
          } else {
            reject(new Error('An unknown error occurred'));
          }
        },
        onError: (error: Error | string | any) => {
          if (error instanceof Error) {
            console.error(error.message);
          } else if (typeof error === 'string') {
            console.error(error);
          } else {
            console.error('An unknown error occurred');
          }
          reject(error instanceof Error ? error : new Error('An unknown error occurred'));
        },
      },
    );
    setTimeout(abort, ABORT_DELAY);
  });
