import {InitOptions} from 'i18next';
import {languagesDefault, languagesSupported} from './resource';


export default {
  supportedLngs: languagesSupported,
  fallbackLng: languagesDefault,
  defaultNS: 'common',
  react: {useSuspense: false},
  saveMissing: true,
} as Omit<InitOptions, 'react' | 'detection'>;
