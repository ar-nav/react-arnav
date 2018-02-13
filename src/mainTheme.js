import { createMuiTheme } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import pink from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';
// import indigo from 'material-ui/colors/indigo';
// import purple from 'material-ui/colors/purple';


// All the following keys are optional.
// We try our best to provide a great default value.
export  default createMuiTheme({
  palette: {
    primary: {
      light:green.A700,
      main: green.A700,
      dark: green.A700,
      contrastText: '#fff',
    },
    secondary: pink,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    // contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    // tonalOffset: 0.2,
  },
});