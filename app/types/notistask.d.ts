import {SnackNotificationProps} from '~/global/components/snack-notification';

declare module 'notistack' {
  interface VariantOverrides {
    default: SnackNotificationProps;
    warning: SnackNotificationProps;
    success: SnackNotificationProps;
    info: SnackNotificationProps;
    error: SnackNotificationProps;
  }
}