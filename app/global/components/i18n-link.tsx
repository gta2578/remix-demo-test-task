import {Link, LinkProps} from '@remix-run/react';
import React, {forwardRef, memo} from 'react';
import {useTranslation} from 'react-i18next';

//

export const I18nLink = memo(
  forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
    const {i18n} = useTranslation();

    return <Link {...props} ref={ref} to={parseI18nNavigate(props.to, i18n.language)} />;
  }),
);

I18nLink.displayName = 'I18nLink';

//

const parseI18nNavigate = (to: LinkProps['to'], lang: string) => {
  if (typeof to === 'string' && /^\./.test(to)) return to;
  if (typeof to === 'string') return '/' + lang + '/' + String(to).replace(/^\//, ''); // string
  if (typeof to === 'object' && to.pathname)
    return {...to, pathname: '/' + lang + '/' + String(to).replace(/^\//, '')}; // To object

  return to; // fallback
};