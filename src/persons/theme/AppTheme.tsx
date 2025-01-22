import { ThemeProvider} from '@emotion/react';
import { CssBaseline} from '@mui/material';
import { purpleTheme } from '.';

export const AppTheme = ({children}:any) => {
  return (
    <ThemeProvider theme={purpleTheme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  )
}
