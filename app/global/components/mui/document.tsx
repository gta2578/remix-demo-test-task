import * as React from 'react';
import {Links, Meta, Scripts, ScrollRestoration, useLoaderData} from '@remix-run/react';
import {QueryClientProvider} from '@tanstack/react-query';
import {withEmotionCache} from '@emotion/react';
import { EmotionCache } from '@emotion/cache';
import {useChangeLanguage} from 'remix-i18next/react';
import {closeSnackbar, SnackbarProvider} from 'notistack';
import {Button, GlobalStyles, unstable_useEnhancedEffect as useEnhancedEffect} from '@mui/material';
import {queryClient} from '~/services/client';
import {SnackNotification} from '~/global/components/snack-notification';
import theme from '~/global/components/mui/theme';
import {EmotionStyleContext} from '~/emotion/style-context';
import {clientLoader as RootClientLoader} from '~/root';


interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

interface CustomStyleSheet extends StyleSheet {
  _insertTag(tag: HTMLElement): void;
}

export const MuiDocument = withEmotionCache(({children, title}: DocumentProps, emotionCache) => {
  const clientStyleData = React.useContext(EmotionStyleContext);
  const locale = useLoaderData<typeof RootClientLoader>();

  useChangeLanguage(locale?.lang);

  // Only executed on client
  useEnhancedEffect(() => {
    const customCache = emotionCache as EmotionCache & { sheet: CustomStyleSheet };

    customCache.sheet.container = document.head;

    const tags = customCache.sheet.tags;
    customCache.sheet.flush();
    tags.forEach(tag => {
      customCache.sheet._insertTag(tag);
    });

    clientStyleData.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <html lang={locale?.lang} dir={locale?.dir}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        <meta name="emotion-insertion-point" content="emotion-insertion-point" />
      </head>
      <body>
        <GlobalStyles
          styles={{
            '.notistack-SnackbarContainer': {
              position: 'fixed',
              zIndex: 900,
              top: '5rem',
              left: '1rem',
            },
          }}
        />

        <SnackbarProvider
          maxSnack={4}
          Components={{
            default: SnackNotification,
            success: SnackNotification,
            warning: SnackNotification,
            info: SnackNotification,
            error: SnackNotification,
          }}
          anchorOrigin={{vertical: 'top', horizontal: locale?.dir === 'rtl' ? 'right' : 'left'}}
          action={key => <Button onClick={() => closeSnackbar(key)}>Dismiss</Button>}
        >
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </SnackbarProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
});
