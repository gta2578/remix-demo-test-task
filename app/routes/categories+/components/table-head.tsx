import React from "react";
import {useTranslation} from 'react-i18next';
import {Box, TableCell, TableHead, TableRow, Typography} from '@mui/material';




export const CategoriesTableHead = () => {
  const {t} = useTranslation(['common']);

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Box>{t('common:title')}</Box>
          <Typography variant="caption" color="textDisabled">
            {t('common:id')}
          </Typography>
        </TableCell>
        <TableCell align="right" width={190}>
          <Box>{t('common:createdAt')}</Box>
          <Typography variant="caption" color="textDisabled">
            {t('common:updatedAt')}
          </Typography>
        </TableCell>
        <TableCell align="right" width={160}></TableCell>
      </TableRow>
    </TableHead>
  );
};
