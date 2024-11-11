import React from "react";
import {useTranslation} from 'react-i18next';
import {Box, TableCell, TableHead, TableRow, Typography} from '@mui/material';




export const ProductsTableHead = () => {
  const {t} = useTranslation(['common', 'products']);

  return (
    <TableHead>
      <TableRow>
        <TableCell>
          <Box>{t('common:title')}</Box>
          <Typography variant="caption" color="textDisabled">
            {t('products:sku')} | {t('products:quantity')}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Box>{t('products:price')}</Box>
          <Typography variant="caption" color="textDisabled">
            {t('products:priceSale')}
          </Typography>
        </TableCell>
        <TableCell align="right" width={190}>
          <Box>{t('common:createdAt')}</Box>
          <Typography variant="caption" color="textDisabled">
            {t('common:updatedAt')}
          </Typography>
        </TableCell>
        <TableCell align="right" width={150}></TableCell>
      </TableRow>
    </TableHead>
  );
};
