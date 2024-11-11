import React from 'react';
import {Alert, AlertProps, Typography, TypographyProps} from '@mui/material';



export type NotificationProps = {
  heading?: React.ReactNode;
  headingProps?: TypographyProps;
  messages?: React.ReactNode | React.ReactNode[];
  messagesProps?: TypographyProps;
} & Omit<AlertProps, 'variant'> & {variantAlert?: AlertProps['variant']};

export const Notification: React.FC<NotificationProps> = ({
  heading,
  headingProps = {variant: 'subtitle2'},
  messages,
  messagesProps = {variant: 'body2'},
  children,
  variantAlert = 'standard',
  sx = {mt: 1, minWidth: '50%', maxWidth: 400},
  ...props
}: NotificationProps) => {
  return (
    <Alert variant={variantAlert} sx={sx} {...props}>
      {heading ? <Typography {...headingProps}>{heading}</Typography> : null}
      {Array.isArray(messages) && messages?.length
        ? messages.map((item, index) => (
          <Typography key={index} {...messagesProps}>
            {item}
          </Typography>
        ))
        : null}
      {messages && typeof messages === 'string' ? (
        <Typography {...messagesProps}>{messages}</Typography>
      ) : null}
      {children}
    </Alert>
  );
};