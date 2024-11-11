import {IconButton, InputAdornment} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {useToggle} from '~/global/hooks/use-toggle';
import {AppInput, AppInputProps} from './app-input';


export const AppInputPassword = (props: AppInputProps) => {
  const toggle = useToggle();

  return (
    <AppInput
      {...props}
      type={toggle.value ? 'text' : 'password'}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end" sx={{marginRight: 1}}>
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggle.toggle}
                onMouseDown={toggle.preventEventDefault}
                onMouseUp={toggle.preventEventDefault}
                edge="end"
              >
                {toggle.value ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
