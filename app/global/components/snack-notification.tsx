import React from 'react';
import {SnackbarContent, CustomContentProps, closeSnackbar} from 'notistack';

import {AlertProps} from '@mui/material';

import {Notification, NotificationProps} from './notification';
export interface SnackNotificationProps extends NotificationProps {
  noClose?: boolean;
  alertProps?: AlertProps;
}

export const SnackNotification = React.forwardRef<
  HTMLDivElement,
  SnackNotificationProps & CustomContentProps
>(
  (
    {heading, headingProps, message, messages, messagesProps, noClose, alertProps, ...props},
    ref,
  ) => {
    let color: AlertProps['color'];
    let severity: AlertProps['severity'];

    switch (props.variant) {
      case 'success':
        color = 'success';
        severity = 'success';
        break;
      case 'error':
        color = 'error';
        severity = 'error';
        break;
      case 'warning':
        color = 'warning';
        severity = 'warning';
        break;
      default:
        color = 'info';
        severity = 'info';
    }

    return (
      <SnackbarContent ref={ref} role="alert">
        <Notification
          heading={heading}
          headingProps={headingProps}
          messages={messages || message}
          messagesProps={messagesProps}
          color={color}
          severity={severity}
          onClose={noClose ? undefined : () => closeSnackbar(props.id)}
          {...alertProps}
        />
      </SnackbarContent>
    );
  },
);

SnackNotification.displayName = 'SnackNotification';
