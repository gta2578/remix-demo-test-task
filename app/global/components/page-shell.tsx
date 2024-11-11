import React from 'react';
import {useTranslation} from 'react-i18next';
import LoadingButton, {LoadingButtonProps} from '@mui/lab/LoadingButton';
import {Box, Grid2, Stack, StackProps, Typography, TypographyProps} from '@mui/material';
import {AppButton, AppButtonProps} from '~/global/components/app-button';



type PageShellProps = {
  title?: React.ReactNode;
  titleProps?: TypographyProps;
  description?: React.ReactNode;
  descriptionProps?: TypographyProps;
  actionLabel?: React.ReactNode;
  actionProps?: LoadingButtonProps;
  backLabel?: React.ReactNode;
  backProps?: AppButtonProps;
  backTo?: AppButtonProps['to'];
  isLoading: boolean;
  maxWidth?: StackProps['maxWidth'];
  children: React.ReactNode;
};

export const PageShell: React.FC<PageShellProps> = ({
  title,
  titleProps,
  description,
  descriptionProps,
  actionLabel,
  actionProps,
  backLabel,
  backProps,
  backTo,
  isLoading = false,
  maxWidth = {sm: 400},
  children,
}: PageShellProps) => {
  const {t} = useTranslation();

  //
  //

  return (
    <Grid2 container direction="column" spacing={2} alignContent="center" alignItems="center">
      {title ? (
        <Typography variant="h4" align="center" fontWeight={500} {...titleProps}>
          {title}
        </Typography>
      ) : null}
      {description ? (
        <Typography variant="body1" align="center" sx={{fontWeight: 500}} {...descriptionProps}>
          {description}
        </Typography>
      ) : null}

      <Stack mt={4} spacing={2} width="100%" maxWidth={maxWidth}>
        {children}

        <Box mt={2} />

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          loading={isLoading}
          {...actionProps}
        >
          {actionLabel || t('common:submit')}
        </LoadingButton>
        {backTo ? (
          <AppButton to={backTo} fullWidth variant="text" size="large" {...backProps}>
            {backLabel || t('common:back')}
          </AppButton>
        ) : null}
      </Stack>
    </Grid2>
  );
};
