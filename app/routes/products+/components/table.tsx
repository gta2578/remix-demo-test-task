import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  useMediaQuery,
  Button, Stack
} from '@mui/material';

import { useMutationProductsDelete } from '~/services/products';
import { TableRowEmpty } from '~/global/components/table-row-empty';

import { ApiProduct } from '~/api-client/types';
import { ProductsTableHead } from './table-head';
import { ProductsTableRow } from './table-row';
import { ProductsTableRowSkeleton } from './table-row-skeleton';
import {AppButton} from "~/global/components/app-button";
import {DeleteOutline} from "@mui/icons-material";

interface ProductsTableProps {
  data?: ApiProduct[];
  isLoading: boolean;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ data, isLoading }) => {
  const { t } = useTranslation(['common']);
  const { enqueueSnackbar } = useSnackbar();
  const deleteItem = useMutationProductsDelete();
  const isMobile = useMediaQuery('(max-width:600px)', { noSsr: true });

  console.log('data', data)

  //
  const doDeleteItem = (item: ApiProduct) => {
    if (!window.confirm(t('common:deleteConfirm', { item: item.title.en || item.title.ar }))) return;

    deleteItem.mutate(
      { id: item.productId },
      {
        onSuccess: async (result) => {
          result?.meta?.message && enqueueSnackbar(result.meta.message, { variant: 'success' });
        },
        onError: (err) => {
          enqueueSnackbar(err?.message || 'unknown error', { variant: 'error' });
        },
      }
    );
  };

  const handleEdit = (productId: string) => {
    navigate(`/products/edit/${productId}`);
  };

  return (
    <>
      {isMobile ? (

        <Box display="flex" flexDirection="column" gap={2}>
          {isLoading ? (
            <ProductsTableRowSkeleton />
          ) : data?.length === 0 ? (
            <TableRowEmpty actionURL="/products/create" colSpan={4} />
          ) : (
            data?.map((product) => (
              <Card key={product.productId} sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image || '/placeholder.png'}
                  alt={product.title.en || product.title.ar}
                />
                <CardContent>
                  <Typography variant="h5">{product.title.en || product.title.ar}</Typography>
                  <Typography color="text.secondary">Status: {product.isActive ? 'Available' : 'Out of Stock'}</Typography>
                  <Typography>Price: {product.price}</Typography>
                  {product.priceSale && <Typography>Sale Price: {product.priceSale}</Typography>}
                  <Typography variant="body2" color="text.secondary">
                    Created: {new Date(product.createdAt).toLocaleDateString()} | Updated: {new Date(product.updatedAt).toLocaleDateString()}
                  </Typography>
                  {isLoading ? (
                    <ProductsTableRowSkeleton />
                  ) : !data?.length ? (
                    <TableRowEmpty actionURL="/products/create" colSpan={4} />
                  ) : (
                    data.map((row) => (
                      <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                        <Button variant="text" onClick={() => doDeleteItem(row)}>
                          <DeleteOutline />
                        </Button>
                        <AppButton to={`/products/${row.productId}`} variant="contained">
                          {t('common:edit')}
                        </AppButton>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <ProductsTableHead />
            <TableBody>
              {isLoading ? (
                <ProductsTableRowSkeleton />
              ) : !data?.length ? (
                <TableRowEmpty actionURL="/products/create" colSpan={4} />
              ) : (
                data.map((row) => (
                  <ProductsTableRow key={row.productId} row={row} doDeleteItem={doDeleteItem} />
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
