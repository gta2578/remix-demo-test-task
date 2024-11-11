import {useLocation, useNavigate} from '@remix-run/react'; // eslint-disable-line no-restricted-imports
import {useTranslation} from 'react-i18next';
import {Language} from '~/localization/resource';

//
//

export const useLanguageChanger = () => {
  const {i18n} = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const getLanguageURL = (lang: Language) => {
    const current = String(location.pathname).replace(/^\/(en|ar)/, '');

    return '/' + lang + current + location.search; // + location.hash;
  };

  const changeLanguage = (lang: Language) => {
    navigate(getLanguageURL(lang), {replace: true});
  };

  return {current: i18n.language, changeLanguage, getLanguageURL};
};
