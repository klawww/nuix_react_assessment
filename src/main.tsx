import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { store } from './store/store'
import App from './App.tsx'
import './index.css'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: '1px solid transparent',
          padding: '0.6em 1.2em',
          fontSize: '1rem',
          fontWeight: 500,
          fontFamily: 'inherit',
          transition: 'border-color 0.25s',
          textTransform: 'none',
          '&:hover': {
            borderColor: '#1976d2',
          },
          '&:focus': {
            outline: '4px auto -webkit-focus-ring-color',
          },
        },
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
