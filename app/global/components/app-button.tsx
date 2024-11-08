import React from "react";
import { LinkProps } from '@remix-run/react';
import { Button, ButtonProps } from '@mui/material';
import { I18nLink } from './i18n-link';

export type AppButtonProps = LinkProps & ButtonProps;

export const AppButton: React.FC<AppButtonProps> = ({
  viewTransition = true,
  children,
  ...props
}: AppButtonProps) => {
  return (
    <Button viewTransition={viewTransition} component={I18nLink} {...props}>
      {children}
    </Button>
  );
};