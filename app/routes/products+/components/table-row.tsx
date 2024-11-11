import React from "react";
import {useTranslation} from 'react-i18next';
import {formatRelative} from 'date-fns';
import {Box, Button, Stack, TableCell, TableRow, Typography} from '@mui/material';
import {DeleteOutline} from '@mui/icons-material';
import {AppButton} from '~/global/components/app-button';
import {ApiProduct} from '~/api-client/types';


//
//

type ProductsTableRowProps = {row: ApiProduct; doDeleteItem: (item: ApiProduct) => void};

export const ProductsTableRow: React.FC<ProductsTableRowProps> = ({
  row,
  doDeleteItem,
}: ProductsTableRowProps) => {
  const {t} = useTranslation(['products', 'common']);

  return (
    <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
      <TableCell component="th" scope="row">
        <Box
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {row.title.en || row.title.ar}
        </Box>
        <Box>
          <Typography variant="caption" color="textDisabled">
            {row.sku || '---'} | {row.quantity || '---'}
          </Typography>
          {row.isActive ? (
            <Typography variant="caption" color="success" ml={1}>
              {t('common:active')}
            </Typography>
          ) : null}
        </Box>
      </TableCell>
      <TableCell align="right">
        <Box>
          <Box>${Number(row.price).toLocaleString() || '---'}</Box>
          <Typography variant="caption" color="textDisabled">
            {row?.priceSale ? '$' + Number(row.priceSale).toLocaleString() : '---'}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="right">
        <Box>{formatRelative(new Date(row.createdAt), new Date())}</Box>
        <Typography variant="caption" color="textDisabled">
          {row.updatedAt && row.updatedAt !== row.createdAt
            ? formatRelative(new Date(row.updatedAt), new Date())
            : '---'}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Stack spacing={1} direction="row-reverse">
          <AppButton to={`/products/${row.productId}`} variant="contained">
            {t('common:edit')}
          </AppButton>
          <Button variant="text" onClick={() => doDeleteItem(row)}>
            <DeleteOutline />
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
