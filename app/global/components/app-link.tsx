import { LinkProps } from '@remix-run/react';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import { I18nLink } from './i18n-link';
import React from 'react';

type MuiAppI18nLinkProps = Omit<LinkProps, 'to'> &
  Omit<MuiLinkProps, 'href'> & {
  to: string;
  viewTransition?: boolean;
};

export const AppLink: React.FC<MuiAppI18nLinkProps> = ({
 to,
 viewTransition = true,
 children,
 ...props
}: MuiAppI18nLinkProps) => {
  return (
    <MuiLink
      component={I18nLink}
      to={to}
      {...props}
    >
      {children}
    </MuiLink>
  );
};