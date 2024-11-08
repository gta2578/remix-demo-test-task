import {useTranslation} from 'react-i18next';

import {Box, Grid2, InputAdornment, MenuItem} from '@mui/material';

import {useQueryCategoriesList} from '~/services/categories';

import {AppInput} from '~/global/components/app-input';
import {AppInputSwitch} from '~/global/components/app-input-switch';
import React from "react";

//
//

export const ProductsForm = () => {
  const {t} = useTranslation(['common', 'products']);
  const categories = useQueryCategoriesList();

  return (
    <>
      <Grid2 container spacing={2} direction={{xs: 'column', sm: 'row'}}>
        <AppInput
          name="title.ar"
          label={t('common:title') + ' ' + t('common:lang.ar')}
          variant="filled"
          sx={{flex: 1}}
        />

        <AppInput
          name="title.en"
          label={t('common:title') + ' ' + t('common:lang.en')}
          variant="filled"
          sx={{flex: 1}}
        />
      </Grid2>

      <Grid2 container spacing={2} direction={{xs: 'column', md: 'row'}}>
        <AppInput
          name="description.ar"
          label={t('common:description') + ' ' + t('common:lang.ar')}
          variant="filled"
          multiline
          rows={4}
          sx={{flex: 1}}
        />

        <AppInput
          name="description.en"
          label={t('common:description') + ' ' + t('common:lang.en')}
          variant="filled"
          multiline
          rows={4}
          sx={{flex: 1}}
        />
      </Grid2>

      <AppInput
        name="categoryId"
        label={t('products:category')}
        variant="filled"
        sx={{flex: 1}}
        select
      >
        {!categories.isFetched ? (
          <MenuItem disabled>Loading categories...</MenuItem>
        ) : !categories?.data?.result?.length ? (
          <MenuItem disabled>No categories...</MenuItem>
        ) : (
          categories.data?.result?.map(category => (
            <MenuItem key={category.categoryId} value={category.categoryId}>
              {category.title.en}
            </MenuItem>
          ))
        )}
      </AppInput>

      <Grid2 container spacing={2} direction={{xs: 'column', sm: 'row'}} columns={12}>
        <Grid2 size={{xs: 12, sm: 6}} spacing={2} container>
          <AppInput name="sku" label={t('products:sku')} variant="filled" sx={{flex: 1}} />

          <AppInput
            name="quantity"
            label={t('products:quantity')}
            variant="filled"
            type="tel"
            sx={{flex: 1}}
          />
        </Grid2>

        <Grid2 size={{xs: 12, sm: 6}} spacing={2} container>
          <AppInput
            name="price"
            label={t('products:price')}
            variant="filled"
            type="tel"
            sx={{flex: 1}}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              },
            }}
          />

          <AppInput
            name="priceSale"
            label={t('products:priceSale')}
            variant="filled"
            type="tel"
            sx={{flex: 1}}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              },
            }}
          />
        </Grid2>
      </Grid2>

      <Box mt={2} />

      <AppInputSwitch name="isActive" label={t('common:active')} />
    </>
  );
};
