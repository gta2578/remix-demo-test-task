import React from "react";
import {Box, Button, Skeleton, Stack, TableCell, TableRow, Typography} from '@mui/material';




export const ProductsTableRowSkeleton = ({count = 3}: {count?: number}) => {
  const rows = [];

  for (let index = 0; index < count; index++) {
    rows.push(
      <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}} key={index}>
        <TableCell component="th" scope="row">
          <Typography variant="body1">
            <Skeleton />
          </Typography>
          <Typography variant="caption">
            <Skeleton width={100} />
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Box justifyItems="flex-end">
            <Skeleton width={100} />
            <Typography variant="caption">
              <Skeleton width={50} />
            </Typography>
          </Box>
        </TableCell>
        <TableCell align="right">
          <Box justifyItems="flex-end">
            <Skeleton width={100} />
            <Typography variant="caption">
              <Skeleton width={50} />
            </Typography>
          </Box>
        </TableCell>
        <TableCell align="right">
          <Stack spacing={1} direction="row-reverse">
            <Skeleton variant="rounded">
              <Button variant="contained">.</Button>
            </Skeleton>
          </Stack>
        </TableCell>
      </TableRow>,
    );
  }

  return rows;
};
