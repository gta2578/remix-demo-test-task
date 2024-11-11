import React from 'react';
import {useTranslation} from 'react-i18next';

import {Stack, TableCell, TableCellProps, TableRow, Typography} from '@mui/material';

import {AppButton} from '~/global/components/app-button';



export const TableRowEmpty = ({
  actionURL,
  actionLabel,
  ...props
}: {
  actionLabel?: React.ReactNode;
  actionURL: string;
} & TableCellProps) => {
  const {t} = useTranslation(['common']);

  return (
    <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
      <TableCell component="th" scope="row" {...props}>
        <Stack p={3} alignItems="center" spacing={2}>
          <Typography variant="caption" fontSize="0.9rem">
            {t('common:noResults')}
          </Typography>

          {actionURL ? (
            <AppButton to={actionURL} variant="contained">
              {actionLabel || t('common:create')}
            </AppButton>
          ) : null}
        </Stack>
      </TableCell>
    </TableRow>
  );
};
