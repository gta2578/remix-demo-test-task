import {
  Outlet,
  ClientLoaderFunctionArgs,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react';

import {useDehydratedState} from 'use-dehydrated-state';
import {HydrationBoundary} from '@tanstack/react-query';

import {queryClient} from '~/services/client';

import Layout from '~/global/components/mui/layout';
import {MuiDocument} from '~/global/components/mui/document';

import {Language} from '~/localization/resource';

import {useQueryProfile} from './services/auth';
import React from "react";


//
//
export const clientLoader = async ({params}: ClientLoaderFunctionArgs) => {
  const lang = (params?.lang as Language) || 'en';
  const result = window.localStorage.getItem('_at')
    ? await queryClient.ensureQueryData(useQueryProfile.getFetchOptions({}))
    : undefined;
  return {lang, dir: lang === 'ar' ? 'rtl' : 'ltr', profile: result?.result};
};

// clientLoader.hydrate = true;

export default function App() {
  const dehydratedState = useDehydratedState();

  return (
    <MuiDocument>
      <HydrationBoundary state={dehydratedState}>
        <Layout>
          <Outlet />
        </Layout>
      </HydrationBoundary>
    </MuiDocument>
  );
}
// https://remix.run/docs/en/main/route/error-boundary
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    let message;

    switch (error.status) {
      case 401:
        message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>;
        break;
      case 404:
        message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>;
        break;
      default:
        throw new Error(error.data || error.statusText);
    }
    return (
      <MuiDocument title={`${error.status} ${error.statusText}`}>
        <Layout>
          <h1>
            {error.status}: {error.statusText}
          </h1>
          {message}
        </Layout>
      </MuiDocument>
    );
  }
  if (error instanceof Error) {
    console.error(error);
    return (
      <MuiDocument title="Error!">
        <Layout>
          <div>
            <h1>There was an error</h1>
            <p>{error.message}</p>
            <hr />
            <p>Hey, developer, you should replace this with what you want your users to see.</p>
          </div>
        </Layout>
      </MuiDocument>
    );
  }
  return <h1>Unknown Error</h1>;
}