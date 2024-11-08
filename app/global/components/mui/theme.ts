
import {createTheme, colors} from '@mui/material';
import {grey} from '@mui/material/colors';

//
//

const theme = createTheme({
  shape: {
    borderRadius: 8,
  },
  palette: {
    primary: {
      main: '#AE72FF',
    },
    secondary: {
      main: '#3C1C54',
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: grey[100],
      paper: colors.common.white,
    },
  },
  typography: {
    fontFamily: [
      'IBM Plex Sans Arabic',
      '-apple-system',
      '"Helvetica Neue"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiFilledInput-root': {
            backgroundColor: '#ffffff',
            '&:hover': {backgroundColor: '#ffffff'},
            '&.Mui-focused': {backgroundColor: '#ffffff'},
            '&:active': {backgroundColor: '#ffffff'},
          },
          '& label.Mui-focused': {color: 'main'},
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      variants: [
        {
          props: {size: 'large'},
          style: {
            paddingTop: '0.938rem',
            paddingBottom: '0.938rem',
          },
        },
      ],
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          '--TextField-brandBorderColor': '#E0E3E7',
          '--TextField-brandBorderHoverColor': '#B2BAC2',
          '--TextField-brandBorderFocusedColor': '#6F7E8C',
          '& label.Mui-focused': {
            color: 'var(--TextField-brandBorderFocusedColor)',
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&::before, &::after': {
            borderBottom: 0,
          },
          '&:hover:not(.Mui-disabled, .Mui-error):before': {
            borderBottom: 0,
          },
          '&.Mui-focused:after': {
            borderBottom: 0,
          },
        },
      },
    },
  },
});

export default theme;
