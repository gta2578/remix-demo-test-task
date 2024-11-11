import {useLocation} from '@remix-run/react';



export const useMatchLocation = () => {
  const location = useLocation();

  return (path: string) => {
    if (path === '/')
      return (
        location.pathname === path ||
        new RegExp('^/[a-z]{2}/?' + path + '$').test(location.pathname)
      );

    return location.pathname === path || new RegExp('^/[a-z]{2}/?' + path).test(location.pathname);
  };
};
