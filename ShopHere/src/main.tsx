import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'



const theme = createTheme();


createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>

)
