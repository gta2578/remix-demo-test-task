import {useTranslation} from 'react-i18next';
import {formatRelative} from 'date-fns';
import {Box, Button, Stack, TableCell, TableRow, Typography} from '@mui/material';
import {DeleteOutline} from '@mui/icons-material';
import {AppButton} from '~/global/components/app-button';
import {ApiCategory} from '~/api-client/types';




type CategoriesTableRowProps = {row: ApiCategory; doDeleteItem: (item: ApiCategory) => void};

export const CategoriesTableRow: React.FC<CategoriesTableRowProps> = ({
  row,
  doDeleteItem,
}: CategoriesTableRowProps) => {
  const {t} = useTranslation();

  return (
    <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
      <TableCell component="th" scope="row">
        <Box>{row.title.en || row.title.ar}</Box>
        <Typography variant="caption" color="textDisabled">
          {row.categoryId}
        </Typography>
        {row.isActive ? (
          <Typography variant="caption" color="success" ml={1}>
            {t('common:active')}
          </Typography>
        ) : null}
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
        <Stack spacing={1} direction="row">
          <Button variant="text" onClick={() => doDeleteItem(row)}>
            <DeleteOutline />
          </Button>
          <AppButton to={`/categories/${row.categoryId}`} variant="contained">
            {t('common:edit')}
          </AppButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
