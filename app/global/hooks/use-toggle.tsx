import React, {useState} from 'react';

//
//

export const useToggle = (defaultValue: boolean = false) => {
  const [value, setValue] = useState(defaultValue);

  return {
    value,
    toggle: () => setValue(v => !v),
    setValue: (val: boolean) => setValue(val),
    preventEventDefault: (event: React.SyntheticEvent) => event?.preventDefault?.(),
  };
};
