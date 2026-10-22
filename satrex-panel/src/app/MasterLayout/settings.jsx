import { createTheme } from '@mui/material';
import { forEach, merge } from 'lodash';
import layout1Settings from './Layout1/Layout1Settings.jsx';
import { themeColors } from './MasterTheme/themeColors.jsx';
import themeOptions from './MasterTheme/themeOptions.jsx';

function createMatxThemes() {
  const themes = {};

  forEach(themeColors, (value, key) => {
    themes[key] = createTheme(merge({}, themeOptions, value));
  });
  return themes;
}
const themes = createMatxThemes();

export const MatxLayoutSettings = {
  activeLayout: 'layout1', // Check out Matx pro for more options
  activeTheme: 'purple1', // View all valid theme colors inside MasterTheme/themeColors.jsx
  perfectScrollbar: true,

  themes,
  layout1Settings, // open Layout1/Layout1Settings.jsx

  secondarySidebar: {
    // Check out Matx pro for secondary sidebar
    show: true,
    theme: 'slateDark1', // View all valid theme colors inside MasterTheme/themeColors.jsx
  },
  // Footer options
  footer: {
    show: true,
    fixed: false,
    theme: 'slateDark1', // View all valid theme colors inside MasterTheme/themeColors.jsx
  },
};
