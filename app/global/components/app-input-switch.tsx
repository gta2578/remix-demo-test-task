import React from "react";
import {useFormContext, Controller} from 'react-hook-form';
import {FormControlLabel, FormHelperText, Switch, SwitchProps} from '@mui/material';



export const AppInputSwitch = ({
  name,
  label,
  helperText,
  ...props
}: SwitchProps & {name: string; label?: React.ReactNode; helperText?: string}) => {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => {
        const element = (
          <Switch
            id={'input-' + field.name}
            checked={field.value}
            onChange={field.onChange}
            inputRef={field.ref}
            {...props}
          />
        );

        if (label)
          return (
            <>
              <FormControlLabel label={label} htmlFor={'input-' + field.name} control={element} />
              <FormHelperText error={!!fieldState.error}>
                {fieldState.error?.message || helperText}
              </FormHelperText>
            </>
          );

        return (
          <>
            {element}
            <FormHelperText error={!!fieldState.error}>
              {fieldState.error?.message || helperText}
            </FormHelperText>
          </>
        );
      }}
    />
  );
};
