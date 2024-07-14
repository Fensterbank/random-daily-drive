import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { theme } from './theme'
import { Footer } from './components/Footer'
import { Design } from './components/Design'
import { Main } from './components/Main'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Design />
      <Main />
      <Footer />
    </ThemeProvider>
  )
}

export default App
