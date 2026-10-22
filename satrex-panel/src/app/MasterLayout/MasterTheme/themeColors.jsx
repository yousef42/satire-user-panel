const textLight = {
  primary: '#666666',
  secondary: '#666666',
  disabled: '#666666',
  hint: '#666666',
};

const brandPrimary = '#966bed';
const brandOrange = '#be464e';
const brandMisc = '#26c0fe';

const sharedPalette = {
  secondary: {
    main: brandOrange,
    contrastText: '#ffffff',
  },
  info: {
    main: brandMisc,
    contrastText: '#ffffff',
  },
  warning: {
    main: brandOrange,
    contrastText: '#ffffff',
  },
  error: {
    main: brandOrange,
    contrastText: '#ffffff',
  },
};

export const themeColors = {
  white: {
    palette: {
      type: 'light',
      primary: {
        main: '#ffffff',
        contrastText: textLight.primary,
      },
      ...sharedPalette,
      text: textLight,
    },
  },
  slateDark1: {
    palette: {
      type: 'dark',
      primary: {
        main: brandPrimary,
        contrastText: '#ffffff',
      },
      ...sharedPalette,
      background: {
        paper: '#222A45',
        default: '#1a2038',
      },
    },
  },
  slateDark2: {
    palette: {
      type: 'dark',
      primary: {
        main: brandPrimary,
        contrastText: '#ffffff',
      },
      ...sharedPalette,
      background: {
        paper: '#222A45',
        default: '#1a2038',
      },
    },
  },
  purple1: {
    palette: {
      type: 'light',
      primary: {
        main: brandPrimary,
        contrastText: '#ffffff',
      },
      ...sharedPalette,
      text: textLight,
    },
  },
  purple2: {
    palette: {
      type: 'light',
      primary: {
        main: brandPrimary,
        contrastText: '#ffffff',
      },
      ...sharedPalette,
      text: textLight,
    },
  },
  purpleDark1: {
    palette: {
      type: 'dark',
      primary: {
        main: brandPrimary,
        contrastText: '#ffffff',
      },
      ...sharedPalette,
      background: {
        paper: '#222A45',
        default: '#1a2038',
      },
    },
  },
  purpleDark2: {
    palette: {
      type: 'dark',
      primary: {
        main: brandPrimary,
        contrastText: '#ffffff',
      },
      ...sharedPalette,
      background: {
        paper: '#222A45',
        default: '#1a2038',
      },
    },
  },
  blue: {
    palette: {
      type: 'light',
      primary: {
        main: brandPrimary,
        contrastText: '#ffffff',
      },
      ...sharedPalette,
      text: textLight,
    },
  },
  blueDark: {
    palette: {
      type: 'dark',
      primary: {
        main: brandPrimary,
        contrastText: '#ffffff',
      },
      ...sharedPalette,
      background: {
        paper: '#222A45',
        default: '#1a2038',
      },
    },
  },
  red: {
    palette: {
      type: 'dark',
      primary: {
        main: brandPrimary,
        contrastText: '#ffffff',
      },
      ...sharedPalette,
    },
  },
};
