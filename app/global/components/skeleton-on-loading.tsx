import React from "react";
import {SkeletonProps, Skeleton} from '@mui/material';



export const SkeletonOnLoading = ({
  isLoading,
  variant = 'rounded',
  children,
  ...props
}: {
  isLoading?: boolean;
} & SkeletonProps) => {
  return isLoading ? (
    <Skeleton variant={variant} {...props}>
      {children}
    </Skeleton>
  ) : (
    children
  );
};
